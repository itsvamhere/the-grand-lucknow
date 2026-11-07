import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const scriptIdx = html.indexOf('grand-subpage-engine-js');
const endScript = html.indexOf('</script>', scriptIdx);

console.log(html.slice(scriptIdx, endScript));
