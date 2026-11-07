import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const sIdx = homeHtml.indexOf('data-grand-gap');
console.log('data-grand-gap index:', sIdx);
if (sIdx !== -1) {
  console.log('Snippet around data-grand-gap:\n', homeHtml.slice(sIdx - 200, sIdx + 400));
} else {
  // search in scripts
  const scripts = [...homeHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((s, i) => {
    if (s[1].includes('data-grand-gap') || s[1].includes('162b') || s[1].includes('translateX')) {
      console.log(`Script ${i} matches:`);
      console.log(s[1].slice(0, 600));
    }
  });
}
