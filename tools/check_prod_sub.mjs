import https from 'https';

https.get('https://the-grand-lucknow.vercel.app/venues/open-earth-lawn', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Production subpage length:', data.length);
    const fStart = data.indexOf('<footer');
    const fEnd = data.indexOf('</footer>', fStart) + 9;
    const footer = data.slice(fStart, fEnd);
    console.log('Production subpage footer length:', footer.length);
    
    // Check ticker CSS and SVG in prod
    const styleIdx = data.indexOf('id="universal-grand-footer-styles"');
    if (styleIdx !== -1) {
      console.log('universal-grand-footer-styles on prod:');
      console.log(data.substring(styleIdx, styleIdx + 600));
    } else {
      console.log('No universal-grand-footer-styles on prod');
    }
  });
}).on('error', err => console.error(err));
