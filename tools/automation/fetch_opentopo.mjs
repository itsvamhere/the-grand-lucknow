import fs from 'node:fs';

async function fetchOpenTopoGrid() {
  const cols = 24;
  const rows = 14;
  const minLon = 80.930;
  const maxLon = 81.070;
  const minLat = 26.590;
  const maxLat = 26.680;

  const pts = [];

  for (let r = 0; r < rows; r++) {
    const lat = maxLat - (r / (rows - 1)) * (maxLat - minLat);
    for (let c = 0; c < cols; c++) {
      const lon = minLon + (c / (cols - 1)) * (maxLon - minLon);
      pts.push({
        lat: Math.round(lat * 10000) / 10000,
        lon: Math.round(lon * 10000) / 10000
      });
    }
  }

  console.log(`Total points: ${pts.length}. Querying in batches of 70...`);
  const batchSize = 70;
  const allElevations = [];

  for (let i = 0; i < pts.length; i += batchSize) {
    const batch = pts.slice(i, i + batchSize);
    const locParam = batch.map(p => `${p.lat},${p.lon}`).join('|');
    const url = `https://api.opentopodata.org/v1/srtm30m?locations=${locParam}`;

    console.log(`Querying batch ${i / batchSize + 1}...`);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`OpenTopoData failed: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (data.status !== 'OK') {
      throw new Error(`OpenTopoData error: ${data.error}`);
    }

    const elevs = data.results.map(r => r.elevation);
    allElevations.push(...elevs);
    console.log(`Fetched ${allElevations.length}/${pts.length} points.`);
    await new Promise(r => setTimeout(r, 1500)); // Respect 1 req/sec limit
  }

  console.log(`All ${allElevations.length} points downloaded!`);
  const minElev = Math.min(...allElevations);
  const maxElev = Math.max(...allElevations);
  console.log('Elevation range:', minElev, 'm to', maxElev, 'm');

  const gridData = {
    cols,
    rows,
    minLon,
    maxLon,
    minLat,
    maxLat,
    minElev,
    maxElev,
    elevations: allElevations
  };

  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/elevation_grid.json', JSON.stringify(gridData, null, 2));
  console.log('Successfully saved scripts/elevation_grid.json!');
}

fetchOpenTopoGrid().catch(console.error);
