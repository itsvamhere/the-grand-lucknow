import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const checks = [
  { name: 'webdriver detection', pattern: /navigator\.webdriver/i },
  { name: 'playwright detection', pattern: /playwright/i },
  { name: 'puppeteer detection', pattern: /puppeteer/i },
  { name: 'headless detection', pattern: /headless/i },
  { name: 'mock / fake test hooks', pattern: /__test__|__mock__|__audit__/i },
  { name: 'hardcoded test coordinates check', pattern: /window\.scrollY\s*===\s*6650/i },
  { name: 'hardcoded test coordinates check 2', pattern: /y\s*===\s*6650/i },
  { name: 'fake pass strings', pattern: /VERIFICATION PASSED|AUDIT PASS/i }
];

console.log('Running Phase B forensic checks on open-earth-lawn.html:');
let anyViolations = false;
for (const c of checks) {
  const match = html.match(c.pattern);
  if (match) {
    console.log(`[FAIL] ${c.name}: matched "${match[0]}" at index ${match.index}`);
    anyViolations = true;
  } else {
    console.log(`[PASS] ${c.name}: clean`);
  }
}

if (!anyViolations) {
  console.log('\nPHASE B FORENSIC INTEGRITY: ALL CHECKS PASSED (CLEAN)');
} else {
  console.log('\nPHASE B FORENSIC INTEGRITY: VIOLATION FOUND');
}
