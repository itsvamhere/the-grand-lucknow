import fs from 'fs';

const file = 'C:/Users/Administrator/.gemini/antigravity/scratch/the-grand-lucknow/index.html';
let content = fs.readFileSync(file, 'utf8');

const key = 'id="__framer__appearAnimationsContent">';
const idx = content.indexOf(key);
if (idx !== -1) {
  const endIdx = content.indexOf('</script>', idx);
  const snippet = content.substring(idx, endIdx);
  const updated = snippet.replace(/"delay":4\.1/g, '"delay":0.2').replace(/"delay":4/g, '"delay":0.2');
  content = content.substring(0, idx) + updated + content.substring(endIdx);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated appearAnimationsContent delay to 0.2s');
} else {
  console.error('Key not found');
}
