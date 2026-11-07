import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const footer = html.match(/<footer[\s\S]*?<\/footer>/i)[0];

const matches = footer.match(/data:image\/svg\+xml[^\s"')]+/g);
matches.forEach((m, idx) => {
  console.log(`--- MATCH ${idx} ---`);
  console.log(m.slice(0, 300));
});
