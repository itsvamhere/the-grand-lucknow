import fs from 'node:fs';
import path from 'node:path';

const footerSnippet = fs.readFileSync('scripts/master_universal_footer_snippet.html', 'utf8');

const targetPages = [
  'venues/open-earth-lawn.html',
  'venues/venue-n1.html',
  'venues/venue-n2.html',
  'venues/venue-n3.html',
  'venues/venue-n4.html',
  'venues/venue-n5.html',
  'venues/boutique-n1.html',
  'venues/boutique-n2.html',
  'venues/boutique-n3.html',
  'venues/boutique-n4.html',
  'venues/boutique-n5.html',
  'venues/loft-n1.html',
  'apartments/boutique-n1.html',
  'apartments/boutique-n2.html',
  'apartments/boutique-n3.html',
  'apartments/boutique-n4.html',
  'apartments/boutique-n5.html',
  'apartments/loft-n1.html',
  'venues.html',
  'about.html',
  'contact.html',
  'imprint.html',
  'terms.html',
  'privacy.html'
];

let appliedCount = 0;
for (const rel of targetPages) {
  if (!fs.existsSync(rel)) continue;

  let content = fs.readFileSync(rel, 'utf8');

  // 1. Clean out existing universal footer styles, script, and markers
  content = content.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/g, '');
  content = content.replace(/<script id="grand-footer-motion-script">[\s\S]*?<\/script>/g, '');
  content = content.replace(/<!-- ========================================== -->[\s\S]*?<!-- UNIVERSAL FOOTER[\s\S]*?<!-- ========================================== -->/g, '');

  // 2. Find <footer ...>...</footer>
  const fIdx = content.indexOf('<footer');
  if (fIdx === -1) {
    console.log(`No footer found in ${rel}, skipping`);
    continue;
  }
  const fEnd = content.indexOf('</footer>', fIdx) + 9;

  content = content.slice(0, fIdx) + footerSnippet + content.slice(fEnd);

  // 3. Protect footer from any text replacement scripts
  if (content.includes("allNodes.forEach(function(el) {")) {
    content = content.replace(
      "allNodes.forEach(function(el) {\n      if (el.children.length === 0",
      "allNodes.forEach(function(el) {\n      if (el.closest('footer')) return;\n      if (el.children.length === 0"
    );
  }

  fs.writeFileSync(rel, content, 'utf8');
  console.log(`Updated master universal footer in: ${rel}`);
  appliedCount++;
}

console.log(`\nSuccessfully applied master universal footer across all ${appliedCount} pages!`);
