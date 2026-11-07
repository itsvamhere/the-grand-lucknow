import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];

console.log('Home footer has Casa Momo:', footer.includes('Casa Momo'));
console.log('Home footer has The Grand:', footer.includes('The Grand'));
console.log('Home footer has Moritz:', footer.includes('Moritz'));
console.log('Home footer has Graz:', footer.includes('Graz'));
console.log('Home footer has Lucknow:', footer.includes('Lucknow'));
