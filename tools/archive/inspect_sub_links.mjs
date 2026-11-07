import fs from 'fs';

const sub = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const footerMatch = sub.match(/<footer[\s\S]*?<\/footer>/)[0];

const links = footerMatch.match(/<a [^>]*>[\s\S]*?<\/a>/g) || [];
console.log('Total links in sub footer:', links.length);
links.forEach((l, i) => {
  const href = (l.match(/href="([^"]*)"/) || [])[1];
  const text = l.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`Sub Link ${i + 1}: href=${href} text="${text}"`);
});
