import https from 'https';
import fs from 'fs';

https.get('https://www.casamomo.at/apartments/boutique-n1', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Live Casa Momo subpage length:', data.length);
    fs.writeFileSync('tools/casamomo_live_subpage.html', data, 'utf8');
    
    // Check footer in live casamomo subpage
    const fStart = data.indexOf('<footer');
    const fEnd = data.indexOf('</footer>', fStart) + 9;
    const footer = data.slice(fStart, fEnd);
    console.log('Live Casa Momo footer length:', footer.length);
    console.log('Footer class:', (footer.match(/class="([^"]+)"/) || [])[1]);
    
    // Check header in live casamomo subpage
    const headers = data.match(/<header[\s\S]*?<\/header>/gi) || [];
    console.log('Live Casa Momo headers count:', headers.length);
    headers.forEach((h, i) => {
      console.log(`Header ${i}: class="${(h.match(/class="([^"]+)"/) || [])[1]}", length=${h.length}`);
    });
  });
}).on('error', err => console.error(err));
