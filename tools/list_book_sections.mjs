import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

// Find all <section> elements
const sections = [];
let pos = 0;
while (true) {
  const sStart = html.indexOf('<section', pos);
  if (sStart === -1) break;
  const sEnd = html.indexOf('</section>', sStart) + 10;
  const tag = html.slice(sStart, html.indexOf('>', sStart) + 1);
  sections.push({ start: sStart, end: sEnd, tag });
  pos = sEnd;
}

console.log('Sections found in casamomo_book_page.html:');
sections.forEach((s, i) => console.log(`[${i}] ${s.tag} (length: ${s.end - s.start})`));
