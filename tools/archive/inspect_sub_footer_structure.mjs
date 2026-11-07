import fs from 'fs';

const sub = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const footerMatch = sub.match(/<footer[\s\S]*?<\/footer>/);
console.log('Sub footer length:', footerMatch[0].length);

// Check if sub footer currently has ssr-variant
console.log('Sub footer has ssr-variant:', footerMatch[0].includes('ssr-variant'));

// Check what child elements exist in sub footer
const classMatches = footerMatch[0].match(/class="[^"]*"/g) || [];
console.log('Unique classes in sub footer:');
const uniqueClasses = [...new Set(classMatches.map(c => c.replace(/class="|"/g, '').split(' ')).flat())];
console.log(uniqueClasses.slice(0, 30));
