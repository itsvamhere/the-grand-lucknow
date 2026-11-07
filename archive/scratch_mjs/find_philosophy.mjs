import fs from 'fs';
for (const f of fs.readdirSync('scripts')) {
  if (f.endsWith('.mjs')) {
    const text = fs.readFileSync('scripts/' + f, 'utf8');
    if (/philosophy/i.test(text)) {
      console.log('scripts/' + f);
      let idx = 0;
      while ((idx = text.toLowerCase().indexOf('philosophy', idx)) !== -1) {
        console.log('  ' + text.substring(Math.max(0, idx - 40), Math.min(text.length, idx + 50)));
        idx += 10;
      }
    }
  }
}
