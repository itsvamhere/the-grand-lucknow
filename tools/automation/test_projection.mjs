import fs from 'node:fs';

const width = 1600;
const height = 900;
const centerLon = 80.9992764; // The Grand
const centerLat = 26.6355667;

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

const cosLat = Math.cos((centerLat * Math.PI) / 180);

// We want all landmarks comfortably inside the canvas with padding of at least 100px from borders
// Max delta lon:
const maxDlon = Math.max(...landmarks.map(l => Math.abs(l.lon - centerLon)));
const maxDlat = Math.max(...landmarks.map(l => Math.abs(l.lat - centerLat)));

console.log('Max delta lon:', maxDlon, 'deg');
console.log('Max delta lat:', maxDlat, 'deg');

// Calculate scale so that maxDlat fits in (height/2 - 120px) = 330px
const scaleLat = 330 / maxDlat;
// and maxDlon * cosLat fits in (width/2 - 150px) = 650px
const scaleLon = 650 / (maxDlon * cosLat);

const scale = Math.min(scaleLat, scaleLon);
console.log('Selected scale factor:', scale);

// In Casa Momo, the primary marker is slightly offset to center-left (x ~ 650-700, y ~ 450-500)
// If center is at (720, 480):
const centerX = 720;
const centerY = 480;

function project(lon, lat) {
  const x = (lon - centerLon) * cosLat * scale + centerX;
  const y = -(lat - centerLat) * scale + centerY;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

console.log('Projected landmarks:');
landmarks.forEach(l => {
  const pt = project(l.lon, l.lat);
  console.log(`${l.name}: x=${pt.x}, y=${pt.y}`);
});
