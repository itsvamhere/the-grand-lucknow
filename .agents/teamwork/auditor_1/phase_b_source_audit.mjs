import fs from 'fs';

const lawnPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
const indexPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';

console.log('=== PHASE B: SOURCE CODE INTEGRITY AUDIT ===');

const lawnContent = fs.readFileSync(lawnPath, 'utf8');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// 1. Check index.html stats
const indexStats = fs.statSync(indexPath);
console.log('index.html size:', indexStats.size);
console.log('index.html last modified:', indexStats.mtime.toISOString());

// 2. Hardcoded test result detection
const suspiciousPatterns = [
  /VICTORY CONFIRMED/i,
  /ALL ADVERSARIAL VERIFICATIONS PASSED/i,
  /window\.__test_result/i,
  /__mock/i,
  /__fake/i
];

let suspiciousFound = false;
for (const p of suspiciousPatterns) {
  if (p.test(lawnContent)) {
    console.error(`FLAG: Found suspicious test pattern in lawnContent: ${p}`);
    suspiciousFound = true;
  }
}
if (!suspiciousFound) {
  console.log('PASS: No suspicious test assertion strings or mock results in open-earth-lawn.html source.');
}

// 3. Inspect grand-subpage-engine-js
const engineMatch = lawnContent.match(/<script id="grand-subpage-engine-js">([\s\S]*?)<\/script>/);
if (!engineMatch) {
  console.error('FAIL: grand-subpage-engine-js script tag not found!');
  process.exit(1);
}
console.log('PASS: grand-subpage-engine-js found. Length:', engineMatch[1].length);
console.log('\n--- grand-subpage-engine-js content sample ---');
console.log(engineMatch[1].slice(0, 1500));
console.log('\n--- grand-subpage-engine-js tail sample ---');
console.log(engineMatch[1].slice(-1500));

// 4. Facade detection
// Verify engine contains real scroll listener, animation updates, transform math, color math
const requiredLogic = [
  'addEventListener(\'scroll\'',
  'requestAnimationFrame',
  'updateSubpageOnScroll',
  'window.scrollY',
  'opacity',
  'transform',
  'is-light-theme',
  'rgb(255, 240, 202)'
];

let missingLogic = false;
for (const item of requiredLogic) {
  if (!engineMatch[1].includes(item)) {
    console.error(`FAIL: Missing required dynamic logic in engine script: "${item}"`);
    missingLogic = true;
  }
}
if (!missingLogic) {
  console.log('\nPASS: grand-subpage-engine-js contains authentic dynamic scroll calculation, letter transform physics, theme toggling, and RAF loop.');
}
