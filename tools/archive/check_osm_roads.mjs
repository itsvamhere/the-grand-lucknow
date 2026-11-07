async function check() {
  const query = `[out:json];(way(around:3000,26.6355667,80.9992764)["highway"];);out tags;`;
  const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
  try {
    const r = await fetch(url);
    const data = await r.json();
    console.log('Total OSM ways in 3km radius:', data.elements.length);
    const names = data.elements.map(e => e.tags ? (e.tags.name || e.tags.ref) : null).filter(Boolean);
    console.log('Named roads:', Array.from(new Set(names)));
  } catch (e) {
    console.error(e);
  }
}
check();
