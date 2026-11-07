import fs from 'node:fs';

const html = fs.readFileSync('venues/casamomo_boutique_n1_original.html', 'utf8');

const t1 = html.match(/--token-86299043-b8f8-4618-9585-4835ac76e9b7:[^;]+;/);
const t2 = html.match(/--token-8ecd7124-9686-4bd8-bf72-4f81314652d2:[^;]+;/);
const t3 = html.match(/--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3:[^;]+;/);

console.log('Token 86299043 (chip bg):', t1 ? t1[0] : 'not found');
console.log('Token 8ecd7124 (chip text / page bg):', t2 ? t2[0] : 'not found');
console.log('Token a0f3f7f0 (dark text):', t3 ? t3[0] : 'not found');
