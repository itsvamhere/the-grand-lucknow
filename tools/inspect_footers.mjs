import fs from 'fs';

const indexHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const iStart = indexHtml.indexOf('<footer');
const iEnd = indexHtml.indexOf('</footer>', iStart) + 9;
const iFooter = indexHtml.slice(iStart, iEnd);

const sStart = subHtml.indexOf('<footer');
const sEnd = subHtml.indexOf('</footer>', sStart) + 9;
const sFooter = subHtml.slice(sStart, sEnd);

console.log('Index footer length:', iFooter.length);
console.log('Subpage footer length:', sFooter.length);
console.log('Are footers identical?', iFooter === sFooter);

// Check ticker in both
const iTicker = iFooter.indexOf('GRAND');
const sTicker = sFooter.indexOf('GRAND');
console.log('Index ticker index:', iTicker);
console.log('Subpage ticker index:', sTicker);

// Check email in both
const iEmails = iFooter.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
const sEmails = sFooter.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
console.log('Index emails:', iEmails);
console.log('Subpage emails:', sEmails);
