import fs from 'fs';

const aboutHtml = fs.readFileSync('about.html', 'utf8');
const aStart = aboutHtml.indexOf('<footer');
const aEnd = aboutHtml.indexOf('</footer>', aStart) + 9;
const aboutFooter = aboutHtml.slice(aStart, aEnd);

console.log('About footer len:', aboutFooter.length);
console.log('About footer snippet:', aboutFooter.slice(0, 2000));
