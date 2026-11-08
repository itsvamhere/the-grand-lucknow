import fs from 'fs';

const server = fs.readFileSync('server.mjs', 'utf8');
console.log(server);
