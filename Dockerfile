# syntax=docker/dockerfile:1.7
# Production image for the ROHI site: Next.js standalone server on Bun, SQLite on a mounted volume.

FROM oven/bun:1 AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# --- dependencies (cached until the lockfile changes) ---
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# --- build ---
FROM deps AS build
COPY . .
# Dummy URL: only needed so Prisma/Next can run at build time.
ENV DATABASE_URL=file:/tmp/build.db
RUN bunx prisma generate && bun run build

# --- runtime ---
# Keeps node_modules so the Prisma CLI can sync the SQLite schema on start.
FROM build AS runtime
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    DATABASE_URL=file:/data/rohi.db
RUN mkdir -p /data && chown -R bun:bun /data /app
USER bun
VOLUME ["/data"]
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# `db push` WITHOUT --accept-data-loss: additive changes apply; destructive ones abort startup,
# the deploy smoke test fails, and the pipeline rolls back instead of silently dropping data.
CMD ["sh", "-c", "bunx prisma db push --skip-generate && exec bun .next/standalone/server.js"]
