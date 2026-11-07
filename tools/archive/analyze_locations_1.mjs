import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/dump_locations-1.html', 'utf8');

const textMatches = [...html.matchAll(/>([^<]{2,})</g)].map(m => m[1].trim()).filter(Boolean);
console.log('Text items in locations-1:');
console.log(Array.from(new Set(textMatches)));

const links = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>/gi)].map(m => m[0]);
console.log('Links in locations-1:');
console.log(links);

const containers = [...html.matchAll(/<div[^>]*data-framer-name="([^"]+)"[^>]*>/gi)].map(m => m[1]);
console.log('Framer names:', containers);

const imgs = [...html.matchAll(/<img[^>]*>/gi)].map(m => m[0]);
console.log('Images:', imgs);
