import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const lawnHtml = fs.readFileSync(path.join(ROOT, 'venues', 'open-earth-lawn.html'), 'utf8');

const fMatch = lawnHtml.match(/<footer[\s\S]*?<\/footer>/i);
if (fMatch) {
  console.log('Footer in lawnHtml length:', fMatch[0].length);
  console.log('Includes casamomo.at in lawn footer?', fMatch[0].includes('casamomo.at'));
  console.log('Includes 1555605 in lawn footer?', fMatch[0].includes('1555605'));
  console.log('Includes Apartments in lawn footer?', fMatch[0].includes('Apartments'));
}
