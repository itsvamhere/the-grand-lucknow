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

// Transform GMaps (1024 x 541) to Master Canvas (3840 x 2400)
// Center venue: (479.5, 299.9) -> (1920, 1200)
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

// 1. WATER CANAL RIBBON (Equivalent to River Mur in Casa Momo)
// Sharda canal feeder curving smoothly from top-left to bottom-right across rural Mohanlalganj
const canalCurveG = [
  [300, 0], [315, 30], [330, 65], [345, 105], [352, 150],
  [350, 195], [340, 245], [325, 295], [315, 350], [310, 400],
  [312, 450], [320, 500], [330, 541]
];

const canalPath = toPath(canalCurveG);
const canalBanksSvg = `    <path d="${canalPath}" stroke="#DECFA8" stroke-width="42" fill="none" opacity="0.45" stroke-linecap="round" />\n`;
const canalWaterSvg = `    <path d="${canalPath}" stroke="#F0E3C2" stroke-width="32" fill="none" opacity="0.85" stroke-linecap="round" />\n`;

// 2. TOPOGRAPHICAL MASSES & ORCHARD GROVES (Schlossberg & Stadtpark equivalents)
// Warm, golden-sand organic zones representing the mango groves, village greens, and resort grounds
const terrainMasses = [
  // A. The Grand Resort Estate Grounds (Lush lawns & courtyards east of highway)
  [
    [485, 280], [530, 275], [550, 295], [545, 335], [510, 345], [475, 330], [475, 295]
  ],
  // B. Bindaua North Orchard & Village Green
  [
    [450, 50], [495, 35], [540, 45], [565, 80], [550, 130],
    [520, 150], [470, 140], [445, 95]
  ],
  // C. Gaura West Woodland & Parkland
  [
    [10, 70], [65, 80], [105, 115], [125, 160], [120, 215],
    [90, 250], [45, 255], [5, 235], [0, 150]
  ],
  // D. Ahmadpur Khalsa East Groves
  [
    [680, 115], [730, 95], [785, 105], [835, 120], [875, 145],
    [870, 185], [815, 195], [755, 180], [705, 165], [675, 140]
  ],
  // E. Kankaha South Parkland
  [
    [850, 385], [905, 375], [965, 385], [985, 420], [960, 455],
    [905, 465], [860, 455], [835, 420]
  ],
  // F. Sardar Patel Institute Campus Expanse
  [
    [365, 440], [435, 440], [455, 475], [450, 525], [375, 530], [355, 485]
  ]
];

let terrainSvg = '';
terrainMasses.forEach(poly => {
  const d = 'M ' + poly.map(T).map(p => `${p[0]} ${p[1]}`).join(' L ') + ' Z';
  terrainSvg += `    <path d="${d}" fill="#E8DBC0" fill-opacity="0.45" stroke="#DFCFB2" stroke-width="4" stroke-linejoin="round" />\n`;
});

// 3. GEOMETRIC BUILDING PARCELS & COMPOUNDS (Matching Casa Momo's dense 10% urban texture!)
// Generate authentic geometric building parcels lining streets in Bindaua, Gaura, Ahmadpur, Kankaha, and The Grand
const buildingParcels = [];

function addBuilding(gx, gy, w, h, angle = 0) {
  buildingParcels.push({ gx, gy, w, h, angle });
}

// A. The Grand Resort Buildings & Pavilions
addBuilding(488, 290, 14, 18, 12);
addBuilding(505, 288, 16, 12, 12);
addBuilding(524, 292, 12, 20, 12);
addBuilding(492, 312, 18, 10, 12);
addBuilding(514, 310, 20, 14, 12);
addBuilding(538, 314, 10, 16, 12);

// B. Bindaua Village Building Clusters (lining the loop and entrance street)
// Entrance street buildings
addBuilding(425, 165, 8, 6, 2);
addBuilding(435, 164, 9, 6, 2);
addBuilding(448, 166, 8, 7, 2);
addBuilding(422, 178, 9, 7, 2);
addBuilding(436, 179, 10, 7, 2);
addBuilding(450, 180, 8, 6, 2);
// Bindaua village center & loop buildings
addBuilding(472, 138, 10, 8, -15);
addBuilding(484, 135, 9, 7, -15);
addBuilding(495, 132, 11, 8, -15);
addBuilding(508, 130, 9, 8, -15);
addBuilding(474, 152, 8, 9, -5);
addBuilding(485, 150, 10, 8, -5);
addBuilding(498, 148, 9, 9, -5);
addBuilding(510, 146, 11, 7, -5);
// North loop buildings
addBuilding(475, 115, 8, 10, 30);
addBuilding(485, 105, 10, 7, 45);
addBuilding(498, 95, 9, 8, 60);
addBuilding(512, 98, 8, 9, 75);
addBuilding(520, 112, 9, 8, 85);
// South loop buildings
addBuilding(472, 168, 9, 7, 5);
addBuilding(484, 170, 11, 8, 5);
addBuilding(498, 168, 10, 7, 5);
addBuilding(512, 165, 9, 8, 5);

// C. Gaura Village Building Clusters
addBuilding(35, 100, 10, 8, 20);
addBuilding(48, 106, 9, 7, 20);
addBuilding(60, 115, 8, 10, 20);
addBuilding(28, 112, 8, 9, 20);
addBuilding(42, 120, 11, 8, 20);
addBuilding(55, 130, 9, 9, 20);
addBuilding(70, 138, 10, 8, 30);
addBuilding(84, 150, 9, 9, 45);
addBuilding(95, 165, 8, 11, 60);
addBuilding(98, 185, 10, 8, 75);
addBuilding(88, 205, 9, 9, 85);
addBuilding(72, 220, 10, 8, 90);
addBuilding(55, 228, 9, 7, 90);
addBuilding(38, 228, 8, 8, 90);

// D. Ahmadpur Khalsa Building Clusters (along Badan Khera Rd & main street)
addBuilding(705, 132, 9, 8, 5);
addBuilding(718, 134, 10, 7, 5);
addBuilding(732, 136, 9, 8, 5);
addBuilding(746, 138, 11, 7, 5);
addBuilding(760, 142, 9, 9, 10);
addBuilding(775, 145, 10, 8, 10);
addBuilding(790, 148, 8, 8, 10);
addBuilding(805, 152, 9, 7, 10);
addBuilding(820, 155, 10, 8, 10);
// Along Badan Khera Rd heading north
addBuilding(724, 120, 8, 9, -55);
addBuilding(735, 102, 9, 8, -55);
addBuilding(748, 85, 8, 10, -55);
addBuilding(762, 68, 9, 8, -55);
addBuilding(778, 50, 10, 7, -55);

// E. Kankaha Village Building Clusters
addBuilding(870, 405, 10, 8, 15);
addBuilding(884, 408, 9, 9, 15);
addBuilding(898, 406, 11, 7, 15);
addBuilding(912, 404, 8, 8, 15);
addBuilding(926, 405, 10, 7, 15);
addBuilding(940, 406, 9, 8, 15);
// Along 24B Kankaha Rd heading south
addBuilding(880, 428, 8, 10, 55);
addBuilding(870, 448, 9, 9, 55);
addBuilding(858, 470, 10, 8, 55);
addBuilding(844, 492, 9, 9, 55);
addBuilding(830, 514, 8, 10, 55);

// F. Sardar Patel Institute Academic Blocks
addBuilding(385, 460, 18, 12, 0);
addBuilding(408, 460, 16, 12, 0);
addBuilding(385, 478, 14, 14, 0);
addBuilding(404, 478, 20, 14, 0);
addBuilding(385, 498, 16, 10, 0);
addBuilding(406, 498, 18, 10, 0);

// G. Highway Roadside Compounds (between highway & railway)
addBuilding(418, 188, 7, 6, 68);
addBuilding(428, 210, 8, 7, 68);
addBuilding(438, 232, 7, 8, 68);
addBuilding(448, 254, 8, 7, 68);
addBuilding(478, 350, 9, 7, 68);
addBuilding(488, 372, 8, 8, 68);
addBuilding(498, 394, 9, 7, 68);

let buildingsSvg = '';
buildingParcels.forEach(b => {
  const pt = T([b.gx, b.gy]);
  const bw = Math.round(b.w * scale);
  const bh = Math.round(b.h * scale);
  const bx = Math.round(pt[0] - bw / 2);
  const by = Math.round(pt[1] - bh / 2);
  const transform = b.angle !== 0 ? ` transform="rotate(${b.angle}, ${pt[0]}, ${pt[1]})"` : '';
  buildingsSvg += `    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="3" ry="3"${transform} fill="#E9DCBC" stroke="#DFCFAF" stroke-width="2.5" />\n`;
});

// 4. AGRICULTURAL FIELD TRACKS (Casing and Body)
let fieldTracksCasingSvg = '';
let fieldTracksBodySvg = '';
fieldTracksG.forEach(ft => {
  const d = toPath(ft);
  fieldTracksCasingSvg += `    <path d="${d}" stroke-width="7" />\n`;
  fieldTracksBodySvg += `    <path d="${d}" stroke-width="3.5" />\n`;
});

// 5. MINOR / VILLAGE ROADS
const minorRoads = [
  bindauaEntranceG, bindauaLoopG, bindauaNorthStreetG, ahmadpurMainStreetG,
  ahmadpurNorthRuralG, kankahaEastG, gauraWindingRoadG, gauraLoopConnectorG,
  gauraNorthBranchG, sardarEntranceRoadG, sardarCampusLoopG, westNorthSouthRoadG
];

let minorCasingSvg = '';
let minorBodySvg = '';
minorRoads.forEach(r => {
  const d = toPath(r);
  minorCasingSvg += `    <path d="${d}" stroke-width="14" />\n`;
  minorBodySvg += `    <path d="${d}" stroke-width="8.5" />\n`;
});

// 6. MAJOR CONNECTING ROADS
const majorRoads = [
  badanKheraRoadG, kankahaRoad24BG, gauraToHighwayG, kankahaToHighwayG,
  bindauaToAhmadpurG, ahmadpurToKankahaG, sardarWestRoadG
];

let majorCasingSvg = '';
let majorBodySvg = '';
majorRoads.forEach(r => {
  const d = toPath(r);
  majorCasingSvg += `    <path d="${d}" stroke-width="19" />\n`;
  majorBodySvg += `    <path d="${d}" stroke-width="12" />\n`;
});

// 7. PADERA - RAEBARELI RD (NH-30 Highway)
const highwayPath = toPath(highwayG);
const highwayCasingSvg = `    <path d="${highwayPath}" stroke-width="30" />\n`;
const highwayBodySvg = `    <path d="${highwayPath}" stroke-width="22" />\n`;

// 8. RAILWAY TRACK
const railwayPath = toPath(railwayG);
const railwaySvg = `    <path d="${railwayPath}" stroke="#B8A789" stroke-width="4" stroke-dasharray="24,14" fill="none" opacity="0.8" />\n`;

// 9. ROAD NAME LABELS (Angled along paths)
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
    <text x="${rl.x}" y="${rl.y}" transform="rotate(${rl.angle}, ${rl.x}, ${rl.y})" fill="#746A54" font-family="'Lay Grotesk Regular', system-ui, sans-serif" font-size="24" font-weight="500" letter-spacing="0.08em" opacity="0.8">${rl.text}</text>`;
});

// 10. SECONDARY LANDMARK CHIPS (Frosted Casa Momo aesthetic)
const landmarkChips = [
  { name: 'Bindaua', pos: T([475, 210]), xOffset: 25, yOffset: -55 },
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
      <rect x="${pillX}" y="${pillY}" width="${textWidth}" height="${pillHeight}" rx="${rx}" ry="${rx}" fill="#FFFBF2" fill-opacity="0.96" stroke="#E2D4BC" stroke-width="2" />
      <text x="${pillX + textWidth / 2}" y="${pillY + 45}" fill="#261C10" text-anchor="middle">${text}</text>
    </g>`;
});

// Master SVG artwork
const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <!-- Seamless top & bottom edge dissolves -->
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

    <!-- Casa Momo chip dropshadows -->
    <filter id="chipShadow" x="-25%" y="-30%" width="150%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#4A3418" flood-opacity="0.10" />
    </filter>
  </defs>

  <!-- Base Canvas Background (Casa Momo warm butter) -->
  <rect width="${width}" height="${height}" fill="#FFF0CA" />

  <!-- 1. Water Canal Ribbon (Equivalent to River Mur in Casa Momo) -->
  <g fill="none">
${canalBanksSvg}
${canalWaterSvg}
  </g>

  <!-- 2. Topographical Masses & Orchard Groves (Schlossberg & Stadtpark equivalents) -->
  <g id="terrain-masses">
${terrainSvg}
  </g>

  <!-- 3. Building Footprints & Urban Compounds (Casa Momo 10% urban density!) -->
  <g id="building-footprints">
${buildingsSvg}
  </g>

  <!-- 4. Agricultural Field Tracks (Casing) -->
  <g fill="none" stroke="#EADEC7" stroke-linecap="round" stroke-linejoin="round">
${fieldTracksCasingSvg}
  </g>

  <!-- 5. Agricultural Field Tracks (Body) -->
  <g fill="none" stroke="#FFF9E9" stroke-linecap="round" stroke-linejoin="round">
${fieldTracksBodySvg}
  </g>

  <!-- 6. Minor / Village Road Network (Casing) -->
  <g fill="none" stroke="#E6D8BC" stroke-linecap="round" stroke-linejoin="round">
${minorCasingSvg}
  </g>

  <!-- 7. Minor / Village Road Network (Body) -->
  <g fill="none" stroke="#FFFAEC" stroke-linecap="round" stroke-linejoin="round">
${minorBodySvg}
  </g>

  <!-- 8. Major Connecting Roads (Casing) -->
  <g fill="none" stroke="#E6D8BC" stroke-linecap="round" stroke-linejoin="round">
${majorCasingSvg}
  </g>

  <!-- 9. Major Connecting Roads (Body) -->
  <g fill="none" stroke="#FFFDF4" stroke-linecap="round" stroke-linejoin="round">
${majorBodySvg}
  </g>

  <!-- 10. Padera - Raebareli Road (NH-30 Highway Casing) -->
  <g fill="none" stroke="#E0CFB0" stroke-linecap="round" stroke-linejoin="round">
${highwayCasingSvg}
  </g>

  <!-- 11. Padera - Raebareli Road (NH-30 Highway Body) -->
  <g fill="none" stroke="#FFFDF4" stroke-linecap="round" stroke-linejoin="round">
${highwayBodySvg}
  </g>

  <!-- 12. Railway Line -->
  <g fill="none">
${railwaySvg}
  </g>

  <!-- 13. Street Name Labels -->
  <g id="street-names">
${roadLabelsSvg}
  </g>

  <!-- 14. Soft edge dissolves into subpage -->
  <rect x="0" y="0" width="${width}" height="90" fill="url(#edgeTop)" pointer-events="none" />
  <rect x="0" y="${height - 90}" width="${width}" height="90" fill="url(#edgeBottom)" pointer-events="none" />

  <!-- 15. Secondary Landmark Chips -->
  <g id="secondary-landmarks" font-family="'Lay Grotesk Regular', system-ui, -apple-system, sans-serif" font-size="34" font-weight="600" letter-spacing="0.015em">
${chipsSvg}
  </g>
</svg>`;

async function buildEnrichedMasterCartography() {
  console.log('Rendering high-density Casa Momo caliber vector map...');
  const svgBuf = Buffer.from(masterSvg, 'utf8');

  // 1. Save SVG
  const svgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map.svg';
  fs.writeFileSync(svgPath, masterSvg);
  fs.copyFileSync(svgPath, 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_master_map.svg');

  // 2. Master 3840x2400 PNG
  const png3840Path = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_master_map.png';
  await sharp(svgBuf)
    .png({ quality: 100 })
    .toFile(png3840Path);
  console.log('Saved 3840x2400 master map to', png3840Path);

  fs.copyFileSync(
    png3840Path,
    'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_master_map_3840.png'
  );

  // 3. Web 1920x1200 PNG and WebP
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

  console.log('Successfully built and exported high-density Casa Momo caliber map!');
}

buildEnrichedMasterCartography().catch(console.error);
