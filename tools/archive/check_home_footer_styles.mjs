import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// Search for footer styles in index.html
const homeStyles = [...homeHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
console.log('Total style tags in index.html:', homeStyles.length);
homeStyles.forEach((s, idx) => {
  if (s[1].includes('framer-18na9ah') || s[1].includes('Footer Test') || s[1].includes('1aamxx2') || s[1].includes('zHQwT')) {
    console.log(`Index.html style tag ${idx} has footer classes! Length: ${s[1].length}`);
    console.log(s[1].slice(0, 500));
  }
});
