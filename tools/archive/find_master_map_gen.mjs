import fs from 'fs';

// Let's inspect tools/test_vector_map.html or tools/update_to_full_detailed_map.mjs
// to see how the master map image was generated.
const files = fs.readdirSync('tools');
for (const f of files) {
  if (f.endsWith('.mjs') || f.endsWith('.js')) {
    const content = fs.readFileSync('tools/' + f, 'utf8');
    if (content.includes('master_map')) {
      console.log(`tools/${f} has master_map`);
    }
  }
}
