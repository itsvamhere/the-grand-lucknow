import fs from 'fs';

let code = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', 'utf8');

// Ensure aggressive no-cache on all files
code = code.replaceAll(
  `'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Access-Control-Allow-Origin': '*'`,
  `'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'`
);

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', code, 'utf8');
console.log('Updated server.mjs with aggressive no-cache headers across all responses.');
