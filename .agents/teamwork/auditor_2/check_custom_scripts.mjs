import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

// Find all script tags
const scriptMatches = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];

console.log(`Total script tags in open-earth-lawn.html: ${scriptMatches.length}`);

for (let i = 0; i < scriptMatches.length; i++) {
  const content = scriptMatches[i][1];
  const tag = scriptMatches[i][0].split('>')[0] + '>';
  if (content.includes('grand-hero-letter') || tag.includes('grand-subpage-engine-js') || content.includes('initCasaReveals')) {
    console.log(`\nCustom Script ${i + 1} (${tag}): Length ${content.length}`);
    const checks = [
      'navigator.webdriver',
      'playwright',
      'puppeteer',
      '6650',
      'audit',
      'test'
    ];
    for (const ch of checks) {
      if (content.toLowerCase().includes(ch)) {
        console.log(`  Flag: contains "${ch}"`);
      }
    }
  }
}
