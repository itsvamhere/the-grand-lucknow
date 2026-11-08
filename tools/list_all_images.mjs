import fs from 'fs';

const files = fs.readdirSync('images');
console.log('Images in images/ root:');
files.forEach(f => {
  if (!fs.statSync('images/' + f).isDirectory()) console.log(' ', f);
});

if (fs.existsSync('images/venues')) {
  console.log('\nImages in images/venues:');
  fs.readdirSync('images/venues').forEach(f => console.log(' ', f));
}
