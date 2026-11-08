import fs from 'fs';

const v = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
console.log('Current rewrites:');
v.rewrites.forEach(r => console.log(r.source, '->', r.destination));
