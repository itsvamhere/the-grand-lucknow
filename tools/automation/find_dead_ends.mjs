import fs from 'node:fs';

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
    x: Math.round(1920 + (x - cx)),
    y: Math.round(1200 + (y - cy))
  };
}

const ways = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/parsed_wide_ways.json', 'utf8'));

console.log('Checking highway endpoints in canvas (3840x2400)...');
const endpoints = [];
ways.highways.forEach((h, idx) => {
  if (!h.coords || h.coords.length < 2) return;
  const start = h.coords[0];
  const end = h.coords[h.coords.length - 1];

  const ps = project(start[0], start[1]);
  const pe = project(end[0], end[1]);

  endpoints.push({ id: h.id, type: h.tags.highway, name: h.tags.name, pt: ps, coord: start });
  endpoints.push({ id: h.id, type: h.tags.highway, name: h.tags.name, pt: pe, coord: end });
});

// Find isolated endpoints (distance > 30px to any other endpoint)
const isolated = [];
for (let i = 0; i < endpoints.length; i++) {
  const p1 = endpoints[i];
  if (p1.pt.x < 100 || p1.pt.x > 3740 || p1.pt.y < 100 || p1.pt.y > 2300) continue;
  let hasNeighbor = false;
  for (let j = 0; j < endpoints.length; j++) {
    if (i === j) continue;
    const p2 = endpoints[j];
    const d = Math.hypot(p1.pt.x - p2.pt.x, p1.pt.y - p2.pt.y);
    if (d < 25) {
      hasNeighbor = true;
      break;
    }
  }
  if (!hasNeighbor) {
    isolated.push(p1);
  }
}

console.log(`Found ${isolated.length} isolated dead-end endpoints in canvas:`);
isolated.forEach(ep => {
  console.log(`  Dead-end at (${ep.pt.x}, ${ep.pt.y}) - ${ep.type} ${ep.name || '(unnamed)'} [${ep.coord[0].toFixed(5)}, ${ep.coord[1].toFixed(5)}]`);
});
