import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
console.log('Includes svg870196829_4253?', html.includes('svg870196829_4253'));

const useMatches = html.match(/<use[^>]+>/g);
console.log('Use tags in open-earth-lawn:', useMatches);
