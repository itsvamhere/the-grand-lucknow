import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// Search for header or navbar scroll scripts in index.html
const scripts = [...homeHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, idx) => {
  if (s[1].includes('navbar') || s[1].includes('Navbar') || s[1].includes('header') || s[1].includes('framer-bg7hsc')) {
    console.log(`Script ${idx} matches navbar keywords`);
    console.log(s[1].slice(0, 500));
  }
});
