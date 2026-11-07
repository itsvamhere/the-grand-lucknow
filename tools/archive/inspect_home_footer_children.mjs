import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footerMatch = home.match(/<footer[\s\S]*?<\/footer>/);
const footer = footerMatch[0];

const ssrMatches = [];
const regex = /<div class="ssr-variant [^"]*"/g;
let m;
while ((m = regex.exec(footer)) !== null) {
  ssrMatches.push({ index: m.index, str: m[0] });
}
console.log('SSR variants inside footer:', ssrMatches);
ssrMatches.forEach((s, idx) => {
  console.log(`\n--- SSR variant ${idx + 1} at footer offset ${s.index} (${s.str}) ---`);
  console.log(footer.slice(s.index, s.index + 400));
});
