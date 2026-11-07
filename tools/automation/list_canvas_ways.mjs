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

const ways = JSON.parse(fs.readFileSync('scripts/parsed_wide_ways.json', 'utf8'));

const canvasWays = [];
ways.highways.forEach(h => {
  if (!h.coords || h.coords.length < 2) return;
  const pts = h.coords.map(c => project(c[0], c[1]));
  const inBounds = pts.some(p => p.x >= -200 && p.x <= 4040 && p.y >= -200 && p.y <= 2600);
  if (inBounds) {
    canvasWays.push({
      id: h.id,
      type: h.tags.highway,
      name: h.tags.name || h.tags['name:en'] || '(unnamed)',
      ptsCount: pts.length,
      start: pts[0],
      end: pts[pts.length - 1]
    });
  }
});

console.log('Canvas ways summary (total ' + canvasWays.length + '):');
canvasWays.forEach((w, idx) => {
  console.log(`${idx+1}. [${w.type}] "${w.name}" pts:${w.ptsCount} from (${w.start.x}, ${w.start.y}) to (${w.end.x}, ${w.end.y})`);
});
