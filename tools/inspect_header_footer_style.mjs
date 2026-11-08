import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const styleTags = homeHtml.match(/<style[\s\S]*?<\/style>/gi) || [];
styleTags.forEach((st, idx) => {
  const hasBg7hsc = st.includes('framer-bg7hsc');
  const has18na9ah = st.includes('framer-18na9ah');
  if (hasBg7hsc || has18na9ah) {
    console.log(`Style tag ${idx}: length=${st.length}, hasBg7hsc=${hasBg7hsc}, has18na9ah=${has18na9ah}`);
    // Check attributes of style tag
    const openTag = st.match(/<style[^>]*>/i)[0];
    console.log(`  Open tag: ${openTag}`);
  }
});

// Also check headers in index.html
console.log('\n--- Checking headers in index.html ---');
const headers = homeHtml.match(/<header[\s\S]*?<\/header>/gi) || [];
headers.forEach((h, i) => {
  console.log(`Header ${i}: length=${h.length}`);
  console.log(h.substring(0, 300) + '...');
});
