import fs from 'node:fs';

async function fetchWideOsm() {
  const bbox = '80.910,26.585,81.090,26.685';
  const url = 'https://api.openstreetmap.org/api/0.6/map?bbox=' + bbox;
  console.log('Downloading wide 16:9 OSM XML from', url);
  const res = await fetch(url, { headers: { 'User-Agent': 'TheGrandLucknowMasterCartography/1.0 (contact@elvar.in)' } });
  console.log('Status:', res.status);
  if (res.ok) {
    const text = await res.text();
    console.log('Downloaded bytes:', text.length);
    fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/lucknow_wide_osm.xml', text);
    console.log('Saved to scripts/lucknow_wide_osm.xml');
  } else {
    console.log('Error:', await res.text());
  }
}

fetchWideOsm().catch(console.error);
