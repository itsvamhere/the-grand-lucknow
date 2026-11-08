import https from 'https';

https.get('https://www.casamomo.at', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Homepage length:', data.length);
    const links = data.match(/href="([^"]+)"/g) || [];
    const uniqueLinks = [...new Set(links)];
    console.log('Links on casamomo.at:');
    uniqueLinks.forEach(l => console.log('  ', l));
  });
}).on('error', err => console.error(err));
