import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const dir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo\\images';

async function main() {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (!f.endsWith('.webp')) continue;
    const p = path.join(dir, f);
    try {
      const meta = await sharp(p).metadata();
      const tempPath = path.join(dir, f + '.tmp.webp');
      // If it is not webp, or if it is oversized jpeg
      await sharp(p)
        .webp({ quality: 85 })
        .toFile(tempPath);
      
      fs.copyFileSync(tempPath, p);
      fs.unlinkSync(tempPath);
      console.log(`Converted ${f} (${meta.format} ${meta.width}x${meta.height}) -> genuine WebP`);
    } catch (err) {
      console.error(`Failed ${f}:`, err.message);
    }
  }
  console.log('All images converted to genuine WebP!');
}

main().catch(console.error);
