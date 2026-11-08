import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const idx = homeHtml.indexOf('svg870196829_4253');
console.log(homeHtml.substring(idx - 100, idx + 200));
