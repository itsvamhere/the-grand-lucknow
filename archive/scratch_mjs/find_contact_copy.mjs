import fs from 'fs';

for (const f of fs.readdirSync('scripts')) {
  if (!f.endsWith('.mjs')) continue;
  const c = fs.readFileSync('scripts/' + f, 'utf8');
  for (const phrase of ['send us', 'give us', 'help you personally', 'your stay', 'celebration']) {
    if (c.includes(phrase)) {
      console.log(`[${phrase}] in scripts/${f}`);
      let idx = 0;
      while ((idx = c.indexOf(phrase, idx)) !== -1) {
        console.log('  ' + c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 60)));
        idx += phrase.length;
      }
    }
  }
}
