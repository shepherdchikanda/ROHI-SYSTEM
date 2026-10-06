import sharp from 'sharp';

// Create a "light" version of the logo: dark metallic parts -> white, teal hexagon stays teal.
// For use on dark navy backgrounds (footer, hero overlays).
async function main() {
  const src = '/home/z/my-project/public/rohi-logo-light.png';
  const out = '/home/z/my-project/public/rohi-logo-light-inv.png';

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const ch = info.channels;

  for (let i = 0; i < data.length; i += ch) {
    const a = data[i + 3];
    if (a === 0) continue; // keep transparent
    let r = data[i], g = data[i + 1], b = data[i + 2];
    const maxc = Math.max(r, g, b);
    const minc = Math.min(r, g, b);
    const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;
    // Teal/cyan detection: green and blue dominate, red is lower, and saturated
    const isTeal = sat > 0.35 && g > r * 1.15 && b > r * 1.15 && (g + b) / 2 > 90;
    if (isTeal) {
      // keep/brighten teal
      r = Math.min(255, r * 1.0 + 20);
      g = Math.min(255, g * 1.05);
      b = Math.min(255, b * 1.0);
    } else {
      // invert luminance: dark -> white, mid -> light grey
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const inv = 255 - lum; // dark pixels become bright
      const light = Math.min(255, inv * 1.0 + 60); // boost to near-white
      r = light; g = light; b = light;
    }
    data[i] = r; data[i + 1] = g; data[i + 2] = b;
    // data[i+3] stays
  }

  await sharp(data, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile(out);
  console.log('Saved light version:', out);
}

main().catch((e) => { console.error(e); process.exit(1); });
