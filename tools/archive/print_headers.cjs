const fs = require('fs');

function printFullHeader(file) {
  const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/' + file;
  const html = fs.readFileSync(p, 'utf8');
  const m = html.match(/<header[\s\S]*?<\/header>/);
  if (m) {
    console.log(`=== FULL HEADER IN ${file} === (${m[0].length} chars)`);
    console.log(m[0]);
  }
}

printFullHeader('index.html');
printFullHeader('venues/venue-n1.html');
