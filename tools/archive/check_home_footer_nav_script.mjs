import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// Look for intersection observer or scroll listener on footer
const scripts = [...homeHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, idx) => {
  if (s[1].includes('Footer') || s[1].includes('footer') || s[1].includes('18na9ah')) {
    console.log(`Script ${idx} matches footer`);
    console.log(s[1].slice(0, 400));
  }
});
