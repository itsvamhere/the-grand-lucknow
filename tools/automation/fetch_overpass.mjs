import fs from 'node:fs';

async function fetchFromOverpass() {
  const bbox = '26.600,80.950,26.670,81.050';
  const query = `[out:json][timeout:30];
(
  way["highway"](${bbox});
  way["railway"](${bbox});
  way["water"](${bbox});
  way["waterway"](${bbox});
  way["natural"](${bbox});
  way["landuse"](${bbox});
  node["place"](${bbox});
  node["amenity"](${bbox});
);
out body;
>;
out skel qt;`;

  console.log('Fetching Overpass data for bbox:', bbox);
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'TheGrandLucknowMapBuilder/1.0 (contact@grandlucknow.com)'
      },
      body: 'data=' + encodeURIComponent(query)
    });
    console.log('Status:', res.status);
    if (res.ok) {
      const data = await res.json();
      console.log('Overpass returned elements:', data.elements.length);
      fs.writeFileSync('scripts/overpass_detailed_lucknow.json', JSON.stringify(data, null, 2));
      console.log('Saved to scripts/overpass_detailed_lucknow.json');
    } else {
      console.log('Failed:', await res.text());
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

fetchFromOverpass();
