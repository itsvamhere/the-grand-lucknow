import fs from 'fs';
import path from 'path';

let genScript = fs.readFileSync('tools/generate_5_venue_subpages.mjs', 'utf8');
genScript = genScript.replace(
  `desc: 'An intimate outdoor space perfect for smaller gatherings, pre-wedding functions, and private celebrations. Offering lush garden ambiance, private event hospitality, and dedicated event management for unforgettable moments.'`,
  `desc: 'An intimate outdoor lawn space perfect for smaller gatherings, pre-wedding functions, and private celebrations. Garden Galaxy offers lush garden ambiance, private event hospitality, and dedicated event management for unforgettable moments.'`
);

fs.writeFileSync('tools/generate_5_venue_subpages.mjs', genScript, 'utf8');
console.log('generate_5_venue_subpages.mjs updated!');
