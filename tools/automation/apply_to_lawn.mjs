import fs from 'node:fs';

const footerSnippet = fs.readFileSync('scripts/master_universal_footer_snippet.html', 'utf8');
const file = 'venues/open-earth-lawn.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove existing universal footer styles and script if any
content = content.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/g, '');
content = content.replace(/<script id="grand-footer-motion-script">[\s\S]*?<\/script>/g, '');
content = content.replace(/<!-- ========================================== -->[\s\S]*?<!-- UNIVERSAL FOOTER[\s\S]*?<!-- ========================================== -->/g, '');

// 2. Find <footer ...>...</footer>
const fIdx = content.indexOf('<footer');
if (fIdx === -1) {
  console.error('No footer found in open-earth-lawn.html!');
  process.exit(1);
}
const fEnd = content.indexOf('</footer>', fIdx) + 9;

content = content.slice(0, fIdx) + footerSnippet + content.slice(fEnd);

// 3. Ensure footer is protected from any allNodes text replacement script
if (content.includes("allNodes.forEach(function(el) {")) {
  content = content.replace(
    "allNodes.forEach(function(el) {\n      if (el.children.length === 0",
    "allNodes.forEach(function(el) {\n      if (el.closest('footer')) return;\n      if (el.children.length === 0"
  );
}

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully applied master universal footer to open-earth-lawn.html!');
