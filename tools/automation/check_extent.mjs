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

// What lat/lon corresponds to (0, 0) and (3840, 2400)?
function unproject(px, py) {
  const sinCenterLat = Math.sin((centerLat * Math.PI) / 180);
  const cx = worldSize * (centerLon + 180) / 360;
  const cy = (worldSize / (2 * Math.PI)) * (Math.PI - Math.log((1 + sinCenterLat) / (1 - sinCenterLat)) / 2);

  const x = (px - 1920) + cx;
  const y = (py - 1200) + cy;

  const lon = (x / worldSize) * 360 - 180;
  const expY = Math.exp(2 * (Math.PI - (y * 2 * Math.PI) / worldSize));
  const sinLat = (expY - 1) / (expY + 1);
  const lat = (Math.asin(sinLat) * 180) / Math.PI;

  return { lon, lat };
}

console.log('Top-left (0,0):', unproject(0, 0));
console.log('Bottom-right (3840, 2400):', unproject(3840, 2400));
console.log('Top-right (3840, 0):', unproject(3840, 0));
console.log('Bottom-left (0, 2400):', unproject(0, 2400));
