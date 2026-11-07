import fs from 'node:fs';

const centerLon = 80.9992764;
const centerLat = 26.6355667;

// Fetch 1.5km box around venue: approx +/- 0.015 degrees lat/lon
const minLat = centerLat - 0.015;
const maxLat = centerLat + 0.015;
const minLon = centerLon - 0.018;
const maxLon = centerLon + 0.018;

const bbox = `${minLat},${minLon},${maxLat},${maxLon}`;
console.log('Close bbox around venue:', bbox);

const query = `[out:json][timeout:30];
(
  way["highway"](${bbox});
  way["building"](${bbox});
  way["landuse"](${bbox});
  way["waterway"](${bbox});
  way["leisure"](${bbox});
  node(${bbox});
);
out body;
>;
out skel qt;`;

async function getCloseFeatures() {
  const url = 'https://overpass.kumi.systems/api/interpreter';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'GrandLucknowClose/1.0' },
    body: 'data=' + encodeURIComponent(query)
  });
  if (!res.ok) {
    console.log('Failed:', res.status);
    return;
  }
  const data = await res.json();
  console.log('Total elements in 1.5km radius:', data.elements.length);

  const ways = data.elements.filter(e => e.type === 'way');
  console.log('Ways count:', ways.length);
  ways.forEach(w => {
    if (w.tags) {
      console.log('Way:', w.tags.name || w.tags.highway || w.tags.building || w.tags.landuse, w.tags);
    }
  });

  const nodesWithTags = data.elements.filter(e => e.type === 'node' && e.tags);
  console.log('Tagged nodes:', nodesWithTags.map(n => ({ name: n.tags.name, tags: n.tags, lat: n.lat, lon: n.lon })));
}

getCloseFeatures().catch(console.error);
