import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const matches = subHtml.match(/data-rolling-label/g);
console.log('data-rolling-label count:', matches ? matches.length : 0);

// Search in all js/mjs files
const files = fs.readdirSync('.').filter(f => f.endsWith('.js') || f.endsWith('.mjs') || f.endsWith('.html'));
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('data-rolling-label') || content.includes('rolling-label')) {
    console.log(`Found rolling-label in ${f}`);
  }
}
