import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');
console.log('--- 374000 to 376000 ---');
console.log(html.substring(374000, 376500));
