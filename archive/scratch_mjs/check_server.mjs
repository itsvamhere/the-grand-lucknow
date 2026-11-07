import fs from 'fs';

const serverCode = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', 'utf-8');

// Check what routes server.mjs handles
console.log('Server file length:', serverCode.length);
