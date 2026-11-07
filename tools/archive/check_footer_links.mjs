import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];

const links = footer.match(/<a [^>]*>[\s\S]*?<\/a>/g) || [];
console.log('Total links in home footer:', links.length);
links.slice(0, 10).forEach((l, i) => {
  console.log(`Link ${i + 1}:`, l.slice(0, 250));
});
