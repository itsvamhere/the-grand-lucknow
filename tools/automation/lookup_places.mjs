async function lookupLandmarks() {
  const queries = [
    'Sardar Patel Institute of Ayurvedic Medical Sciences Lucknow',
    'Bindaua Lucknow',
    'Gaura Mohanlalganj',
    'Ahmadpur Khalsa Lucknow',
    'Kankaha Lucknow'
  ];

  for (const q of queries) {
    try {
      const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(q);
      const res = await fetch(url, { headers: { 'User-Agent': 'GrandLucknowMapVerification/1.0' } });
      const data = await res.json();
      if (data && data.length > 0) {
        console.log(q, '=>', data[0].lat, data[0].lon, data[0].display_name);
      } else {
        console.log(q, '=> NOT FOUND');
      }
    } catch (e) {
      console.log(q, '=> ERROR', e.message);
    }
  }
}

lookupLandmarks();
