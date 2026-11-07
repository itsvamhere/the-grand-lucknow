import fs from 'fs';

const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const start = lawn.indexOf('id="grand-navbar-engine-css"');
const end = lawn.indexOf('</style>', start);
console.log(lawn.slice(start, end));
