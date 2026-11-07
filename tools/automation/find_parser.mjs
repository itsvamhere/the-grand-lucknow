import fs from 'node:fs';

const files = fs.readdirSync('scripts');
for (const f of files) {
  if (f.endsWith('.mjs')) {
    const content = fs.readFileSync('scripts/' + f, 'utf8');
    if (content.includes('parsed_wide_ways.json')) {
      console.log('Mentions parsed_wide_ways:', f);
    }
  }
}
