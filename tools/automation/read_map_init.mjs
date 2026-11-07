import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const start = html.indexOf('<script id="grand-subpage-map-init">');
const end = html.indexOf('</script>', start);

console.log('Script length:', end - start);
console.log(html.substring(start, end + 9));
