import fs from 'fs';
import sharp from 'sharp';

async function download5() {
  const url = `https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=85`;
  console.log(`Downloading open_earth_lawn_5.webp from Unsplash...`);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed: ${res.status}`);
    return;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(`images/venues/open_earth_lawn_5.webp`);
  
  const stat = fs.statSync(`images/venues/open_earth_lawn_5.webp`);
  console.log(`Saved images/venues/open_earth_lawn_5.webp: ${(stat.size / 1024).toFixed(1)} KB`);
}

download5();
