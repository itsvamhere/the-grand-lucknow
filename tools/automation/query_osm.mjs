import fs from 'node:fs';

async function searchOverpassPlaces() {
  const query = `[out:json][timeout:30];
(
  node["place"](26.56,80.92,26.72,81.08);
  node["amenity"](26.56,80.92,26.72,81.08);
  node["name"](26.56,80.92,26.72,81.08);
);
out tags center;`;

  const endpoints = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.private.coffee/api/interpreter',
    'https://overpass-api.de/api/interpreter'
  ];

  for (const ep of endpoints) {
    try {
      console.log('Trying endpoint:', ep);
      const res = await fetch(ep, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'TheGrandLucknowMapGenerator/1.0 (cartography-tool; contact@elvar.in)'
        }
      });
      const text = await res.text();
      if (!res.ok) {
        console.log('HTTP', res.status, text.slice(0, 100));
        continue;
      }
      const data = JSON.parse(text);
      console.log('Success! Total elements:', data.elements.length);
      fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/overpass_places.json', JSON.stringify(data.elements, null, 2));
      
      const keywords = ['bindaua', 'atrauli', 'khujhera', 'gaura', 'jabarauli', 'madapur', 'sardar', 'grand', 'patel'];
      data.elements.forEach(m => {
        const n = (m.tags?.name || '').toLowerCase();
        const en = (m.tags?.['name:en'] || '').toLowerCase();
        if (keywords.some(k => n.includes(k) || en.includes(k))) {
          const lat = m.lat || (m.center && m.center.lat);
          const lon = m.lon || (m.center && m.center.lon);
          console.log('MATCH:', m.tags.name, '|', m.tags['name:en'] || '', '| place:', m.tags.place || '', '|', lat, lon);
        }
      });
      return;
    } catch (e) {
      console.error(ep, e.message);
    }
  }
}

searchOverpassPlaces().catch(console.error);

