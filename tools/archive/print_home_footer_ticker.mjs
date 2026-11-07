import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const fIdx = homeHtml.indexOf('<footer');
const fEnd = homeHtml.indexOf('</footer>', fIdx) + 9;
const footerMarkup = homeHtml.slice(fIdx, fEnd);

console.log('Home footer markup length:', footerMarkup.length);
// Search for ticker or ul in footerMarkup
const ulIdx = footerMarkup.indexOf('<ul');
console.log('Snippet around <ul in home footer:\n', footerMarkup.slice(ulIdx - 100, ulIdx + 1500));
