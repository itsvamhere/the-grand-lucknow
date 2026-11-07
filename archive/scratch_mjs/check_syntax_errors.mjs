import fs from 'fs';

console.log('Testing all scripts for syntax errors...');
for (const f of fs.readdirSync('scripts')) {
  if (f.endsWith('.mjs')) {
    try {
      await import('./scripts/' + f);
    } catch (err) {
      if (err.name === 'SyntaxError') {
        console.log(`SYNTAX ERROR in scripts/${f}:`, err.message);
      }
    }
  }
}
