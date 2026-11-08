import https from 'https';

https.get('https://the-grand-lucknow.vercel.app', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Production home length:', data.length);
    const fStart = data.indexOf('<footer');
    const fEnd = data.indexOf('</footer>', fStart) + 9;
    const footer = data.slice(fStart, fEnd);
    console.log('Production home footer length:', footer.length);
    
    // Check ticker in production home footer
    const svgMatches = footer.match(/data:image\/svg\+xml,[^"'\)]+/g) || [];
    console.log('SVGs in prod home footer:', svgMatches.length);
    svgMatches.forEach((s, i) => {
      console.log(`SVG ${i}:`, decodeURIComponent(s).slice(0, 300));
    });
  });
}).on('error', err => console.error(err));
