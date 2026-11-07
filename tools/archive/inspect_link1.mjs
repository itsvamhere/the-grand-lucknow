import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];
const l1 = footer.match(/<a class="framer-7mgt1k[\s\S]*?<\/a>/)[0];
console.log(l1);
