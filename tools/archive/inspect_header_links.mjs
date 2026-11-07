import fs from 'fs';

const header = fs.readFileSync('tools/extracted_home_header.html', 'utf8');

// Check links inside header
const links = header.match(/href="[^"]*"/g);
console.log('Header links:', links);

// Check if any specific IDs or classes
console.log('Header first 500 chars:', header.slice(0, 500));
