import fs from 'fs';

const head = fs.readFileSync('tools/canonical_header.html', 'utf8');
const foot = fs.readFileSync('tools/canonical_footer.html', 'utf8');

console.log('canonical_header.html length:', head.length);
console.log('canonical_header.html snippet:\n', head.slice(0, 400));

console.log('canonical_footer.html length:', foot.length);
console.log('canonical_footer.html snippet:\n', foot.slice(0, 400));
