import fs from 'fs';

const js = fs.readFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/shared-lib.DganPNQZ.mjs", "utf8");

// Search for other occurrences of AOxZDvmqQ or svg870196829_4253 or 1202.351
const matchesMobile = [...js.matchAll(/1202\.351/g)];
console.log('Matches of 1202.351 in shared-lib:', matchesMobile.length);
matchesMobile.forEach(m => {
  const idx = m.index;
  console.log('Snippet around 1202.351:');
  console.log(js.slice(Math.max(0, idx - 100), idx + 300));
});
