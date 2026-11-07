import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

function scanQuotes() {
  const files = ['index.html', ...fs.readdirSync(path.join(projectDir, 'scripts')).filter(f => f.endsWith('.mjs')).map(f => 'scripts/' + f)];
  
  for (const file of files) {
    const full = path.join(projectDir, file);
    const content = fs.readFileSync(full, 'utf8');
    
    // Look for quotes or review texts
    const reviewMatches = [...content.matchAll(/["'`]([^"'`]{20,200}?(?:stay|apartment|host|graz|austria|momo|recommend|clean|location|booked|booking|wedding|celebration|event)[^"'`]{0,200}?)["'`]/gi)];
    if (reviewMatches.length > 0) {
      console.log(`\n=== File: ${file} (${reviewMatches.length} matches) ===`);
      for (const m of reviewMatches.slice(0, 10)) {
        console.log('  ->', m[1].replace(/\n/g, ' '));
      }
    }
  }
}

scanQuotes();
