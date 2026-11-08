import fs from 'fs';

if (fs.existsSync('vercel.json')) {
  console.log(fs.readFileSync('vercel.json', 'utf8'));
} else {
  console.log('No vercel.json');
}
