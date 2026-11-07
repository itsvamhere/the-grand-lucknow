const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const gridStart = html.indexOf('data-framer-name="Venues Grid"');
const item1 = html.substring(gridStart, gridStart + 3500);

console.log(item1);
