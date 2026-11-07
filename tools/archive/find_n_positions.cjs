const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const regex = /.{0,50}N°0[1-9].{0,50}/g;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null) {
  count++;
  console.log(`\nMatch ${count} at pos ${m.index}:`);
  console.log(m[0].replace(/\s+/g, ' '));
}
