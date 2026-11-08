import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const homeFStart = homeHtml.indexOf('<footer');
const homeFEnd = homeHtml.indexOf('</footer>', homeFStart) + 9;
const homeFooter = homeHtml.slice(homeFStart, homeFEnd);

const subFStart = subHtml.indexOf('<footer');
const subFEnd = subHtml.indexOf('</footer>', subFStart) + 9;
const subFooter = subHtml.slice(subFStart, subFEnd);

// Let's compare the sections inside homeFooter and subFooter
console.log('homeFooter length:', homeFooter.length);
console.log('subFooter length:', subFooter.length);

// What tags / divs does homeFooter have that subFooter doesn't?
fs.writeFileSync('tools/home_footer.html', homeFooter, 'utf8');
fs.writeFileSync('tools/sub_footer.html', subFooter, 'utf8');
console.log('Wrote tools/home_footer.html and tools/sub_footer.html');
