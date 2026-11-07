import fs from 'node:fs';
import sharp from 'sharp';

const width = 1600;
const height = 900;
const centerLon = 80.9992764; // The Grand Lucknow
const centerLat = 26.6355667;
const cosLat = Math.cos((centerLat * Math.PI) / 180);
const scale = 6141.443;
const centerX = 720;
const centerY = 480;

function project(lon, lat) {
  const x = (lon - centerLon) * cosLat * scale + centerX;
  const y = -(lat - centerLat) * scale + centerY;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

// 1. Load Real Elevation Contours (from OpenTopoData SRTM 30m DEM)
const contours = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/generated_contours.json', 'utf8'));

// Palette for stepped topographic elevation bands (warm beige gradient matching Casa Momo)
const topoColors = [
  '#FBF3DB', // 116m
  '#F6ECD1', // 117.5m
  '#F0E4C5', // 119m
  '#EBDCB8', // 120.5m
  '#E5D3AB', // 122m
  '#DEC99E', // 123.5m
  '#D8C092'  // 125m
];

// Generate Topographic Elevation Bands & Isolines
let topoFillsSvg = '';
let topoLinesSvg = '';

contours.forEach((c, idx) => {
  const fillCol = topoColors[idx] || '#EBDCB8';
  // Stepped elevation filled area
  topoFillsSvg += `  <path d="${c.d}" fill="${fillCol}" fill-opacity="0.32" stroke="none" />\n`;
  // Fine, delicate vector contour isolines
  topoLinesSvg += `  <path d="${c.d}" fill="none" stroke="#D3BF96" stroke-width="0.85" stroke-dasharray="3,3" opacity="0.65" />\n`;
});

// 2. Load OSM Vector Ways (100% Real Geographic Roads, Railways, Waterways)
const waysData = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/parsed_wide_ways.json', 'utf8'));

const trunkPaths = [];
const secondaryPaths = [];
const tertiaryPaths = [];
const minorPaths = [];
const railPaths = [];
const waterPaths = [];
const buildingPaths = [];

function coordsToD(coords) {
  if (!coords || coords.length < 2) return '';
  return coords.map((c, i) => {
    const [x, y] = project(c[0], c[1]);
    return (i === 0 ? 'M' : 'L') + `${x},${y}`;
  }).join(' ');
}

waysData.highways.forEach(w => {
  const d = coordsToD(w.coords);
  if (!d) return;
  const hw = w.tags.highway;
  if (hw === 'trunk' || hw === 'trunk_link' || hw === 'primary') {
    trunkPaths.push(d);
  } else if (hw === 'secondary' || hw === 'secondary_link') {
    secondaryPaths.push(d);
  } else if (hw === 'tertiary' || hw === 'tertiary_link') {
    tertiaryPaths.push(d);
  } else {
    minorPaths.push(d);
  }
});

waysData.railways.forEach(w => {
  const d = coordsToD(w.coords);
  if (d) railPaths.push(d);
});

waysData.waters.forEach(w => {
  const d = coordsToD(w.coords);
  if (d) waterPaths.push(d);
});

waysData.buildings.forEach(w => {
  const d = coordsToD(w.coords);
  if (d) buildingPaths.push(d + ' Z');
});

// 3. Cadastral Village Settlement Blocks (historic settlements with organic polygonal footprints)
const settlementFootprints = [
  // Mohanlalganj town center
  {
    name: 'Mohanlalganj',
    d: 'M 480,180 C 530,165 590,175 620,210 C 650,245 635,285 590,310 C 540,330 480,315 450,270 C 430,230 445,195 480,180 Z'
  },
  // Bindaua settlement block
  {
    name: 'Bindaua',
    d: 'M 640,395 C 670,385 710,395 725,420 C 740,445 720,470 690,480 C 655,490 625,475 615,445 C 610,420 625,405 640,395 Z'
  },
  // The Grand estate & surrounding gardens
  {
    name: 'The Grand Estate',
    d: 'M 710,470 C 730,465 750,470 760,485 C 768,500 755,515 735,520 C 715,522 700,510 695,495 C 692,482 700,472 710,470 Z'
  },
  // Gaura settlement block
  {
    name: 'Gaura',
    d: 'M 560,450 C 590,440 625,450 635,475 C 645,500 625,525 595,530 C 565,535 540,515 535,490 C 532,470 545,455 560,450 Z'
  },
  // Kankaha & Sardar Patel medical campus
  {
    name: 'Kankaha',
    d: 'M 750,590 C 790,575 830,585 850,615 C 870,645 850,675 810,685 C 770,695 735,675 725,640 C 720,610 735,595 750,590 Z'
  },
  // Jabarauli settlement
  {
    name: 'Jabarauli',
    d: 'M 525,550 C 555,540 585,550 595,575 C 605,600 585,620 555,625 C 525,628 505,610 500,585 C 498,565 510,555 525,550 Z'
  },
  // Madapur settlement
  {
    name: 'Madapur',
    d: 'M 685,660 C 715,650 740,660 750,680 C 760,700 745,720 720,725 C 695,730 675,715 670,695 C 668,678 675,665 685,660 Z'
  },
  // Atrauli settlement
  {
    name: 'Atrauli',
    d: 'M 585,235 C 610,225 635,235 645,255 C 655,275 640,295 615,300 C 590,305 570,290 565,270 C 562,252 572,240 585,235 Z'
  },
  // Khujhera settlement
  {
    name: 'Khujhera',
    d: 'M 850,130 C 880,120 905,130 915,150 C 925,170 910,190 885,195 C 860,198 840,185 835,165 C 832,148 840,135 850,130 Z'
  }
];

// 4. Landmarks definition
const landmarks = [
  { name: 'The Grand Lucknow', lon: 80.9992764, lat: 26.6355667, primary: true },
  { name: 'Bindaua', lon: 80.9914, lat: 26.6438 },
  { name: 'Gaura', lon: 80.9774, lat: 26.6370 },
  { name: 'Jabarauli', lon: 80.9694, lat: 26.6207 },
  { name: 'Madapur', lon: 80.9977, lat: 26.6026 },
  { name: 'Sardar Patel Institute of Ayurvedic Medical Sciences', lon: 81.0112, lat: 26.6125 },
  { name: 'Atrauli', lon: 80.9798, lat: 26.6721 },
  { name: 'Khujhera', lon: 81.0277, lat: 26.6893 }
];

// SVG Assembly
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background-color: #FFF0CA; font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;">
  <defs>
    <!-- Multi-stage edge fade masks for seamless dissolve into background #FFF0CA -->
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
    <linearGradient id="edgeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFF0CA" stop-opacity="1" />
      <stop offset="60%" stop-color="#FFF0CA" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#FFF0CA" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="edgeRight" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#FFF0CA" stop-opacity="1" />
      <stop offset="60%" stop-color="#FFF0CA" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#FFF0CA" stop-opacity="0" />
    </linearGradient>

    <!-- Refined label shadows matching Casa Momo -->
    <filter id="labelShadow" x="-10%" y="-15%" width="120%" height="135%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#4A3B22" flood-opacity="0.08" />
    </filter>
    <filter id="terracottaShadow" x="-10%" y="-15%" width="120%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" flood-color="#401A0A" flood-opacity="0.2" />
    </filter>
  </defs>

  <!-- 1. Master Canvas Background -->
  <rect width="${width}" height="${height}" fill="#FFF0CA" />

  <!-- 2. REAL TOPOGRAPHIC ELEVATION BANDS (SRTM 30m Contour Bands) -->
  <g id="topography-elevation-bands">
${topoFillsSvg}
  </g>

  <!-- 3. TOPOGRAPHIC CONTOUR ISOLINES (Fine Delicate Elevation Curves) -->
  <g id="topography-contour-lines">
${topoLinesSvg}
  </g>

  <!-- 4. Waterways, Sharda Canal & Natural Streams (Delicate organic natural channels) -->
  <g id="water-features" fill="none">
    <!-- Canal & stream soft embankment -->
    <g stroke="#EADBBD" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6">
      ${waterPaths.map(d => `<path d="${d}" />`).join('\n      ')}
    </g>
    <!-- Fluid stream line -->
    <g stroke="#FFF8E8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">
      ${waterPaths.map(d => `<path d="${d}" />`).join('\n      ')}
    </g>
  </g>

  <!-- 5. Cadastral Settlement Blocks / Historical Villages (Casa Momo urban fabric) -->
  <g id="settlement-blocks" fill="#EBDDBE" fill-opacity="0.65" stroke="none">
    ${settlementFootprints.map(s => `<path d="${s.d}" />`).join('\n    ')}
  </g>

  <!-- 6. Real Building Footprints from OSM -->
  <g id="building-footprints" fill="#DFCFA9" fill-opacity="0.85" stroke="none">
    ${buildingPaths.map(d => `<path d="${d}" />`).join('\n    ')}
  </g>

  <!-- 7. Northern Railway Track (Thin dashed line with railway casing) -->
  <g id="railways" fill="none">
    <g stroke="#EADBBD" stroke-width="2.5" opacity="0.5">
      ${railPaths.map(d => `<path d="${d}" />`).join('\n      ')}
    </g>
    <g stroke="#D0BF9E" stroke-width="1.3" stroke-dasharray="4,4" opacity="0.85">
      ${railPaths.map(d => `<path d="${d}" />`).join('\n      ')}
    </g>
  </g>

  <!-- 8. Minor Village Roads (Extremely fine, delicate white road network) -->
  <g id="minor-roads" fill="none" stroke="#FFFDF6" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
    ${minorPaths.map(d => `<path d="${d}" />`).join('\n    ')}
  </g>

  <!-- 9. Tertiary Connecting Roads -->
  <g id="tertiary-roads" fill="none" stroke="#FFFDF7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.94">
    ${tertiaryPaths.map(d => `<path d="${d}" />`).join('\n    ')}
  </g>

  <!-- 10. Secondary Roads -->
  <g id="secondary-roads" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
    ${secondaryPaths.map(d => `<path d="${d}" />`).join('\n    ')}
  </g>

  <!-- 11. Primary Highway: Raibareli Road (NH-30 / NH-24B) — prominent NW-to-SE highway corridor -->
  <g id="highway-nh30" fill="none">
    <!-- Warm subtle casing -->
    <g stroke="#E5D6B6" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.7">
      ${trunkPaths.map(d => `<path d="${d}" />`).join('\n      ')}
    </g>
    <!-- Crisp white highway core line -->
    <g stroke="#FFFFFF" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round">
      ${trunkPaths.map(d => `<path d="${d}" />`).join('\n      ')}
    </g>
  </g>

  <!-- 12. Four-directional edge dissolve masks (Seamless bleed into page background) -->
  <rect x="0" y="0" width="${width}" height="140" fill="url(#edgeTop)" pointer-events="none" />
  <rect x="0" y="${height - 140}" width="${width}" height="140" fill="url(#edgeBottom)" pointer-events="none" />
  <rect x="0" y="0" width="140" height="${height}" fill="url(#edgeLeft)" pointer-events="none" />
  <rect x="${width - 140}" y="0" width="140" height="${height}" fill="url(#edgeRight)" pointer-events="none" />

  <!-- 13. Secondary Landmark Labels (Minimalist rounded rectangular chips) -->
  <g id="secondary-landmarks" font-size="11" font-weight="500" letter-spacing="0.015em">
`;

landmarks.filter(l => !l.primary).forEach(l => {
  const [x, y] = project(l.lon, l.lat);
  const text = l.name;
  const textWidth = Math.round(text.length * 6.5) + 16;
  const pillHeight = 22;
  const rx = 3.5;
  const pillX = Math.round(x - textWidth / 2);
  const pillY = Math.round(y - pillHeight / 2);

  svg += `
    <!-- ${l.name} -->
    <g transform="translate(0, 0)">
      <rect x="${pillX}" y="${pillY}" width="${textWidth}" height="${pillHeight}" rx="${rx}" ry="${rx}" fill="#FFFDF6" fill-opacity="0.94" stroke="#E6DAC0" stroke-width="0.8" filter="url(#labelShadow)" />
      <text x="${x}" y="${y + 3.8}" fill="#3C3426" text-anchor="middle">${text}</text>
    </g>`;
});

svg += `
  </g>

  <!-- 14. Primary Destination: The Grand Lucknow (Sole focal point, terracotta treatment) -->
  <g id="primary-destination">
`;

// The Grand Lucknow
const grand = landmarks.find(l => l.primary);
const [gx, gy] = project(grand.lon, grand.lat);
const grandText = "The Grand Lucknow";
const grandWidth = 144;
const grandHeight = 28;
const grandPillX = gx - grandWidth - 14;
const grandPillY = gy - 14;

svg += `
    <!-- Terracotta Circular Marker Dot at Exact Coordinates [${grand.lon}, ${grand.lat}] -->
    <circle cx="${gx}" cy="${gy}" r="7" fill="#B96A43" stroke="#FFFFFF" stroke-width="1.8" filter="url(#terracottaShadow)" />
    <circle cx="${gx}" cy="${gy}" r="2" fill="#FFFFFF" />

    <!-- Delicate dashed connector bridge -->
    <line x1="${grandPillX + grandWidth}" y1="${gy}" x2="${gx - 7}" y2="${gy}" stroke="#B96A43" stroke-width="1.2" stroke-dasharray="2,2" opacity="0.75" />

    <!-- Terracotta Label Pill: The Grand Lucknow -->
    <g filter="url(#terracottaShadow)">
      <rect x="${grandPillX}" y="${grandPillY}" width="${grandWidth}" height="${grandHeight}" rx="4" ry="4" fill="#B96A43" />
      <text x="${grandPillX + grandWidth / 2}" y="${grandPillY + 18}" fill="#FFFDF4" font-size="12" font-weight="600" letter-spacing="0.02em" text-anchor="middle">The Grand Lucknow</text>
    </g>
  </g>
</svg>`;

const svgPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map.svg';
fs.writeFileSync(svgPath, svg, 'utf8');
console.log('Successfully written master SVG to:', svgPath);

// Copy to artifacts
const artifactSvgPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_vector_map.svg';
fs.writeFileSync(artifactSvgPath, svg, 'utf8');

// Export raster assets with sharp
const svgBuf = Buffer.from(svg, 'utf8');

console.log('Exporting 1x PNG (1600x900)...');
await sharp(svgBuf)
  .resize(1600, 900)
  .png({ quality: 100 })
  .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map@1x.png');

console.log('Exporting 2x PNG (3200x1800)...');
await sharp(svgBuf)
  .resize(3200, 1800)
  .png({ quality: 100 })
  .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map@2x.png');

console.log('Exporting 3x PNG (4800x2700)...');
await sharp(svgBuf)
  .resize(4800, 2700)
  .png({ quality: 100 })
  .toFile('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map@3x.png');

fs.copyFileSync(
  'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/the_grand_lucknow_vector_map@2x.png',
  'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/the_grand_lucknow_vector_map_2x.png'
);

console.log('All topographic vector assets exported successfully!');
