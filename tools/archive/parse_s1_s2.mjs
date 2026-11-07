import fs from 'fs';

const s1 = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/s1.html', 'utf8');
const s2 = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/s2.html', 'utf8');

const ps = [...s1.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('Paragraphs in s1:', ps);

const links = [...s1.matchAll(/<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }));
console.log('Links in s1:', links);

console.log('--- s2 map container ---');
const chips = [...s2.matchAll(/class="casa-map-chip"[^>]*>([^<]+)</gi)].map(m => m[1].trim());
console.log('Chips in s2:', chips);

// Also check where s2 is in index.html vs venues/boutique-n1.html
const indexHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
console.log('Does index.html have Location Map?', indexHtml.includes('Location Map'));
console.log('Does index.html have "Open in Maps"?', indexHtml.includes('Open in Maps'));
console.log('Does index.html have "Gomti Nagar"?', indexHtml.includes('Gomti Nagar'));
