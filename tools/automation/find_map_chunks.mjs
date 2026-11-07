import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

// Find all script tags or chunk urls
const scriptUrls = [...html.matchAll(/src="([^"]+\.m?js)"/g)].map(m => m[1]);
console.log('Script URLs count:', scriptUrls.length);

// Also look for chunks in __framer_importMap or similar
const chunkMatches = [...html.matchAll(/"(https:\/\/[^"]+\.m?js)"/g)].map(m => m[1]);
console.log('Framer chunk URLs count:', chunkMatches.length);

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/framer_chunks.json', JSON.stringify(chunkMatches, null, 2));
