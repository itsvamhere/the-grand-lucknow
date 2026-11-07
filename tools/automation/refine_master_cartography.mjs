import sharp from 'sharp';
import fs from 'node:fs';

const width = 3840;
const height = 2400;
const centerLon = 80.9992764;
const centerLat = 26.6355667;
const zoom = 14.85;
const worldSize = 512 * Math.pow(2, zoom);

function project(lon, lat) {
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const x = worldSize * (lon + 180) / 360;
  const y = (worldSize / (2 * Math.PI)) * (Math.PI - Math.log((1 + sinLat) / (1 - sinLat)) / 2);

  const sinCenterLat = Math.sin((centerLat * Math.PI) / 180);
  const cx = worldSize * (centerLon + 180) / 360;
  const cy = (worldSize / (2 * Math.PI)) * (Math.PI - Math.log((1 + sinCenterLat) / (1 - sinCenterLat)) / 2);

  return {
    x: Math.round((1920 + (x - cx)) * 10) / 10,
    y: Math.round((1200 + (y - cy)) * 10) / 10
  };
}

// Road Bridges: ONLY real GIS road gap closures (connecting severed OSM ways)
// Zero artificial buildings or decorative additions.
const roadBridges = [
  // 1. Image 2 gap closure: connects the severed tertiary road stub into the vertical road
  { d: 'M 3496 1006 Q 3450 999 3418 990', casingWidth: 23, bodyWidth: 15 },

  // 2. Gaura road stub closure: connects (821, 1505) to (792, 1504)
  { d: 'M 825 1505 L 790 1504', casingWidth: 23, bodyWidth: 15 }
];

// Secondary Landmark Chips
const landmarks = [
  { name: 'Bindaua', lon: 80.9914, lat: 26.6438 },
  { name: 'Gaura', lon: 80.9774, lat: 26.6370 }
];

let overlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <!-- Seamless top & bottom edge dissolves into subpage background -->
    <linearGradient id="edgeTop" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF0CA" stop-opacity="1" />
      <stop offset="60%" stop-color="#FFF0CA" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#FFF0CA" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="edgeBottom" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#FFF0CA" stop-opacity="1" />
      <stop offset="60%" stop-color="#FFF0CA" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#FFF0CA" stop-opacity="0" />
    </linearGradient>

    <!-- Soft Casa Momo chip dropshadows -->
    <filter id="chipShadow" x="-25%" y="-30%" width="150%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#4A3418" flood-opacity="0.10" />
    </filter>
  </defs>

  <!-- 1. Road Network Bridges — Underlayer Casing -->
  <g id="road-casing" fill="none" stroke="#E6D8BC" stroke-linecap="round" stroke-linejoin="round">
`;

roadBridges.forEach(b => {
  overlaySvg += `    <path d="${b.d}" stroke-width="${b.casingWidth}" />\n`;
});

overlaySvg += `  </g>

  <!-- 2. Road Network Bridges — Road Surface Body -->
  <g id="road-body" fill="none" stroke="#FFFDF4" stroke-linecap="round" stroke-linejoin="round">
`;

roadBridges.forEach(b => {
  overlaySvg += `    <path d="${b.d}" stroke-width="${b.bodyWidth}" />\n`;
});

overlaySvg += `  </g>

  <!-- 3. Soft top and bottom edge dissolves -->
  <rect x="0" y="0" width="${width}" height="80" fill="url(#edgeTop)" pointer-events="none" />
  <rect x="0" y="${height - 80}" width="${width}" height="80" fill="url(#edgeBottom)" pointer-events="none" />

  <!-- 4. Secondary Landmark Chips -->
  <g id="secondary-landmarks" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="34" font-weight="600" letter-spacing="0.015em">
`;

landmarks.forEach(l => {
  const p = project(l.lon, l.lat);
  const text = l.name;
  const textWidth = Math.round(text.length * 21.0) + 56;
  const pillHeight = 68;
  const rx = 8;
  const pillX = Math.round(p.x - textWidth / 2);
  const pillY = Math.round(p.y - pillHeight / 2);

  overlaySvg += `    <!-- ${l.name} -->
    <g filter="url(#chipShadow)">
      <rect x="${pillX}" y="${pillY}" width="${textWidth}" height="${pillHeight}" rx="${rx}" ry="${rx}" fill="#FFFBF2" fill-opacity="0.97" stroke="#E2D4BC" stroke-width="2.2" />
      <text x="${pillX + textWidth / 2}" y="${pillY + 46}" fill="#261C10" text-anchor="middle">${text}</text>
    </g>\n`;
});

overlaySvg += `  </g>
</svg>`;

async function buildMaster() {
  console.log('Compositing clean master cartography (zero fake buildings, clean OSM roads)...');
  const baseImgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_carto_base.png';
  const overlayBuf = Buffer.from(overlaySvg, 'utf8');

  // Composite base map + overlay
  const composite3840 = await sharp(baseImgPath)
    .composite([{ input: overlayBuf, top: 0, left: 0 }])
    .png({ quality: 100 })
    .toBuffer();

  const finalPngPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map.png';
  fs.writeFileSync(finalPngPath, composite3840);
  console.log('Saved 3840x2400 master map to', finalPngPath);

  // Copy to artifacts
  fs.copyFileSync(
    finalPngPath,
    'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_master_map_3840.png'
  );

  // Export 1920x1200 WebP and PNG
  console.log('Exporting web resolutions (1920x1200)...');
  await sharp(composite3840)
    .resize(1920, 1200)
    .webp({ quality: 95 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map.webp');

  await sharp(composite3840)
    .resize(1920, 1200)
    .png({ quality: 100 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map_1920.png');

  fs.copyFileSync(
    'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map_1920.png',
    'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_master_map_1920.png'
  );

  // Verification crop of Bindaua area (where the user took their screenshot)
  console.log('Generating verification crop of Bindaua area...');
  // Bindaua is around p.x = 1715, p.y = 868 in 3840 -> 857, 434 in 1920
  await sharp('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map_1920.png')
    .extract({ left: 780, top: 380, width: 300, height: 160 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_bindaua_clean.png');

  console.log('All composite assets and verification crops exported successfully!');
}

buildMaster().catch(console.error);
