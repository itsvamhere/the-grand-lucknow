import fs from 'fs';

const can = fs.readFileSync('tools/canonical_footer.html', 'utf8');
console.log('canonical_footer.html length:', can.length);
console.log('Snippet:');
console.log(can.slice(0, 500));
