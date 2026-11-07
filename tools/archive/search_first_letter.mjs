import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Check for ::first-letter or letter-spacing or similar in CSS
const firstLetterMatches = subHtml.match(/first-letter/gi);
console.log('first-letter matches:', firstLetterMatches);

// Check all <style> tags in subpage
const styleTags = [...subHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
console.log('Total style tags:', styleTags.length);
styleTags.forEach((s, idx) => {
  if (s[1].includes('letter') || s[1].includes('Venues') || s[1].includes('gap') || s[1].includes('first')) {
    console.log(`Style tag ${idx} has interesting keyword`);
  }
});

// Let's check why there's a gap in Image 4. Where did Image 4 come from?
// Look at the text in subHtml around "Venues"
const vOccurrences = [];
let pos = 0;
while ((pos = subHtml.indexOf('nues', pos)) !== -1) {
  vOccurrences.push(subHtml.slice(Math.max(0, pos - 80), pos + 80));
  pos += 4;
}
console.log('Occurrences of "nues":', vOccurrences.length);
vOccurrences.forEach((o, i) => console.log(`[${i}] ${o.replace(/\s+/g, ' ')}`));
