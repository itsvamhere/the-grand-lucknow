const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idxHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

console.log('framer-v-1aamxx2 in index.html:', idxHtml.includes('framer-v-1aamxx2'));
console.log('framer-v-1aamxx2 in subpage:', subHtml.includes('framer-v-1aamxx2'));

// Find all CSS rules for framer-v-1aamxx2 or framer-1aamxx2 in index.html
const idxStyles = idxHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
idxStyles.forEach((s, i) => {
  if (s.includes('1aamxx2') || s.includes('n1wrvs')) {
    console.log(`Style ${i} has 1aamxx2 or n1wrvs:`);
    const rules = s.match(/[^{}]*\{[^{}]*\}/g) || [];
    rules.forEach(r => {
      if (r.includes('1aamxx2') || r.includes('n1wrvs')) {
        console.log('  ' + r.trim());
      }
    });
  }
});
