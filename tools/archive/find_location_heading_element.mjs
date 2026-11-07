import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find where "Location" text element is in the HTML
const locTextIdx = subHtml.indexOf('>Location<');
console.log('>Location< index:', locTextIdx);
if (locTextIdx !== -1) {
  console.log('Snippet around >Location<:\n', subHtml.slice(Math.max(0, locTextIdx - 200), locTextIdx + 500));
} else {
  const lMatches = [...subHtml.matchAll(/Location/gi)];
  console.log('Total Location occurrences:', lMatches.length);
  lMatches.forEach((m, i) => {
    const idx = m.index;
    console.log(`[Location ${i}] at ${idx}:\n`, subHtml.slice(Math.max(0, idx - 80), idx + 100));
  });
}
