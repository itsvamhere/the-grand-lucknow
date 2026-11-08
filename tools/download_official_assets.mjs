import fs from 'fs';
import path from 'path';

const officialAssets = [
  { name: 'open-earth-lawn', url: 'https://www.thegrandlucknow.in/assets/openEarthLawn-T84778UT.png', target: 'images/venues/open-earth-lawn-official.png' },
  { name: 'grassland-gala', url: 'https://www.thegrandlucknow.in/assets/grasslandGala-CfKbaOcr.jpg', target: 'images/venues/grassland-gala-official.jpg' },
  { name: 'garden-galaxy', url: 'https://www.thegrandlucknow.in/assets/gardengalaxy1-WiWr7-QZ.jpeg', target: 'images/venues/garden-galaxy-official.jpeg' },
  { name: 'the-grand-courtyard', url: 'https://www.thegrandlucknow.in/assets/IMG_7699-CDjE9rIn.jpg', target: 'images/venues/the-grand-courtyard-official.jpg' },
  { name: 'royal-legacy-banquet', url: 'https://www.thegrandlucknow.in/assets/BanquetHall-DW5fa5BN.jpeg', target: 'images/venues/royal-legacy-banquet-official.jpeg' }
];

async function downloadAll() {
  fs.mkdirSync('images/venues', { recursive: true });
  for (const asset of officialAssets) {
    try {
      console.log(`Downloading ${asset.url} -> ${asset.target}...`);
      const res = await fetch(asset.url);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(asset.target, buffer);
        console.log(`Saved ${asset.target} (${buffer.length} bytes)`);
      } else {
        console.error(`Failed ${asset.url}: status ${res.status}`);
      }
    } catch (e) {
      console.error(`Error downloading ${asset.url}:`, e.message);
    }
  }
}

downloadAll();
