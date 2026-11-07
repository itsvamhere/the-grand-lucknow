import fs from 'node:fs';

const footer = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/home_footer_extracted.html', 'utf8');

// Find all SVG use hrefs
const svgUses = footer.match(/href="#svg[^"]+"/g) || [];
console.log('SVG uses in footer:', [...new Set(svgUses)]);

// Find all classes in footer
const classMatches = footer.match(/class="[^"]+"/g) || [];
const classes = new Set();
for (const cm of classMatches) {
  const cls = cm.replace('class="', '').replace('"', '').split(/\s+/);
  cls.forEach(c => classes.add(c));
}
console.log('Unique classes count:', classes.size);
console.log('Sample classes:', [...classes].slice(0, 20));
