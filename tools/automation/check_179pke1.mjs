import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regex = /\.framer-179pke1[^{]*\{[^}]*\}/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
