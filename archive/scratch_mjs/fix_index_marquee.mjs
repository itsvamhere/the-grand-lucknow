import fs from 'fs';

let content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Replace any occurrence of two THE GRAND in footer logo
content = content.replaceAll(
  `%3ETHE%20GRAND%3C%2Ftext%3E%3Ctext%20x%3D%221803.6%22%20y%3D%22250%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Lay%20Grotesk%20Regular'%2C%20sans-serif%22%20font-size%3D%22230%22%20font-weight%3D%22700%22%20letter-spacing%3D%220.04em%22%20fill%3D%22var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2%2C%20rgb(243%2C%20236%2C%20221))%22%3ETHE%20GRAND%3C%2Ftext%3E`,
  `%3ETHE%20GRAND%3C%2Ftext%3E`
);

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', content, 'utf8');
console.log('Fixed index.html footer marquee');
