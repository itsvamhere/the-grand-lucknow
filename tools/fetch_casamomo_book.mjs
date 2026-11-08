import https from 'https';
import fs from 'fs';

const url = 'https://www.casamomo.at/book/apartment?apartment=boutique-n1';

https.get(url, (res) => {
  console.log('HTTP Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('tools/casamomo_book_page.html', data, 'utf8');
    console.log('Saved casamomo_book_page.html length:', data.length);
  });
}).on('error', err => {
  console.error('Fetch error:', err.message);
});
