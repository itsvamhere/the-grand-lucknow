import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const p = idx.indexOf('@');
while (p !== -1) {
  console.log('Found @ at', p, ':', idx.slice(p - 30, p + 50));
  break;
}
const emailMatch = idx.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
console.log('All emails in index.html:', [...new Set(emailMatch)]);
