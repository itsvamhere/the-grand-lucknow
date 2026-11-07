import fs from 'fs';

const indexHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const getFooter = (html) => {
  const start = html.indexOf('<footer');
  const end = html.indexOf('</footer>', start);
  return html.substring(start, end + 9);
};

const homeF = getFooter(indexHtml);
const subF = getFooter(subHtml);

console.log('Home footer length:', homeF.length);
console.log('Subpage footer length:', subF.length);
console.log('Are footers identical?', homeF === subF);

// Check ticker markup in both
const getTicker = (f) => {
  const match = f.match(/<ul[^>]*>([\s\S]*?)<\/ul>/);
  return match ? match[0] : null;
};

console.log('Home ticker ul exists:', !!getTicker(homeF));
console.log('Subpage ticker ul exists:', !!getTicker(subF));

// Check big text SVG in both
const getSvg = (f) => {
  const match = f.match(/<svg[^>]*viewBox="([^"]*)"[^>]*>/);
  return match ? match[0] : null;
};
console.log('Home footer SVG tag:', getSvg(homeF));
console.log('Subpage footer SVG tag:', getSvg(subF));
