import fs from 'fs';
import sharp from 'sharp';

const photos = [
  { id: '1519741497674-611481863552', name: 'open_earth_lawn_1.webp' }, // Outdoor wedding reception on expansive green lawn
  { id: '1519225421980-715cb0215aed', name: 'open_earth_lawn_2.webp' }, // Luxury floral arch on lawn
  { id: '1465495976277-4387d4b0b4c6', name: 'open_earth_lawn_3.webp' }, // Open earth lawn venue
  { id: '1511285560929-80b456fea0bc', name: 'open_earth_lawn_4.webp' }, // Outdoor banquet dining on grass
  { id: '1545232979-fbf68fe9b1a2', name: 'open_earth_lawn_5.webp' }, // Resort garden & manicured palms
  { id: '1520854221256-17451cc331bf', name: 'open_earth_lawn_6.webp' }  // Fairy light evening lawn celebration
];

if (!fs.existsSync('images/venues')) {
  fs.mkdirSync('images/venues', { recursive: true });
}

async function downloadAll() {
  for (const p of photos) {
    const url = `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&w=1920&q=85`;
    console.log(`Downloading ${p.name} from Unsplash...`);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to download ${p.name}: ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    // Convert to webp with sharp at 1920x1080 high quality
    await sharp(buf)
      .resize(1920, 1080, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(`images/venues/${p.name}`);
    
    const stat = fs.statSync(`images/venues/${p.name}`);
    console.log(`Saved images/venues/${p.name}: ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

downloadAll();
