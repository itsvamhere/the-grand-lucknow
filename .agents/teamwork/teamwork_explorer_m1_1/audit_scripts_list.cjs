const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const subHtml = fs.readFileSync(path.join(baseDir, 'venues/open-earth-lawn.html'), 'utf8');

console.log('=== INDEX.HTML SCRIPT TAGS ===');
const scriptTagsIdx = idxHtml.match(/<script[\s\S]*?<\/script>/gi) || [];
scriptTagsIdx.forEach((s, i) => {
  const src = s.match(/src="([^"]+)"/);
  console.log(`Script ${i}: src=${src ? src[1] : 'INLINE'} (len=${s.length})`);
});

console.log('=== SUBPAGE SCRIPT TAGS ===');
const scriptTagsSub = subHtml.match(/<script[\s\S]*?<\/script>/gi) || [];
scriptTagsSub.forEach((s, i) => {
  const src = s.match(/src="([^"]+)"/);
  console.log(`Script ${i}: src=${src ? src[1] : 'INLINE'} (len=${s.length})`);
});
