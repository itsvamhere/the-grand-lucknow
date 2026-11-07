import fs from 'node:fs';

const files = fs.readdirSync('scripts').filter(f => f.endsWith('.mjs'));

for (const f of files) {
  const content = fs.readFileSync('scripts/' + f, 'utf8');
  if (content.includes('84d4c1') || content.includes('3msmtm')) {
    console.log('Script with 84d4c1/3msmtm:', f);
  }
}
