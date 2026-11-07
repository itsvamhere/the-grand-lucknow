import fs from 'node:fs';

const snippet = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/universal_footer_snippet.html', 'utf8');

console.log('Contains Venues:', snippet.includes('Venues'));
console.log('Contains About:', snippet.includes('About'));
console.log('Contains Contact:', snippet.includes('Contact'));
console.log('Contains Instagram:', snippet.includes('Instagram'));
console.log('Contains Facebook:', snippet.includes('Facebook'));
console.log('Contains Thegrandbanquet07@gmail.com:', snippet.includes('Thegrandbanquet07@gmail.com'));
console.log('Contains +91 91291 27091:', snippet.includes('+91 91291 27091'));
console.log('Contains Imprint:', snippet.includes('Imprint'));
console.log('Contains Terms:', snippet.includes('Terms'));
console.log('Contains Privacy:', snippet.includes('Privacy'));
console.log('Contains Edifice:', snippet.includes('Edifice'));
console.log('Contains svg870196829_4253:', snippet.includes('svg870196829_4253'));
