import fs from 'node:fs';

const idxHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all <style> tags in index.html
const styleMatches = idxHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
console.log('Found style tags:', styleMatches.length);

// Let's search inside each style tag for footer classes
const footerClasses = [
  'framer-18na9ah', 'framer-192t1bg', 'framer-zHQwT', 'framer-1aamxx2',
  'framer-1h4yz5c', 'framer-1bl146l', 'framer-1h0qpni', 'framer-pehj1a',
  'framer-1xenvcn', 'framer-6pw1ly', 'framer-uma0q2', 'framer-k22lqa',
  'framer-1f1481b', 'framer-1wvd9h', 'framer-109h8c8', 'framer-1v94v4x',
  'framer-15k855q', 'framer-1e8q4v1', 'framer-1p5gghc', 'framer-1f81v4c',
  'framer-t9j74a', 'framer-14b2zfs', 'framer-1i0523k', 'framer-1f4a974'
];

let extractedRules = [];
for (const st of styleMatches) {
  // Check if any footer class is in this style tag
  for (const fc of footerClasses) {
    if (st.includes(fc)) {
      // Find rules matching fc
      const regex = new RegExp(`[^}]*\\.${fc}[^\\{]*\\{[^\\}]+\\}`, 'g');
      const matches = st.match(regex);
      if (matches) {
        extractedRules.push(...matches);
      }
    }
  }
}

extractedRules = [...new Set(extractedRules)];
console.log('Extracted unique footer CSS rules count:', extractedRules.length);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/footer_rules.css', extractedRules.join('\n'), 'utf8');
console.log('Saved footer_rules.css');
