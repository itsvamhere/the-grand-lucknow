import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regex = /header[^;{}]*\{[^}]*z-index:[^}]*\}/g;
let m;
while ((m = regex.exec(h)) !== null) {
  console.log(m[0]);
}

const sRegex = /\[data-framer-name="Sticky Button"\][^;{}]*\{[^}]*\}/g;
while ((m = sRegex.exec(h)) !== null) {
  console.log(m[0]);
}
