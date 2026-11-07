import fs from 'node:fs';

const style = JSON.parse(fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/casamomo_lucknow_style.json', 'utf8'));

const patterns = style.layers.filter(l => l.paint && (l.paint['fill-pattern'] || l.paint['line-pattern']));
console.log('Layers with pattern:', patterns.map(l => ({ id: l.id, pattern: l.paint['fill-pattern'] || l.paint['line-pattern'] })));
