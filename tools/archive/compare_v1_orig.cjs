const fs = require('fs');

const orig = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html', 'utf8');
const v1 = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

console.log('=== Original Boutique N1 ===');
console.log('Length:', orig.length);
const origH1 = orig.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
console.log('H1:', origH1 ? origH1[1].replace(/<[^>]+>/g, '').trim() : 'none');
const origTitle = orig.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', origTitle ? origTitle[1] : 'none');

console.log('\n=== Current venue-n1 ===');
console.log('Length:', v1.length);
const v1H1 = v1.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
console.log('H1:', v1H1 ? v1H1[1].replace(/<[^>]+>/g, '').trim() : 'none');
const v1Title = v1.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', v1Title ? v1Title[1] : 'none');
