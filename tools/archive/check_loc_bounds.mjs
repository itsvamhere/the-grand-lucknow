import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/test_noframer.html', 'utf8');
const p = html.indexOf('data-framer-name="Location Map"');
console.log('Location Map index:', p);
const closingDiv = html.indexOf('</div></div><!--/$--></div></div><div class="framer-2iif9c"', p);
console.log('Closing div index:', closingDiv);
console.log(html.substring(p, p + 200));
console.log('---');
console.log(html.substring(closingDiv - 100, closingDiv + 100));
