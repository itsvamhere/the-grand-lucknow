import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('venues');
for (const f of files) {
  if (f.endsWith('.html')) {
    const content = fs.readFileSync(path.join('venues', f), 'utf8');
    const hasP6 = content.includes('Gallery Image 6');
    const hasSticky = content.includes('Sticky Header Text');
    const hasEngine = content.includes('grand-subpage-engine-js');
    console.log(`${f}: hasP6=${hasP6}, hasSticky=${hasSticky}, hasEngine=${hasEngine}`);
  }
}
