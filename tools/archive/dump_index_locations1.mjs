import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const start = html.indexOf('id="locations-1"');
const sectionStart = html.lastIndexOf('<section', start);
const sectionEnd = html.indexOf('</section>', start);

const sectionHTML = html.substring(sectionStart, sectionEnd + 10);
console.log('index.html locations-1 length:', sectionHTML.length);
console.log(sectionHTML);
