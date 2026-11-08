import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

// Find all <style> tags
const styles = [];
let pos = 0;
while (true) {
  const sStart = html.indexOf('<style', pos);
  if (sStart === -1) break;
  const sEnd = html.indexOf('</style>', sStart) + 8;
  styles.push(html.slice(sStart, sEnd));
  pos = sEnd;
}

console.log('Total style tags in book page:', styles.length);
console.log('Total style length:', styles.reduce((acc, s) => acc + s.length, 0));
