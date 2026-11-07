import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rawDir = path.join(process.cwd(), 'raw_photos');
const files = fs.readdirSync(rawDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

for (const f of files.slice(10)) {
  const fullPath = path.join(rawDir, f);
  const { data, info } = await sharp(fullPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  
  const topSamples = [0, Math.floor(width/4), Math.floor(width/2), Math.floor(3*width/4), width - 1].map(x => {
    const idx = x * channels;
    return `(${data[idx]},${data[idx+1]},${data[idx+2]})`;
  });

  const bottomSamples = [0, Math.floor(width/4), Math.floor(width/2), Math.floor(3*width/4), width - 1].map(x => {
    const idx = ((height - 1) * width + x) * channels;
    return `(${data[idx]},${data[idx+1]},${data[idx+2]})`;
  });

  const leftSamples = [0, Math.floor(height/4), Math.floor(height/2), Math.floor(3*height/4), height - 1].map(y => {
    const idx = (y * width) * channels;
    return `(${data[idx]},${data[idx+1]},${data[idx+2]})`;
  });

  const rightSamples = [0, Math.floor(height/4), Math.floor(height/2), Math.floor(3*height/4), height - 1].map(y => {
    const idx = (y * width + width - 1) * channels;
    return `(${data[idx]},${data[idx+1]},${data[idx+2]})`;
  });

  console.log(`${f} [${width}x${height}]:`);
  console.log('  Top:', topSamples.join(' '));
  console.log('  Bottom:', bottomSamples.join(' '));
  console.log('  Left:', leftSamples.join(' '));
  console.log('  Right:', rightSamples.join(' '));
}
