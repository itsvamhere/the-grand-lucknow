import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

['framer-cdngc4', 'framer-3sb2hu', 'framer-gsn7ju', 'framer-1snxl4n-container', 'framer-7g9wgs', 'framer-19x7sgr-container'].forEach(cls => {
  const reg = new RegExp(`\\.${cls}[^{]*\\{[^}]*\\}`, 'g');
  const matches = html.match(reg) || [];
  console.log(`Class .${cls} matches (${matches.length}):`);
  matches.slice(0, 3).forEach(m => console.log('  ', m));
});
