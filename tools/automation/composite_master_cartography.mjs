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

// Load real OpenStreetMap ways from our dataset
const ways = JSON.parse(fs.readFileSync('scripts/parsed_wide_ways.json', 'utf8'));

// Filter ways in the 3840x2400 canvas
const canvasWays = [];
ways.highways.forEach(h => {
  if (!h.coords || h.coords.length < 2) return;
  const pts = h.coords.map(c => project(c[0], c[1]));
  const inBounds = pts.some(p => p.x >= -200 && p.x <= 4040 && p.y >= -200 && p.y <= 2600);
  if (inBounds) {
    const isHighway = h.tags.highway === 'trunk' || h.tags.highway === 'primary';
    const isMajor = h.tags.highway === 'secondary' || h.tags.highway === 'tertiary';
    canvasWays.push({
      id: h.id,
      type: h.tags.highway,
      name: h.tags.name || h.tags['name:en'] || '',
      isHighway,
      isMajor,
      pts
    });
  }
});

console.log(`Extracted ${canvasWays.length} real OSM road geometries inside canvas.`);

// Build SVG paths for all roads
let highwayCasingSvg = '';
let highwayBodySvg = '';
let majorCasingSvg = '';
let majorBodySvg = '';
let minorCasingSvg = '';
let minorBodySvg = '';

canvasWays.forEach(w => {
  const d = 'M ' + w.pts.map(p => `${p.x} ${p.y}`).join(' L ');
  if (w.isHighway) {
    highwayCasingSvg += `    <path d="${d}" stroke-width="28" />\n`;
    highwayBodySvg += `    <path d="${d}" stroke-width="20" />\n`;
  } else if (w.isMajor) {
    majorCasingSvg += `    <path d="${d}" stroke-width="18" />\n`;
    majorBodySvg += `    <path d="${d}" stroke-width="11" />\n`;
  } else {
    minorCasingSvg += `    <path d="${d}" stroke-width="13" />\n`;
    minorBodySvg += `    <path d="${d}" stroke-width="7.5" />\n`;
  }
});

// Railway track from OSM ways:
let railwaySvg = '';
if (ways.railways) {
  ways.railways.forEach(r => {
    if (!r.coords || r.coords.length < 2) return;
    const pts = r.coords.map(c => project(c[0], c[1]));
    const d = 'M ' + pts.map(p => `${p.x} ${p.y}`).join(' L ');
    railwaySvg += `    <path d="${d}" stroke="#B8A789" stroke-width="2.5" stroke-dasharray="16,10" fill="none" opacity="0.65" />\n`;
  });
}

// Landmarks matching Google Maps reference and User Master Prompt:
const landmarks = [
  // Bindaua: located on the EAST of Raebareli road as shown in Google Maps
  { name: 'Bindaua', x: 1960, y: 820 },
  // Gaura: located in the northwest
  { name: 'Gaura', x: 1000, y: 1130 },
  // Ahmadpur Khalsa: northeast
  { name: 'Ahmadpur Khalsa', x: 2720, y: 920 },
  // Kankaha: southeast
  { name: 'Kankaha', x: 3060, y: 1660 },
  // Sardar Patel Institute of Ayurvedic Medical Sciences: southwest
  { name: 'Sardar Patel Institute', x: 1610, y: 1880 }
];

let chipsSvg = '';
landmarks.forEach(l => {
  const text = l.name;
  const textWidth = Math.round(text.length * 20.5) + 54;
  const pillHeight = 66;
  const rx = 6;
  const pillX = Math.round(l.x - textWidth / 2);
  const pillY = Math.round(l.y - pillHeight / 2);

  chipsSvg += `
    <!-- ${l.name} -->
    <g filter="url(#chipShadow)">
      <rect x="${pillX}" y="${pillY}" width="${textWidth}" height="${pillHeight}" rx="${rx}" ry="${rx}" fill="#FFFBF2" fill-opacity="0.97" stroke="#E2D4BC" stroke-width="2" />
      <text x="${pillX + textWidth / 2}" y="${pillY + 45}" fill="#261C10" text-anchor="middle">${text}</text>
    </g>`;
});

const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
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

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#FFF0CA" />

  <!-- 1. Minor / Village Road Network (Casing) -->
  <g fill="none" stroke="#E6D8BC" stroke-linecap="round" stroke-linejoin="round">
${minorCasingSvg}
  </g>

  <!-- 2. Minor / Village Road Network (Body) -->
  <g fill="none" stroke="#FFFAEC" stroke-linecap="round" stroke-linejoin="round">
${minorBodySvg}
  </g>

  <!-- 3. Secondary & Tertiary Roads (Casing) -->
  <g fill="none" stroke="#E6D8BC" stroke-linecap="round" stroke-linejoin="round">
${majorCasingSvg}
  </g>

  <!-- 4. Secondary & Tertiary Roads (Body) -->
  <g fill="none" stroke="#FFFDF4" stroke-linecap="round" stroke-linejoin="round">
${majorBodySvg}
  </g>

  <!-- 5. Padera - Raebareli Road (NH-30 Highway Casing) -->
  <g fill="none" stroke="#E0CFB0" stroke-linecap="round" stroke-linejoin="round">
${highwayCasingSvg}
  </g>

  <!-- 6. Padera - Raebareli Road (NH-30 Highway Body) -->
  <g fill="none" stroke="#FFFDF4" stroke-linecap="round" stroke-linejoin="round">
${highwayBodySvg}
  </g>

  <!-- 7. Railway Line -->
  <g fill="none">
${railwaySvg}
  </g>

  <!-- 8. Soft top and bottom edge dissolves -->
  <rect x="0" y="0" width="${width}" height="80" fill="url(#edgeTop)" pointer-events="none" />
  <rect x="0" y="${height - 80}" width="${width}" height="80" fill="url(#edgeBottom)" pointer-events="none" />

  <!-- 9. Secondary Landmark Chips -->
  <g id="secondary-landmarks" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="34" font-weight="600" letter-spacing="0.015em">
${chipsSvg}
  </g>
</svg>`;

async function buildVectorMaster() {
  console.log('Rendering 3840x2400 genuine vector map from real OpenStreetMap datasets...');
  const svgBuf = Buffer.from(masterSvg, 'utf8');

  const finalPngPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map.png';
  await sharp(svgBuf)
    .png({ quality: 100 })
    .toFile(finalPngPath);
  console.log('Saved 3840x2400 master map to', finalPngPath);

  // Copy to brain artifacts
  fs.copyFileSync(
    finalPngPath,
    'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_master_map_3840.png'
  );

  // Export 1920x1200 WebP and PNG
  console.log('Exporting web resolutions (1920x1200)...');
  await sharp(finalPngPath)
    .resize(1920, 1200)
    .webp({ quality: 95 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map.webp');

  await sharp(finalPngPath)
    .resize(1920, 1200)
    .png({ quality: 100 })
    .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map_1920.png');

  fs.copyFileSync(
    'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map_1920.png',
    'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_master_map_1920.png'
  );

  console.log('Done rendering genuine vector cartography!');
}

buildVectorMaster().catch(console.error);
