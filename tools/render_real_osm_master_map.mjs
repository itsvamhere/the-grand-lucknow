import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const width = 3840;
const height = 2400;

// Geographic bounding box covering ~11 km (lat) x ~18 km (lon) around The Grand Lucknow
const minLat = 26.582;
const maxLat = 26.688;
const minLon = 80.910;
const maxLon = 81.090;

function project(lon, lat) {
  const x = ((lon - minLon) / (maxLon - minLon)) * width;
  const y = ((maxLat - lat) / (maxLat - minLat)) * height;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

const xml = fs.readFileSync('tools/automation/lucknow_wide_osm.xml', 'utf8');

// Parse nodes
const nodes = new Map();
const nodeRegex = /<node id=\"([^\"]+)\" [^>]*lat=\"([^\"]+)\" lon=\"([^\"]+)\"/g;
let m;
while ((m = nodeRegex.exec(xml)) !== null) {
  nodes.set(m[1], [parseFloat(m[3]), parseFloat(m[2])]); // [lon, lat]
}

// Parse ways
const ways = [];
const wayRegex = /<way id=\"([^\"]+)\"[\s\S]*?<\/way>/g;
let wm;
while ((wm = wayRegex.exec(xml)) !== null) {
  const block = wm[0];
  const id = wm[1];
  const nds = [];
  const ndRegex = /<nd ref=\"([^\"]+)\"\/>/g;
  let ndm;
  while ((ndm = ndRegex.exec(block)) !== null) {
    if (nodes.has(ndm[1])) nds.push(nodes.get(ndm[1]));
  }

  const tags = {};
  const tagRegex = /<tag k=\"([^\"]+)\" v=\"([^\"]+)\"\/>/g;
  let tm;
  while ((tm = tagRegex.exec(block)) !== null) {
    tags[tm[1]] = tm[2];
  }

  if (nds.length >= 2) {
    ways.push({ id, nds, tags });
  }
}

// Classify
const highways = [];
const majorRoads = [];
const minorRoads = [];
const tracks = [];
const railways = [];
const waterways = [];
const waterPolygons = [];

ways.forEach(w => {
  const pts = w.nds.map(pt => project(pt[0], pt[1]));
  const inView = pts.some(p => p[0] >= -300 && p[0] <= width + 300 && p[1] >= -300 && p[1] <= height + 300);
  if (!inView) return;

  const tag = w.tags;
  if (tag.railway) {
    railways.push(pts);
  } else if (tag.waterway || tag.natural === 'water') {
    if (tag.natural === 'water' || pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1]) {
      waterPolygons.push(pts);
    } else {
      waterways.push(pts);
    }
  } else if (tag.highway) {
    if (tag.highway === 'trunk' || tag.highway === 'primary' || tag.ref === 'NH30' || tag.ref === 'NH24B' || tag.name?.includes('National') || tag.ref?.includes('230')) {
      highways.push(pts);
    } else if (tag.highway === 'secondary' || tag.highway === 'tertiary' || tag.highway === 'motorway') {
      majorRoads.push(pts);
    } else if (tag.highway === 'track' || tag.highway === 'path' || tag.highway === 'footway') {
      tracks.push(pts);
    } else {
      minorRoads.push(pts);
    }
  }
});

function ptsToPath(pts) {
  return 'M ' + pts.map(p => `${p[0]} ${p[1]}`).join(' L ');
}

// SVG Definitions
const defs = `
  <defs>
    <!-- Seamless edge dissolves matching Casa Momo -->
    <linearGradient id="edgeTop" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF0CA" stop-opacity="1" />
      <stop offset="65%" stop-color="#FFF0CA" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#FFF0CA" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="edgeBottom" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#FFF0CA" stop-opacity="1" />
      <stop offset="65%" stop-color="#FFF0CA" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#FFF0CA" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="edgeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFF0CA" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#FFF0CA" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="edgeRight" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#FFF0CA" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#FFF0CA" stop-opacity="0" />
    </linearGradient>

    <!-- Water Canal Gradient -->
    <linearGradient id="canalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EADBBA" />
      <stop offset="100%" stop-color="#DFCE9E" />
    </linearGradient>

    <!-- Lake Basin Gradient -->
    <linearGradient id="lakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8D7B0" />
      <stop offset="100%" stop-color="#DEC996" />
    </linearGradient>
  </defs>
`;

// Topographical and orchard groves around settlements
const terrainPatches = [
  // Mohanlalganj North Greenbelt
  "M 1250 80 Q 1550 40 1850 90 T 2350 140 Q 2520 240 2320 320 T 1720 300 Q 1350 320 1250 240 Z",
  // Bindaua North & West Mango Orchards
  "M 1650 680 Q 1850 600 2050 640 T 2260 800 Q 2220 980 1980 1010 T 1680 950 Q 1540 820 1650 680 Z",
  // The Grand Estate Grounds
  "M 1840 1100 Q 2060 1080 2160 1150 T 2180 1340 Q 2050 1420 1900 1380 T 1810 1220 Q 1810 1140 1840 1100 Z",
  // Gaura West Woodland & Parkland
  "M 650 820 Q 950 780 1100 920 T 1150 1280 Q 1020 1480 780 1450 T 520 1220 Q 500 960 650 820 Z",
  // Ahmadpur Khalsa East Groves
  "M 2680 750 Q 2980 700 3250 820 T 3350 1180 Q 3180 1350 2900 1320 T 2600 1140 Q 2540 920 2680 750 Z",
  // Karela Jheel Nature Sanctuary Area (East)
  "M 3020 1350 Q 3350 1300 3680 1420 T 3780 1850 Q 3550 2080 3220 2000 T 2920 1740 Q 2880 1500 3020 1350 Z",
  // Sardar Patel Campus Expanse (South-West)
  "M 1180 1520 Q 1480 1480 1650 1600 T 1680 1900 Q 1520 2040 1280 2020 T 1060 1840 Q 1020 1650 1180 1520 Z",
  // Kankaha South Parkland
  "M 2180 1650 Q 2520 1600 2800 1720 T 2900 2080 Q 2720 2280 2400 2250 T 2060 2040 Q 2040 1820 2180 1650 Z",
  // Nigohan South Woodland
  "M 1650 2080 Q 1950 2000 2250 2080 T 2350 2360 Q 2150 2440 1820 2420 T 1500 2300 Q 1480 2160 1650 2080 Z"
];

let terrainSvg = terrainPatches.map(d =>
  `    <path d="${d}" fill="#E8DBC0" fill-opacity="0.40" stroke="#DECFA8" stroke-width="2" stroke-linejoin="round" />`
).join('\n');

// Settlement Building Blocks
function makeBlocks(cx, cy, count, spreadX, spreadY, sizeRange) {
  let out = '';
  let seed = cx * 1000 + cy;
  function rand() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  for (let i = 0; i < count; i++) {
    let bx = cx + (rand() - 0.5) * spreadX;
    let by = cy + (rand() - 0.5) * spreadY;
    let bw = sizeRange[0] + rand() * (sizeRange[1] - sizeRange[0]);
    let bh = sizeRange[0] + rand() * (sizeRange[1] - sizeRange[0]);
    let rot = (rand() - 0.5) * 45;
    out += `    <rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2" transform="rotate(${rot.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)})" fill="#F4E8D0" stroke="#E6D7BD" stroke-width="1.2" />\n`;
  }
  return out;
}

let blocksSvg = `
  <!-- Mohanlalganj Town Center Blocks (Dense Tehsil Center) -->
  ${makeBlocks(1560, 200, 70, 650, 260, [20, 48])}

  <!-- Kankaha Hub Blocks (South) -->
  ${makeBlocks(2180, 1880, 50, 460, 240, [18, 42])}

  <!-- Bindaua Village Cluster -->
  ${makeBlocks(1960, 970, 40, 320, 220, [16, 36])}

  <!-- Gaura Village Cluster (West) -->
  ${makeBlocks(1430, 1150, 45, 380, 240, [16, 35])}

  <!-- Ahmadpur Khalsa Cluster (East) -->
  ${makeBlocks(2300, 1040, 38, 380, 220, [16, 34])}

  <!-- Sisendi Historic Cluster (South-West) -->
  ${makeBlocks(600, 1720, 45, 440, 240, [18, 38])}

  <!-- Sardar Patel Campus Buildings -->
  ${makeBlocks(1660, 1580, 28, 340, 200, [24, 55])}

  <!-- The Grand Lucknow Estate Pavilion & Courtyard Structures -->
  <rect x="1890" y="1170" width="75" height="50" rx="3" fill="#EADBC0" stroke="#C8B595" stroke-width="2" />
  <rect x="1975" y="1185" width="55" height="40" rx="3" fill="#EADBC0" stroke="#C8B595" stroke-width="2" />
  <rect x="1910" y="1230" width="90" height="45" rx="3" fill="#EADBC0" stroke="#C8B595" stroke-width="2" />
  <rect x="1850" y="1215" width="48" height="38" rx="3" fill="#EADBC0" stroke="#C8B595" stroke-width="2" />
`;

// Build Waterways SVG
let waterwaysSvg = '';
waterways.forEach(pts => {
  const d = ptsToPath(pts);
  waterwaysSvg += `  <path d="${d}" stroke="#DECFA8" stroke-width="28" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.45" />\n`;
  waterwaysSvg += `  <path d="${d}" stroke="url(#canalGradient)" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />\n`;
});
waterPolygons.forEach(pts => {
  const d = ptsToPath(pts) + ' Z';
  waterwaysSvg += `  <path d="${d}" fill="url(#lakeGradient)" stroke="#DECFA8" stroke-width="4" opacity="0.92" />\n`;
});

// Build Rural Tracks SVG
let tracksSvg = '';
tracks.forEach(pts => {
  const d = ptsToPath(pts);
  tracksSvg += `  <path d="${d}" stroke="#EADEC7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.65" />\n`;
});

// Build Minor Roads SVG
let minorRoadsCasingSvg = '';
let minorRoadsBodySvg = '';
minorRoads.forEach(pts => {
  const d = ptsToPath(pts);
  minorRoadsCasingSvg += `  <path d="${d}" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.92" />\n`;
  minorRoadsBodySvg += `  <path d="${d}" stroke="#FFF8ED" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />\n`;
});

// Build Major Roads SVG
let majorRoadsCasingSvg = '';
let majorRoadsBodySvg = '';
majorRoads.forEach(pts => {
  const d = ptsToPath(pts);
  majorRoadsCasingSvg += `  <path d="${d}" stroke="#FFFFFF" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.96" />\n`;
  majorRoadsBodySvg += `  <path d="${d}" stroke="#FBF2E0" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none" />\n`;
});

// Build Highways SVG (NH-30 & NH-230)
let highwaysCasingSvg = '';
let highwaysBodySvg = '';
let highwaysDividerSvg = '';
highways.forEach(pts => {
  const d = ptsToPath(pts);
  highwaysCasingSvg += `  <path d="${d}" stroke="#FFFFFF" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.98" />\n`;
  highwaysBodySvg += `  <path d="${d}" stroke="#F7EDE0" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" fill="none" />\n`;
  highwaysDividerSvg += `  <path d="${d}" stroke="#D4BEA0" stroke-width="2.5" stroke-dasharray="24,14" stroke-linecap="round" fill="none" opacity="0.85" />\n`;
});

// Build Railways SVG
let railwaysSvg = '';
railways.forEach(pts => {
  const d = ptsToPath(pts);
  railwaysSvg += `  <path d="${d}" stroke="#AFA085" stroke-width="4.5" stroke-dasharray="18,10" stroke-linecap="butt" fill="none" opacity="0.75" />\n`;
});

// Route Name Labels
let roadLabelsSvg = `
  <text x="1780" y="520" transform="rotate(76, 1780, 520)" fill="#746A54" font-family="'Lay Grotesk Regular', sans-serif" font-size="24" font-weight="500" letter-spacing="0.08em" opacity="0.75">Raebareli Rd • NH-30</text>
  <text x="2020" y="1520" transform="rotate(74, 2020, 1520)" fill="#746A54" font-family="'Lay Grotesk Regular', sans-serif" font-size="24" font-weight="500" letter-spacing="0.08em" opacity="0.75">NH-30 Express</text>
  <text x="920" y="440" transform="rotate(-6, 920, 440)" fill="#746A54" font-family="'Lay Grotesk Regular', sans-serif" font-size="21" font-weight="500" letter-spacing="0.06em" opacity="0.7">Mohanlalganj - Purwa Rd</text>
  <text x="2450" y="320" transform="rotate(-4, 2450, 320)" fill="#746A54" font-family="'Lay Grotesk Regular', sans-serif" font-size="21" font-weight="500" letter-spacing="0.06em" opacity="0.7">Kisan Path • Outer Ring Rd</text>
  <text x="1050" y="1420" transform="rotate(-54, 1050, 1420)" fill="#746A54" font-family="'Lay Grotesk Regular', sans-serif" font-size="21" font-weight="500" letter-spacing="0.06em" opacity="0.7">Sisendi Rd • SH-52C</text>
  <text x="2500" y="1020" transform="rotate(18, 2500, 1020)" fill="#746A54" font-family="'Lay Grotesk Regular', sans-serif" font-size="19" font-weight="500" letter-spacing="0.06em" opacity="0.65">Ahmadpur Khalsa Rd</text>
`;

const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${defs}

  <!-- Base Canvas: Pearl Beige -->
  <rect width="${width}" height="${height}" fill="#FFF0CA" />

  <!-- Layer 1: Topographical Masses & Mango Groves -->
  <g id="terrain-masses">
${terrainSvg}
  </g>

  <!-- Layer 2: Real OpenStreetMap Waterways & Lakes -->
  <g id="water-bodies">
${waterwaysSvg}
  </g>

  <!-- Layer 3: Village & Town Building Footprints -->
  <g id="settlement-blocks">
${blocksSvg}
  </g>

  <!-- Layer 4: Real OpenStreetMap Rural Tracks & Paths -->
  <g id="field-tracks">
${tracksSvg}
  </g>

  <!-- Layer 5: Real OpenStreetMap Minor & Village Roads -->
  <g id="minor-roads">
${minorRoadsCasingSvg}
${minorRoadsBodySvg}
  </g>

  <!-- Layer 6: Real OpenStreetMap Major Roads & Arterials -->
  <g id="major-roads">
${majorRoadsCasingSvg}
${majorRoadsBodySvg}
  </g>

  <!-- Layer 7: Real OpenStreetMap National Highways (NH-30 & NH-230) -->
  <g id="highways">
${highwaysCasingSvg}
${highwaysBodySvg}
${highwaysDividerSvg}
  </g>

  <!-- Layer 8: Northern Railway Line Track -->
  <g id="railways">
${railwaysSvg}
  </g>

  <!-- Layer 9: Route Name Labels -->
  <g id="road-labels">
${roadLabelsSvg}
  </g>

  <!-- Layer 10: Seamless Vignette Edge Dissolves -->
  <rect x="0" y="0" width="${width}" height="240" fill="url(#edgeTop)" pointer-events="none" />
  <rect x="0" y="${height - 240}" width="${width}" height="240" fill="url(#edgeBottom)" pointer-events="none" />
  <rect x="0" y="0" width="180" height="${height}" fill="url(#edgeLeft)" pointer-events="none" />
  <rect x="${width - 180}" y="0" width="180" height="${height}" fill="url(#edgeRight)" pointer-events="none" />
</svg>`;

async function render() {
  console.log('Writing real OSM master SVG...');
  fs.writeFileSync('images/the_grand_lucknow_master_map.svg', masterSvg, 'utf8');

  console.log('Rendering 3840x2400 PNG via sharp...');
  await sharp(Buffer.from(masterSvg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile('images/the_grand_lucknow_master_map.png');

  console.log('Rendering 1920x1200 PNG via sharp...');
  await sharp(Buffer.from(masterSvg))
    .resize(1920, 1200)
    .png({ quality: 92, compressionLevel: 8 })
    .toFile('images/the_grand_lucknow_master_map_1920.png');

  console.log('Successfully rendered real OSM 5-10 km radius master map!');
}

render().catch(console.error);
