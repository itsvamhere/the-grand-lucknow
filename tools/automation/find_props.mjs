import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

// Look for image props near Location Map or in the hydration data
const idx = html.indexOf('"Location Map"');
console.log('Location map in JSON/HTML:', idx);

// Search for any .png or .jpg or .webp in the neighborhood of idx
const nearby = html.substring(Math.max(0, idx - 2000), Math.min(html.length, idx + 2000));
const matches = [...nearby.matchAll(/https:\/\/[^"'\s]+\.(?:png|jpg|webp|svg)/gi)].map(m => m[0]);
console.log('Nearby images:', matches);

// Search whole HTML for map images
const allImages = [...html.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'\s]+/gi)].map(m => m[0]);
console.log('All framer images count:', allImages.length);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/all_images.json', JSON.stringify([...new Set(allImages)], null, 2));
