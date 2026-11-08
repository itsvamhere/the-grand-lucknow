import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subpageHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// 1. Footer comparison
const homeFooterMatch = homeHtml.match(/<footer[\s\S]*?<\/footer>/i);
const subFooterMatch = subpageHtml.match(/<footer[\s\S]*?<\/footer>/i);

console.log('Home footer length:', homeFooterMatch ? homeFooterMatch[0].length : 0);
console.log('Sub footer length:', subFooterMatch ? subFooterMatch[0].length : 0);

// Check CSS in index.html for footer
console.log('\n--- Checking CSS rules in index.html containing framer-18na9ah or framer-zHQwT or framer-n49p1z or framer-xj8hz2 ---');
const styleTags = homeHtml.match(/<style[\s\S]*?<\/style>/gi) || [];
console.log('Total style tags in index.html:', styleTags.length);

const relevantSelectors = ['framer-18na9ah', 'framer-zHQwT', 'framer-n49p1z', 'framer-xj8hz2', 'framer-bg7hsc'];
relevantSelectors.forEach(sel => {
  let count = 0;
  styleTags.forEach((st, idx) => {
    if (st.includes(sel)) {
      count++;
    }
  });
  console.log(`Selector ${sel} found in ${count} style tags in index.html`);
});

// Check subpage style tags
const subStyleTags = subpageHtml.match(/<style[\s\S]*?<\/style>/gi) || [];
console.log('\nTotal style tags in subpage:', subStyleTags.length);
relevantSelectors.forEach(sel => {
  let count = 0;
  subStyleTags.forEach((st, idx) => {
    if (st.includes(sel)) {
      count++;
    }
  });
  console.log(`Selector ${sel} found in ${count} style tags in subpage`);
});
