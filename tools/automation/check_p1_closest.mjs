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

// Check the exact Gaura road stub endpoints
const p1 = project(80.97311, 26.62907); // ~ (821, 1505)
console.log('p1:', p1);

// Find what's closest to p1
const ways = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/parsed_wide_ways.json', 'utf8'));

let closestPt = null;
let minD = 999999;
let closestWay = null;

ways.highways.forEach(h => {
  if (!h.coords) return;
  h.coords.forEach((c, idx) => {
    const p = project(c[0], c[1]);
    const d = Math.hypot(p.x - p1.x, p.y - p1.y);
    if (d > 5 && d < minD) {
      minD = d;
      closestPt = p;
      closestWay = { id: h.id, highway: h.tags.highway, idx, coord: c };
    }
  });
});

console.log(`Closest road point to p1 (${p1.x}, ${p1.y}) is at distance ${minD}px:`, closestPt, closestWay);
