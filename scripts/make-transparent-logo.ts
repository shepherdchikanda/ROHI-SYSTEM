import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const imgPath = '/home/z/my-project/upload/Gemini_Generated_Image_6l1zdt6l1zdt6l1z.jfif';
  const buf = fs.readFileSync(imgPath);
  const b64 = buf.toString('base64');
  const dataUrl = `data:image/jpeg;base64,${b64}`;

  const zai = await ZAI.create();
  const resp = await zai.images.generations.edit({
    prompt:
      "Keep this exact logo design completely identical — the 3D geometric emblem mark with the integrated bird element and the bright teal/cyan hexagonal gem accent, plus the company name text and 'INTELLIGENT BUSINESS SYSTEMS' tagline below. Only change: remove the dark charcoal background entirely and make it a fully transparent background, so only the logo mark and text remain. Preserve every color, 3D facet, highlight, text letter, and the teal hexagon exactly as in the original.",
    images: [{ url: dataUrl }],
    size: '1440x720',
  });

  const outB64 = resp.data[0].base64;
  const outBuf = Buffer.from(outB64, 'base64');
  fs.writeFileSync('/home/z/my-project/public/rohi-logo-transparent.png', outBuf);
  console.log('Saved transparent logo:', outBuf.length, 'bytes');
}

main().catch((e) => {
  console.error('Failed:', e.message);
  process.exit(1);
});
