async function searchSardar() {
  const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent('Sardar Patel Mohanlalganj');
  const res = await fetch(url, { headers: { 'User-Agent': 'GrandLucknowMapVerification/1.0' } });
  const data = await res.json();
  console.log('Result:', data);
}
searchSardar();
