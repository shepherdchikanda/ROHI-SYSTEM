import sharp from 'sharp';

async function main() {
  const src = '/home/z/my-project/upload/Gemini_Generated_Image_6l1zdt6l1zdt6l1z.jfif';
  const out = '/home/z/my-project/public/rohi-logo-light.png';

  // Load and get raw RGBA pixels
  const { data, info } = await sharp(src)
    .resize({ width: 720, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const ch = info.channels; // 4 = RGBA

  // Sample background color from 4 corners + edges (median-ish)
  function px(x: number, y: number) {
    const i = (y * w + x) * ch;
    return [data[i], data[i + 1], data[i + 2]];
  }
  const samples = [
    px(2, 2),
    px(w - 3, 2),
    px(2, h - 3),
    px(w - 3, h - 3),
    px(Math.floor(w / 2), 1),
    px(1, Math.floor(h / 2)),
  ];
  // average background
  let br = 0, bg = 0, bb = 0;
  for (const s of samples) { br += s[0]; bg += s[1]; bb += s[2]; }
  br /= samples.length; bg /= samples.length; bb /= samples.length;
  console.log('Background sample avg:', br.toFixed(0), bg.toFixed(0), bb.toFixed(0));

  // tolerance for background removal
  const tol = 48;
  // also treat very dark, low-saturation pixels as background (charcoal is dark grey)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const dist = Math.sqrt((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2);
      // background match
      const isBg = dist < tol;
      // very dark + low saturation = likely background texture
      const maxc = Math.max(r, g, b);
      const minc = Math.min(r, g, b);
      const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;
      const isDarkFlat = maxc < 70 && sat < 0.18;
      if (isBg || isDarkFlat) {
        data[i + 3] = 0; // transparent
      }
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile(out);
  console.log('Saved:', out);
}

main().catch((e) => { console.error(e); process.exit(1); });
