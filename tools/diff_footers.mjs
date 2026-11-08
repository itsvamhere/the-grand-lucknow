import fs from 'fs';

const homeF = fs.readFileSync('tools/home_footer.html', 'utf8');
const subF = fs.readFileSync('tools/sub_footer.html', 'utf8');

// Find differences in child elements of framer-zHQwT
const homeZHStart = homeF.indexOf('class="framer-zHQwT');
const subZHStart = subF.indexOf('class="framer-zHQwT');

console.log('Home zHQwT start:', homeZHStart);
console.log('Sub zHQwT start:', subZHStart);

// Check links in homeF vs subF
const homeLinks = (homeF.match(/<a[^>]*>[\s\S]*?<\/a>/gi) || []).map(a => (a.match(/href="([^"]+)"/) || [])[1]);
const subLinks = (subF.match(/<a[^>]*>[\s\S]*?<\/a>/gi) || []).map(a => (a.match(/href="([^"]+)"/) || [])[1]);

console.log('Home links count:', homeLinks.length, homeLinks);
console.log('Sub links count:', subLinks.length, subLinks);

// Check character split spans
const homeSpans = (homeF.match(/<span/g) || []).length;
const subSpans = (subF.match(/<span/g) || []).length;
console.log('Home span count:', homeSpans);
console.log('Sub span count:', subSpans);
