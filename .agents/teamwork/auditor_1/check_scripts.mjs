import fs from 'fs';
const s = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const regex = /<script\s+id="grand-subpage-engine-js">([\s\S]*?)<\/script>/g;
let match;
let i = 0;
while ((match = regex.exec(s)) !== null) {
  i++;
  console.log(`Match ${i}: length ${match[1].length}, index ${match.index}`);
  fs.writeFileSync(`C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/auditor_1/engine_match_${i}.js`, match[1]);
}
console.log('Total matches found:', i);
