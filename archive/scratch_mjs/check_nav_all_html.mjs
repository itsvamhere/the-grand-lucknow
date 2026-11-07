import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// Check all HTML files for nav logo
for (const f of fs.readdirSync(projectDir)) {
  if (f.endsWith('.html')) {
    const html = fs.readFileSync(path.join(projectDir, f), 'utf8');
    const hasSvg133 = html.includes('svg-1334768056_3843');
    const hasWordmark = html.includes('wordmark.svg');
    const hasLogoLight = html.includes('logo-light.svg');
    console.log(`${f}: svg-133=${hasSvg133}, wordmark=${hasWordmark}, logo-light=${hasLogoLight}`);
  }
}
