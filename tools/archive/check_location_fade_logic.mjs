import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of "Location" or location heading styles in subHtml
const locIdx = subHtml.indexOf('data-framer-name="Location"');
console.log('Location index:', locIdx);
if (locIdx !== -1) {
  console.log(subHtml.slice(locIdx - 200, locIdx + 800));
}

// Find any scripts handling location scroll fade
const scripts = [...subHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, idx) => {
  if (s[1].includes('Location') || s[1].includes('location') || s[1].includes('Open in Maps')) {
    console.log(`Script ${idx} matches location:`);
    console.log(s[1].slice(0, 500));
  }
});
