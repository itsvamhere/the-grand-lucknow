import fs from 'node:fs';

async function fetchElevationGrid() {
  const cols = 35;
  const rows = 20;
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

  console.log(`Querying ${pts.length} elevation points in 7 batches of 100...`);
  const batchSize = 100;
  const allElevations = [];

  for (let i = 0; i < pts.length; i += batchSize) {
    const batch = pts.slice(i, i + batchSize);
    const lats = batch.map(p => p.lat).join(',');
    const lons = batch.map(p => p.lon).join(',');
    const url = `https://api.open-meteo.com/v1/elevation?latitude=${lats}&longitude=${lons}`;

    let data = null;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const res = await fetch(url);
        if (res.status === 429) {
          console.log(`Got 429 rate limit on attempt ${attempt}, waiting 4s...`);
          await new Promise(r => setTimeout(r, 4000));
          continue;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
        break;
      } catch (err) {
        console.log(`Error attempt ${attempt}:`, err.message);
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    if (!data || !data.elevation) {
      throw new Error(`Failed batch at index ${i}`);
    }

    allElevations.push(...data.elevation);
    console.log(`Batch success! Total fetched: ${allElevations.length}/${pts.length}`);
    await new Promise(r => setTimeout(r, 1200));
  }

  console.log(`All ${allElevations.length} elevations retrieved!`);
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
  console.log('Saved scripts/elevation_grid.json successfully!');
}

fetchElevationGrid().catch(console.error);
