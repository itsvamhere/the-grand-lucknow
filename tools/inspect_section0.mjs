import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const s0Start = html.indexOf('<section class="framer-90rc50"');
const s0End = html.indexOf('</section>', s0Start) + 10;
const s0 = html.slice(s0Start, s0End);

console.log('Section 0 total length:', s0.length);
fs.writeFileSync('tools/section_0_text_header.html', s0);
console.log('Section 0 sample:\n', s0.slice(0, 1500));
