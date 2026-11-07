import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const scripts = [...lawn.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];

console.log(`Found ${scripts.length} script tags in open-earth-lawn.html:`);
scripts.forEach((s, i) => {
  console.log(`Script ${i}: attr=${s[1].trim()}, length=${s[2].length}, preview=${s[2].slice(0, 150).replace(/\s+/g, ' ')}`);
});
