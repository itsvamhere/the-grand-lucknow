import fs from 'fs';

console.log('--- vercel.json ---');
console.log(fs.readFileSync('vercel.json', 'utf8'));

console.log('--- server.mjs ---');
console.log(fs.readFileSync('server.mjs', 'utf8'));
