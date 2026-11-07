import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('<nav name=');
console.log('--- 800 chars before <nav name= ---');
console.log(html.substring(Math.max(0, idx - 800), idx));
