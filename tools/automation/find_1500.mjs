import fs from 'node:fs';

const serverCode = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', 'utf8');

const matches = serverCode.match(/.*1,?500.*/g) || [];
console.log('Matches for 1500 in server.mjs:', matches);
