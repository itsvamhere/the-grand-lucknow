const centerLon = 80.9992764;
const centerLat = 26.6355667;
const zoom = 14.15;
const width = 3840;
const height = 2400;

const worldSize = 512 * Math.pow(2, zoom);
const sinCenterLat = Math.sin((centerLat * Math.PI) / 180);
const cx = worldSize * (centerLon + 180) / 360;
const cy = (worldSize / (2 * Math.PI)) * (Math.PI - Math.log((1 + sinCenterLat) / (1 - sinCenterLat)) / 2);

function unproject(px, py) {
  const x = cx + (px - width / 2);
  const y = cy + (py - height / 2);

  const lon = (x / worldSize) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * y) / worldSize;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { lon, lat };
}

const topLeft = unproject(0, 0);
const bottomRight = unproject(width, height);

console.log('Bounding Box (south, west, north, east):');
console.log(`[${bottomRight.lat.toFixed(6)}, ${topLeft.lon.toFixed(6)}, ${topLeft.lat.toFixed(6)}, ${bottomRight.lon.toFixed(6)}]`);
