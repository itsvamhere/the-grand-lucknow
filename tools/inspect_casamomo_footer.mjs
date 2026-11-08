import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_live_subpage.html', 'utf8');

const fStart = html.indexOf('<footer');
const fEnd = html.indexOf('</footer>', fStart) + 9;
const footer = html.slice(fStart, fEnd);

console.log('Footer first 500 chars:');
console.log(footer.slice(0, 500));

// Check ticker in casamomo subpage footer
const hasTicker = footer.includes('framer-n49p1z') || footer.includes('framer-xj8hz2');
console.log('Has framer-n49p1z / xj8hz2:', hasTicker);

// Find what's inside footer
const framerNames = footer.match(/data-framer-name="([^"]+)"/g) || [];
console.log('data-framer-name in casamomo subpage footer:', [...new Set(framerNames)]);

// Check styles for framer-svwim0
const styleTags = html.match(/<style[\s\S]*?<\/style>/gi) || [];
styleTags.forEach((st, idx) => {
  if (st.includes('framer-svwim0')) {
    console.log(`Style ${idx} has framer-svwim0: length=${st.length}`);
    const matches = st.match(/[^{}]*framer-svwim0[^{}]*\{[^}]+\}/g) || [];
    console.log('Rules:', matches.slice(0, 5));
  }
});
