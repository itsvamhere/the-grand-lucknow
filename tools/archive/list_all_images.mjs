import fs from 'fs';

const files = fs.readdirSync('images');
console.log('Images in images/ directory:');
files.forEach(f => {
  const stat = fs.statSync('images/' + f);
  if (stat.isFile()) {
    console.log(`  ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
  }
});
