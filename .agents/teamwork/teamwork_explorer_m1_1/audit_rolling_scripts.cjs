const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const subHtml = fs.readFileSync(path.join(baseDir, 'venues/open-earth-lawn.html'), 'utf8');

// Find all script blocks and see which ones reference rolling-label, footer, or letter animation
const scriptTags = subHtml.match(/<script[\s\S]*?<\/script>/gi) || [];
scriptTags.forEach((s, idx) => {
  if (s.includes('rolling') || s.includes('Footer') || s.includes('grand-') || s.includes('hover') || s.includes('translateY')) {
    console.log(`Script ${idx} (len=${s.length}):`);
    const lines = s.split('\n');
    lines.forEach((line, lIdx) => {
      if (line.includes('rolling') || line.includes('Footer') || line.includes('letter') || line.includes('span') || line.includes('translateY')) {
        console.log(`  L${lIdx+1}: ${line.trim().substring(0, 120)}`);
      }
    });
  }
});
