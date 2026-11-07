import fs from 'fs';

// Check if there are scripts that captured the map
const files = fs.readdirSync('tools').filter(f => f.includes('map'));
for (const f of files) {
  const content = fs.readFileSync('tools/' + f, 'utf8');
  if (content.includes('center') || content.includes('zoom') || content.includes('bbox') || content.includes('bounds')) {
    console.log(`tools/${f} has map config:`);
    const lines = content.split('\n').filter(l => l.includes('center') || l.includes('zoom') || l.includes('bounds') || l.includes('RESORT'));
    lines.forEach(l => console.log('  ', l.trim()));
  }
}
