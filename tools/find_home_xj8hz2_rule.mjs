import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// In index.html, find what CSS rule or inline style is applied to .framer-xj8hz2
// Let's check style tag 2
const s2Idx = homeHtml.indexOf('<style data-framer-css-ssr-minified');
const s2End = homeHtml.indexOf('</style>', s2Idx);
const s2 = homeHtml.substring(s2Idx, s2End);

console.log('Style 2 contains framer-xj8hz2:', s2.includes('framer-xj8hz2'));
const s2Xj = s2.match(/\.framer-xj8hz2\{[^}]+\}/g);
console.log('s2 rules for framer-xj8hz2:', s2Xj);

// Find any other style tags with framer-xj8hz2
const allStyles = homeHtml.match(/<style[\s\S]*?<\/style>/gi) || [];
allStyles.forEach((st, idx) => {
  if (st.includes('framer-xj8hz2')) {
    console.log(`Style ${idx} has framer-xj8hz2: length=${st.length}`);
    const matches = st.match(/[^{}]*framer-xj8hz2[^{}]*\{[^}]+\}/g);
    console.log('Matches:', matches);
  }
});
