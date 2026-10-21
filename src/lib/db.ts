import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// SECURITY: Log SQL queries only in development.
// In production, `log: ['query']` would write every query (including
// contact-form names, emails, phone numbers, chat transcripts) to stdout,
// which typically lands in server logs / log aggregators. That is a PII leak.
const isDev = process.env.NODE_ENV !== 'production'

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isDev ? ['query', 'warn', 'error'] : ['warn', 'error'],
  })

// Cache the Prisma client in dev to avoid exhausting DB connections on HMR.
if (isDev) globalForPrisma.prisma = db