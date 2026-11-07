const centerLon = 80.9992764;
const centerLat = 26.6355667;
const canvasW = 3840;
const canvasH = 2400;

const landmarks = [
  { name: 'The Grand Lucknow', lon: 80.9992764, lat: 26.6355667 },
  { name: 'Bindaua', lon: 80.9914, lat: 26.6438 },
  { name: 'Gaura', lon: 80.9774, lat: 26.6370 },
  { name: 'Jabarauli', lon: 80.9694, lat: 26.6207 },
  { name: 'Madapur', lon: 80.9977, lat: 26.6026 },
  { name: 'Sardar Patel Institute', lon: 81.0112, lat: 26.6125 },
  { name: 'Atrauli', lon: 80.9798, lat: 26.6721 },
  { name: 'Khujhera', lon: 81.0277, lat: 26.6893 }
];

function project(lon, lat, zoom) {
  const worldSize = 512 * Math.pow(2, zoom);
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const x = worldSize * (lon + 180) / 360;
  const y = (worldSize / (2 * Math.PI)) * (Math.PI - Math.log((1 + sinLat) / (1 - sinLat)) / 2);

  const sinCenterLat = Math.sin((centerLat * Math.PI) / 180);
  const cx = worldSize * (centerLon + 180) / 360;
  const cy = (worldSize / (2 * Math.PI)) * (Math.PI - Math.log((1 + sinCenterLat) / (1 - sinCenterLat)) / 2);

  return {
    x: Math.round(canvasW / 2 + (x - cx)),
    y: Math.round(canvasH / 2 + (y - cy))
  };
}

for (const z of [13.5, 13.8, 14.0, 14.15, 14.3]) {
  console.log(`\n=== ZOOM ${z} ===`);
  let allInside = true;
  for (const l of landmarks) {
    const p = project(l.lon, l.lat, z);
    const inside = p.x >= 50 && p.x <= canvasW - 50 && p.y >= 50 && p.y <= canvasH - 50;
    if (!inside) allInside = false;
    console.log(`  ${l.name.padEnd(25)} -> (${p.x}, ${p.y})  ${inside ? 'OK' : 'OUTSIDE'}`);
  }
  console.log(`All landmarks inside 3840x2400: ${allInside}`);
}
