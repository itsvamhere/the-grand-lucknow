import fs from 'fs';
import path from 'path';

const slugs = [
  'open-earth-lawn',
  'grassland-gala',
  'garden-galaxy',
  'the-grand-courtyard',
  'the-royal-legacy-banquet'
];

slugs.forEach(slug => {
  const filePath = path.join('venues', `${slug}.html`);
  const html = fs.readFileSync(filePath, 'utf8');

  // Find the features table
  const sizeMatch = html.match(/Venue Size[\s\S]*?(?:rotate\(8deg\)">|\b)([\d,]+)\s*(?:Sqft|<\/span>)/i) ||
                    html.match(/rotate\(8deg\)">([\d,]+)<\/span><\/span> <!-- --> <span[\s\S]*?Sqft/i);
  
  const capMatch = html.match(/Maximum Guests Capacity[\s\S]*?(?:rotate\(8deg\)">|\b)([\d,]+)/i) ||
                   html.match(/Maximum[\s\S]*?Guests Capacity[\s\S]*?rotate\(8deg\)">([\d,]+)/i);

  // Also check the client-side script wireAll
  const scriptSize = html.match(/el\.innerText = '([^']*(?:sq ft|Sqft)[^']*)'/)?.[1];
  const scriptCap = html.match(/el\.innerText = '(\d[\d,]*)'/)?.[1];

  console.log(`\n=== ${slug} ===`);
  console.log('HTML Size:', sizeMatch ? sizeMatch[1] : 'NOT FOUND');
  console.log('HTML Capacity:', capMatch ? capMatch[1] : 'NOT FOUND');
  console.log('Script Size:', scriptSize);
  console.log('Script Capacity:', scriptCap);
});
