async function testOpenMeteo() {
  const lats = '26.6356,26.6806,26.6438,26.6125,26.6207,26.6026';
  const lons = '80.9993,80.9831,80.9914,81.0112,80.9694,80.9977';
  const url = `https://api.open-meteo.com/v1/elevation?latitude=${lats}&longitude=${lons}`;
  const res = await fetch(url);
  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Elevations:', data);
}

testOpenMeteo().catch(console.error);
