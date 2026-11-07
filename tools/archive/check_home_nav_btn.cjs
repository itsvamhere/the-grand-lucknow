const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all occurrences of Open in Maps in index.html
const matches = Array.from(html.matchAll(/.{0,100}Open in Maps.{0,100}/gi));
console.log('Open in Maps in index.html:', matches.length);
matches.forEach((m, i) => console.log(`[${i}]`, m[0].replace(/\s+/g, ' ')));

// Check nav in index.html
const nav = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
if (nav) {
  const btn = nav[0].match(/<a class="framer-vO7O2[^"]*"[\s\S]*?<\/a>/i);
  if (btn) {
    console.log('\nNavbar Button in index.html:');
    console.log(btn[0]);
  }
}
