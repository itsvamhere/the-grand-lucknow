import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];

const matches = [...footer.matchAll(/<!--\$--><span data-rolling-label[\s\S]*?<\/span><!--\/\$-->/g)];
console.log('Matches count:', matches.length);
matches.forEach((m, i) => {
  console.log(`Match ${i + 1} length: ${m[0].length}, starts with: ${m[0].slice(0, 50)}..., ends with: ...${m[0].slice(-30)}`);
});
