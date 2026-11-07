import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const match = lawn.match(/\.framer-xj8hz2\s*\{[^}]*background-image:\s*url\("([^"]+)"\)/);
if (match) {
  console.log('Decoded background-image:');
  console.log(decodeURIComponent(match[1]));
} else {
  console.log('No background-image match');
}
