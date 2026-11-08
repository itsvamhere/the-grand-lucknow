import fs from 'fs';

const vjson = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

// Check rewrites
console.log('Existing rewrites:');
console.log(vjson.rewrites);

// Ensure /venues/grassland-gala routes to /venues/grassland-gala.html
let galaRewrite = vjson.rewrites.find(r => r.source === '/venues/grassland-gala');
if (galaRewrite) {
  galaRewrite.destination = '/venues/grassland-gala.html';
} else {
  vjson.rewrites.push({
    source: '/venues/grassland-gala',
    destination: '/venues/grassland-gala.html'
  });
}

// Remove any unwanted permanent redirect for grassland-gala
if (vjson.redirects) {
  vjson.redirects = vjson.redirects.filter(r => r.source !== '/venues/grassland-gala');
}

fs.writeFileSync('vercel.json', JSON.stringify(vjson, null, 2), 'utf8');
console.log('Updated vercel.json successfully!');
