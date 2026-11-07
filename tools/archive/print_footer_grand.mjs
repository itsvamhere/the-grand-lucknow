import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const fIdx = subHtml.indexOf('<footer');
const footerContent = subHtml.slice(fIdx);
const grandOccurrences = [...footerContent.matchAll(/THE GRAND/g)];
console.log('THE GRAND count in footer:', grandOccurrences.length);
grandOccurrences.forEach((m, i) => {
  const pos = m.index;
  console.log(`[THE GRAND ${i}] at ${pos}:\n`, footerContent.slice(Math.max(0, pos - 100), pos + 200));
});
