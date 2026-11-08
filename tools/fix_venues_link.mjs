import fs from 'fs';

let vHtml = fs.readFileSync('venues.html', 'utf8');
vHtml = vHtml.replace(/href="\.\/venues\/open-earth"/g, 'href="./venues/open-earth-lawn"');
fs.writeFileSync('venues.html', vHtml, 'utf8');
console.log('venues.html updated!');

const vjson = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
if (!vjson.rewrites.some(r => r.source === '/venues/open-earth')) {
  vjson.rewrites.push({ source: '/venues/open-earth', destination: '/venues/open-earth-lawn.html' });
  fs.writeFileSync('vercel.json', JSON.stringify(vjson, null, 2), 'utf8');
  console.log('Added /venues/open-earth rewrite to vercel.json');
}
