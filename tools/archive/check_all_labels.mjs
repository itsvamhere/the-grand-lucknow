import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];

const matches = [...footer.matchAll(/<!--\$--><span data-rolling-label[\s\S]*?<\/span><!--\/\$-->/g)];
matches.forEach((m, i) => {
  const srMatch = m[0].match(/<span style="[^"]*clip:rect\(0 0 0 0\)[^"]*">([^<]+)<\/span>/);
  const label = srMatch ? srMatch[1] : 'UNKNOWN';
  console.log(`Match ${i + 1}: ${label}`);
});
