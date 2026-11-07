import fs from 'node:fs';

const bbox = '26.594072,80.925016,26.677047,81.073537';
const query = `[out:json][timeout:60];
(
  way["highway"](${bbox});
  way["building"](${bbox});
  way["landuse"](${bbox});
  way["waterway"](${bbox});
  way["natural"](${bbox});
);
out body;
>;
out skel qt;`;

async function fetchOsm() {
  console.log('Querying Overpass for detailed features in bbox...');
  const res = await fetch('https://overpass.kumi.systems/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'GrandLucknowCarto/1.0 (contact@thegrandlucknow.in)'
    },
    body: 'data=' + encodeURIComponent(query)
  });

  if (!res.ok) {
    // Try alternate overpass
    console.log('Kumi returned', res.status, 'trying osm.ch...');
    const res2 = await fetch('https://overpass.osm.ch/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'GrandLucknowCarto/1.0'
      },
      body: 'data=' + encodeURIComponent(query)
    });
    if (!res2.ok) {
      throw new Error(`Overpass error: ${res2.status} ${res2.statusText}`);
    }
    const data = await res2.json();
    return saveAndAnalyze(data);
  }

  const data = await res.json();
  return saveAndAnalyze(data);
}

function saveAndAnalyze(data) {
  console.log('Total OSM elements:', data.elements.length);
  const outPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/osm_detailed_bbox.json';
  fs.writeFileSync(outPath, JSON.stringify(data), 'utf8');
  console.log('Saved to', outPath);

  let ways = 0, nodes = 0;
  const tagCounts = {};
  data.elements.forEach(el => {
    if (el.type === 'way') {
      ways++;
      if (el.tags) {
        for (const k of Object.keys(el.tags)) {
          tagCounts[k] = (tagCounts[k] || 0) + 1;
        }
      }
    } else if (el.type === 'node') {
      nodes++;
    }
  });

  console.log(`Ways: ${ways}, Nodes: ${nodes}`);
  console.log('Top tag keys on ways:', tagCounts);
}

fetchOsm().catch(console.error);
