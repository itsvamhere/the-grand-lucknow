const centerLon = 80.9992764;
const centerLat = 26.6355667;
const zoom = 13.5;
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

console.log('Projected landmarks at 3840x2400 (zoom 13.5):');
landmarks.forEach(l => {
  const p = project(l.lon, l.lat);
  console.log(`${l.name.padEnd(52)}: X=${p.x}, Y=${p.y}`);
});
