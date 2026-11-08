import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const start = html.indexOf('data-framer-name="Apartments Grid"');
const sectionStart = html.lastIndexOf('<section', start);
const sectionEnd = html.indexOf('</section>', sectionStart) + 10;

const section = html.slice(sectionStart, sectionEnd);
console.log('Apartments Grid length:', section.length);
fs.writeFileSync('tools/casamomo_apartments_grid_snippet.html', section);
console.log('Sample snippet:\n', section.slice(0, 1500));
