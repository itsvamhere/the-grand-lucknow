import fs from 'node:fs';

const bbox = '26.594072,80.925016,26.677047,81.073537';
const query = `[out:json][timeout:60];
(
  way["highway"](${bbox});
  way["building"](${bbox});
  relation["building"](${bbox});
  way["landuse"](${bbox});
  relation["landuse"](${bbox});
  way["natural"](${bbox});
  way["waterway"](${bbox});
  way["leisure"](${bbox});
  node["place"](${bbox});
);
out body;
>;
out skel qt;`;

async function fetchOsm() {
  console.log('Querying Overpass for detailed features in bbox...');
  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'data=' + encodeURIComponent(query)
  });

  if (!res.ok) {
    throw new Error(`Overpass error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  console.log('Total OSM elements:', data.elements.length);

  const outPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/osm_detailed_bbox.json';
  fs.writeFileSync(outPath, JSON.stringify(data), 'utf8');
  console.log('Saved to', outPath);

  // Analyze breakdown
  let ways = 0, nodes = 0, rels = 0;
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
    } else if (el.type === 'relation') {
      rels++;
    }
  });

  console.log(`Ways: ${ways}, Nodes: ${nodes}, Relations: ${rels}`);
  console.log('Top tag keys on ways:', tagCounts);
}

fetchOsm().catch(console.error);
