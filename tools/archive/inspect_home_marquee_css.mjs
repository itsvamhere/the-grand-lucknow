import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// Search for ticker styles in index.html
const styles = [...homeHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
styles.forEach((s, idx) => {
  if (s[1].includes('ticker') || s[1].includes('framer-xj8hz2') || s[1].includes('framer-n49p1z')) {
    console.log(`Style ${idx} has ticker rules:`);
    const lines = s[1].split('}').filter(l => l.includes('ticker') || l.includes('xj8hz2') || l.includes('n49p1z'));
    lines.forEach(l => console.log('  ', l.trim() + '}'));
  }
});
