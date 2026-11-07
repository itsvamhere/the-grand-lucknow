import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const start = html.indexOf('id="grand-subpage-engine-js"');
const end = html.indexOf('</script>', start);
console.log(html.substring(start, end));
