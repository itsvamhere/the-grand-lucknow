import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all CSS classes used in home footer
const homeFooter = homeHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];
const subFooter = subHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];

const homeClasses = new Set([...homeFooter.matchAll(/class="([^"]+)"/g)].flatMap(m => m[1].split(/\s+/)));
console.log('Total unique classes in home footer:', homeClasses.size);

// Check which of these are defined in subHtml
let missing = 0;
for (const cls of homeClasses) {
  if (!subHtml.includes('.' + cls)) {
    // console.log('Missing class in subpage CSS:', cls);
    missing++;
  }
}
console.log('Missing CSS classes in subpage:', missing, 'out of', homeClasses.size);
