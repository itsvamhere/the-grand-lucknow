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
  { name: 'Atrauli', lon: 80.9798, lat: 26.6721 }
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

for (const z of [14.5, 14.7, 14.9, 15.1]) {
  console.log(`\n=== ZOOM ${z} ===`);
  for (const l of landmarks) {
    const p = project(l.lon, l.lat, z);
    const inside = p.x >= 60 && p.x <= canvasW - 60 && p.y >= 60 && p.y <= canvasH - 60;
    console.log(`  ${l.name.padEnd(25)} -> (${p.x}, ${p.y})  ${inside ? 'OK' : 'OUTSIDE'}`);
  }
}
