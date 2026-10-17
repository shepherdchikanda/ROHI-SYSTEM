import sharp from "sharp";
import fs from "fs";

/**
 * Process the new ROHI SYSTEMS logo (vertical lockup on dark navy bg)
 * into three usable assets:
 *  1. rohi-logo-light.png      — transparent, dark mark + teal (for LIGHT header)
 *  2. rohi-logo-light-inv.png  — transparent, white mark + teal (for NAVY footer)
 *  3. rohi-mark.png            — transparent, just the R mark (for chat widget / favicon)
 */
async function main() {
  const src = "/home/z/my-project/upload/ROHI SYSTEM.jfif";
  const outDir = "/home/z/my-project/public";

  // Load + get metadata
  const meta = await sharp(src).metadata();
  const W = meta.width ?? 1178;
  const H = meta.height ?? 896;
  console.log("Source:", W, "x", H);

  // Downscale to a reasonable working size (keeps output lean)
  const workW = 760;
  const workH = Math.round((H / W) * workW);
  console.log("Work size:", workW, "x", workH);

  const { data, info } = await sharp(src)
    .resize({ width: workW, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const ch = info.channels; // 4

  // Sample background from edges (median-ish)
  const samples = [
    px(2, 2), px(w - 3, 2), px(2, h - 3), px(w - 3, h - 3),
    px(Math.floor(w / 2), 1), px(1, Math.floor(h / 2)),
    px(Math.floor(w / 2), h - 2),
  ];
  let br = 0, bg = 0, bb = 0;
  for (const s of samples) { br += s[0]; bg += s[1]; bb += s[2]; }
  br /= samples.length; bg /= samples.length; bb /= samples.length;
  console.log("Background sample avg:", br.toFixed(0), bg.toFixed(0), bb.toFixed(0));

  function px(x: number, y: number) {
    const i = (y * w + x) * ch;
    return [data[i], data[i + 1], data[i + 2]];
  }

  const tol = 52; // tolerance for background removal
  const darkMax = 78; // very-dark threshold
  const darkSatMax = 0.20; // low-saturation = grey-ish background texture

  // Build transparent version (dark mark + teal)
  const transparent = Buffer.from(data);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const dist = Math.sqrt((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2);
      const maxc = Math.max(r, g, b);
      const minc = Math.min(r, g, b);
      const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;
      const isBg = dist < tol;
      const isDarkFlat = maxc < darkMax && sat < darkSatMax;
      if (isBg || isDarkFlat) {
        transparent[i + 3] = 0; // transparent
      }
    }
  }

  await sharp(transparent, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile(`${outDir}/rohi-logo-light.png`);
  console.log("Saved rohi-logo-light.png (dark mark + teal, transparent)");

  // Build white+teal version (for dark backgrounds)
  const inverted = Buffer.from(transparent);
  for (let i = 0; i < inverted.length; i += ch) {
    const a = inverted[i + 3];
    if (a === 0) continue;
    let r = inverted[i], g = inverted[i + 1], b = inverted[i + 2];
    const maxc = Math.max(r, g, b);
    const minc = Math.min(r, g, b);
    const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;
    const isTeal = sat > 0.35 && g > r * 1.15 && b > r * 1.15 && (g + b) / 2 > 90;
    if (isTeal) {
      // keep teal, brighten slightly
      r = Math.min(255, r * 1.0 + 15);
      g = Math.min(255, g * 1.05);
      b = Math.min(255, b * 1.0);
    } else {
      // invert luminance: dark -> white
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const inv = 255 - lum;
      const light = Math.min(255, inv + 70);
      r = light; g = light; b = light;
    }
    inverted[i] = r; inverted[i + 1] = g; inverted[i + 2] = b;
  }
  await sharp(inverted, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile(`${outDir}/rohi-logo-light-inv.png`);
  console.log("Saved rohi-logo-light-inv.png (white mark + teal, transparent)");

  // Crop the R mark (top ~34% of the transparent version) for small spaces
  const markH = Math.floor(h * 0.34);
  await sharp(transparent, { raw: { width: w, height: h, channels: ch } })
    .png()
    .extract({ left: 0, top: 0, width: w, height: markH })
    .toFile(`${outDir}/rohi-mark.png`);
  console.log("Saved rohi-mark.png (R mark only, transparent)", w, "x", markH);

  // Also a white version of the mark
  await sharp(inverted, { raw: { width: w, height: h, channels: ch } })
    .png()
    .extract({ left: 0, top: 0, width: w, height: markH })
    .toFile(`${outDir}/rohi-mark-inv.png`);
  console.log("Saved rohi-mark-inv.png (R mark, white+teal)");

  // Also keep a copy of the original
  fs.copyFileSync(src, `${outDir}/rohi-logo-v2.jpg`);
  console.log("Copied original to rohi-logo-v2.jpg");
}

main().catch((e) => { console.error(e); process.exit(1); });
