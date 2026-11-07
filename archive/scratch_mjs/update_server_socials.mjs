import fs from 'fs';

let serverCode = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', 'utf8');

if (!serverCode.includes("moritz-steinlechner-045a4417b")) {
  serverCode = serverCode.replace(
    ".replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/')",
    `.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/')`
  );
  fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', serverCode, 'utf8');
  console.log('Updated server.mjs with moritz linkedin replace');
} else {
  console.log('server.mjs already contains moritz linkedin replacement');
}
