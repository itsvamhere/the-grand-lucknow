import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const t5 = fs.readFileSync(path.join(projectDir, 'scripts/T5PVEAy5F.D5-RUb5a.mjs'), 'utf-8');

// Find how DmkowNNqx (image) is rendered
const idx = t5.indexOf('DmkowNNqx');
if (idx !== -1) {
  console.log(t5.slice(idx - 100, idx + 600));
}
