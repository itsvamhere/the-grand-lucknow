import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

const s2Idx = homeHtml.indexOf('<style data-framer-css-ssr-minified');
const s2End = homeHtml.indexOf('</style>', s2Idx);
const s2 = homeHtml.substring(s2Idx, s2End);

const matches = s2.match(/[^{}]*(?:framer-bg7hsc|Navbar Wrapper)[^{}]*\{[^}]+\}/g) || [];
console.log('Matches for framer-bg7hsc in s2:');
matches.forEach(m => console.log(m));
