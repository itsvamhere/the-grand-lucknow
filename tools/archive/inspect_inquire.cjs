const fs = require('fs');

function inspectInquire(file) {
  const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/' + file;
  const content = fs.readFileSync(p, 'utf8');
  let idx = 0;
  console.log(`=== Inquire Now in ${file} ===`);
  while ((idx = content.indexOf('Inquire Now', idx)) !== -1) {
    console.log(content.substring(Math.max(0, idx - 200), Math.min(content.length, idx + 200)));
    console.log('-------------------------------------------');
    idx += 11;
  }
}

inspectInquire('venues/venue-n1.html');
inspectInquire('index.html');
