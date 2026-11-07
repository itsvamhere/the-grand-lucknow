import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total scripts in open-earth-lawn.html:', scripts.length);

scripts.forEach((s, i) => {
  console.log(`\n--- SCRIPT ${i} (length: ${s.length}) ---`);
  console.log(s.slice(0, 300));
});
