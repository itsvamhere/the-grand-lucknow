import fs from 'fs';

const v = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

// Check if /book/venue already exists
if (!v.rewrites.some(r => r.source === '/book/venue')) {
  v.rewrites.unshift(
    { "source": "/book/venue", "destination": "/book/venue.html" },
    { "source": "/book/apartment", "destination": "/book/venue.html" }
  );
  fs.writeFileSync('vercel.json', JSON.stringify(v, null, 2) + '\n', 'utf8');
  console.log('Added /book/venue and /book/apartment rewrites to vercel.json');
} else {
  console.log('Rewrites already exist');
}
