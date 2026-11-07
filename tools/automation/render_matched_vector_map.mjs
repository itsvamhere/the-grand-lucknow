import sharp from 'sharp';
import fs from 'node:fs';
import {
  highwayG, railwayG, bindauaEntranceG, bindauaLoopG, bindauaNorthStreetG,
  bindauaToAhmadpurG, badanKheraRoadG, ahmadpurMainStreetG, ahmadpurToKankahaG,
  ahmadpurNorthRuralG, kankahaRoad24BG, kankahaEastG, kankahaToHighwayG,
  gauraWindingRoadG, gauraLoopConnectorG, gauraNorthBranchG, gauraToHighwayG,
  sardarEntranceRoadG, sardarCampusLoopG, sardarWestRoadG, westNorthSouthRoadG,
  fieldTracksG
} from './road_geometries.mjs';

const width = 3840;
const height = 2400;

// Coordinate transformation from GMaps (1024 x 541) to Master Canvas (3840 x 2400)
// Red pin in GMaps: (479.5, 299.9) -> Master Canvas (1920, 1200)
const scale = 3.8;
const offsetX = 1920 - 479.5 * scale; // 97.9
const offsetY = 1200 - 299.9 * scale; // 60.38

function T(pt) {
  return [
    Math.round((pt[0] * scale + offsetX) * 10) / 10,
    Math.round((pt[1] * scale + offsetY) * 10) / 10
  ];
}

function toPath(pts) {
  const transformed = pts.map(T);
  return 'M ' + transformed.map(p => `${p[0]} ${p[1]}`).join(' L ');
}

// 1. Subtle Organic Settlement Footprints (Casa Momo style: soft beige/ivory urban tissue)
// Soft rounded polygon patches for Bindaua, Gaura, Ahmadpur Khalsa, Kankaha, and Sardar Patel
const settlementPatches = [
  // Bindaua settlement patch
  [
    [465, 80], [490, 60], [525, 65], [540, 95], [535, 140],
    [520, 175], [495, 185], [470, 170], [460, 130], [460, 95]
  ],
  // Gaura settlement patch
  [
    [10, 80], [60, 90], [95, 120], [115, 160], [110, 205],
    [85, 240], [45, 245], [10, 230], [0, 160]
  ],
  // Ahmadpur Khalsa settlement patch
  [
    [690, 125], [730, 110], [775, 115], [820, 130], [860, 150],
    [855, 180], [810, 185], [760, 175], [715, 165], [685, 145]
  ],
  // Kankaha settlement patch
  [
    [860, 395], [905, 390], [955, 395], [970, 425], [950, 445],
    [905, 450], [870, 445], [850, 420]
  ],
  // Sardar Patel Institute campus grounds
  [
    [375, 450], [435, 450], [445, 480], [440, 520], [375, 520], [365, 485]
  ]
];

let settlementSvg = '';
settlementPatches.forEach(poly => {
  const d = 'M ' + poly.map(T).map(p => `${p[0]} ${p[1]}`).join(' L ') + ' Z';
  settlementSvg += `    <path d="${d}" fill="#E8DBC0" fill-opacity="0.38" stroke="#DFCFB2" stroke-width="4" stroke-linejoin="round" />\n`;
});

// 2. Field Tracks (Casing and Body)
let fieldTracksCasingSvg = '';
let fieldTracksBodySvg = '';
fieldTracksG.forEach(ft => {
  const d = toPath(ft);
  fieldTracksCasingSvg += `    <path d="${d}" stroke-width="7" />\n`;
  fieldTracksBodySvg += `    <path d="${d}" stroke-width="3.5" />\n`;
});

// 3. Minor / Village Roads
const minorRoads = [
  bindauaEntranceG, bindauaLoopG, bindauaNorthStreetG, ahmadpurMainStreetG,
  ahmadpurNorthRuralG, kankahaEastG, gauraWindingRoadG, gauraLoopConnectorG,
  gauraNorthBranchG, sardarEntranceRoadG, sardarCampusLoopG, westNorthSouthRoadG
];

let minorCasingSvg = '';
let minorBodySvg = '';
minorRoads.forEach(r => {
  const d = toPath(r);
  minorCasingSvg += `    <path d="${d}" stroke-width="13" />\n`;
  minorBodySvg += `    <path d="${d}" stroke-width="7.5" />\n`;
});

// 4. Major Connecting Roads
const majorRoads = [
  badanKheraRoadG, kankahaRoad24BG, gauraToHighwayG, kankahaToHighwayG,
  bindauaToAhmadpurG, ahmadpurToKankahaG, sardarWestRoadG
];

let majorCasingSvg = '';
let majorBodySvg = '';
majorRoads.forEach(r => {
  const d = toPath(r);
  majorCasingSvg += `    <path d="${d}" stroke-width="18" />\n`;
  majorBodySvg += `    <path d="${d}" stroke-width="11" />\n`;
});

// 5. Padera - Raebareli Rd (NH-30 Highway)
const highwayPath = toPath(highwayG);
const highwayCasingSvg = `    <path d="${highwayPath}" stroke-width="28" />\n`;
const highwayBodySvg = `    <path d="${highwayPath}" stroke-width="20" />\n`;

// 6. Railway Track
const railwayPath = toPath(railwayG);
const railwaySvg = `    <path d="${railwayPath}" stroke="#B8A789" stroke-width="3.5" stroke-dasharray="24,14" fill="none" opacity="0.75" />\n`;

// 7. Street Name Annotations (angled along real road paths matching Google Maps)
const roadLabels = [
  {
    text: 'Padera - Raebareli Rd',
    x: T([390, 85])[0] - 25,
    y: T([390, 85])[1],
    angle: 68
  },
  {
    text: 'Badan Khera Road',
    x: T([765, 55])[0] + 25,
    y: T([765, 55])[1],
    angle: -58
  },
  {
    text: '24B - Kankaha Road',
    x: T([860, 475])[0] - 25,
    y: T([860, 475])[1],
    angle: 56
  }
];

let roadLabelsSvg = '';
roadLabels.forEach(rl => {
  roadLabelsSvg += `
    <text x="${rl.x}" y="${rl.y}" transform="rotate(${rl.angle}, ${rl.x}, ${rl.y})" fill="#746A54" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="24" font-weight="500" letter-spacing="0.08em" opacity="0.75">${rl.text}</text>`;
});

// 8. Secondary Landmark Chips matching Google Maps
const landmarkChips = [
  { name: 'Bindaua', pos: T([475, 210]), xOffset: 25, yOffset: -50 },
  { name: 'Gaura', pos: T([65, 115]), xOffset: 0, yOffset: 0 },
  { name: 'Ahmadpur Khalsa', pos: T([725, 180]), xOffset: 0, yOffset: 0 },
  { name: 'Kankaha', pos: T([890, 415]), xOffset: 0, yOffset: 0 },
  { name: 'Sardar Patel Institute', pos: T([420, 505]), xOffset: 0, yOffset: 0 }
];

let chipsSvg = '';
landmarkChips.forEach(l => {
  const text = l.name;
  const textWidth = Math.round(text.length * 20.5) + 54;
  const pillHeight = 66;
  const rx = 6;
  const pillX = Math.round(l.pos[0] + l.xOffset - textWidth / 2);
  const pillY = Math.round(l.pos[1] + l.yOffset - pillHeight / 2);

  chipsSvg += `
    <!-- ${l.name} -->
    <g filter="url(#chipShadow)">
      <rect x="${pillX}" y="${pillY}" width="${textWidth}" height="${pillHeight}" rx="${rx}" ry="${rx}" fill="#FFFBF2" fill-opacity="0.97" stroke="#E2D4BC" stroke-width="2" />
      <text x="${pillX + textWidth / 2}" y="${pillY + 45}" fill="#261C10" text-anchor="middle">${text}</text>
    </g>`;
});

// Master SVG artwork
const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <!-- Seamless edge dissolves -->
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

  <!-- 1. Organic Settlement Footprints (Casa Momo style) -->
  <g id="settlement-footprints">
${settlementSvg}
  </g>

  <!-- 2. Agricultural Field Tracks (Casing) -->
  <g fill="none" stroke="#EADEC7" stroke-linecap="round" stroke-linejoin="round">
${fieldTracksCasingSvg}
  </g>

  <!-- 3. Agricultural Field Tracks (Body) -->
  <g fill="none" stroke="#FFF9E9" stroke-linecap="round" stroke-linejoin="round">
${fieldTracksBodySvg}
  </g>

  <!-- 4. Minor / Village Road Network (Casing) -->
  <g fill="none" stroke="#E6D8BC" stroke-linecap="round" stroke-linejoin="round">
${minorCasingSvg}
  </g>

  <!-- 5. Minor / Village Road Network (Body) -->
  <g fill="none" stroke="#FFFAEC" stroke-linecap="round" stroke-linejoin="round">
${minorBodySvg}
  </g>

  <!-- 6. Major Connecting Roads (Casing) -->
  <g fill="none" stroke="#E6D8BC" stroke-linecap="round" stroke-linejoin="round">
${majorCasingSvg}
  </g>

  <!-- 7. Major Connecting Roads (Body) -->
  <g fill="none" stroke="#FFFDF4" stroke-linecap="round" stroke-linejoin="round">
${majorBodySvg}
  </g>

  <!-- 8. Padera - Raebareli Road (NH-30 Highway Casing) -->
  <g fill="none" stroke="#E0CFB0" stroke-linecap="round" stroke-linejoin="round">
${highwayCasingSvg}
  </g>

  <!-- 9. Padera - Raebareli Road (NH-30 Highway Body) -->
  <g fill="none" stroke="#FFFDF4" stroke-linecap="round" stroke-linejoin="round">
${highwayBodySvg}
  </g>

  <!-- 10. Railway Line -->
  <g fill="none">
${railwaySvg}
  </g>

  <!-- 11. Street Name Labels -->
  <g id="street-names">
${roadLabelsSvg}
  </g>

  <!-- 12. Soft edge dissolves -->
  <rect x="0" y="0" width="${width}" height="90" fill="url(#edgeTop)" pointer-events="none" />
  <rect x="0" y="${height - 90}" width="${width}" height="90" fill="url(#edgeBottom)" pointer-events="none" />

  <!-- 13. Secondary Landmark Chips -->
  <g id="secondary-landmarks" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="34" font-weight="600" letter-spacing="0.015em">
${chipsSvg}
  </g>
</svg>`;

async function buildMasterCartography() {
  console.log('Rendering 3840x2400 genuine vector map strictly matching Google Maps & Casa Momo...');
  const svgBuf = Buffer.from(masterSvg, 'utf8');

  // Save SVG
  const svgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map.svg';
  fs.writeFileSync(svgPath, masterSvg);
  fs.copyFileSync(svgPath, 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_master_map.svg');

  // Master 3840x2400 PNG
  const png3840Path = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map.png';
  await sharp(svgBuf)
    .png({ quality: 100 })
    .toFile(png3840Path);
  console.log('Saved 3840x2400 master map to', png3840Path);

  fs.copyFileSync(
    png3840Path,
    'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_master_map_3840.png'
  );

  // Web resolution 1920x1200
  console.log('Exporting web resolutions (1920x1200)...');
  const png1920Path = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map_1920.png';
  await sharp(png3840Path)
    .resize(1920, 1200)
    .png({ quality: 100 })
    .toFile(png1920Path);

  fs.copyFileSync(
    png1920Path,
    'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_master_map_1920.png'
  );

  const webpPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map.webp';
  await sharp(png3840Path)
    .resize(1920, 1200)
    .webp({ quality: 95 })
    .toFile(webpPath);

  console.log('All map assets successfully exported!');
}

buildMasterCartography().catch(console.error);
