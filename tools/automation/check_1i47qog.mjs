import fs from 'node:fs';

const html = fs.readFileSync('venues/casamomo_boutique_n1_original.html', 'utf8');

const regex = /\.framer-1i47qog[^{]*\{[^}]*\}/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
