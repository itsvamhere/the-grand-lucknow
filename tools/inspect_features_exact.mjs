import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const featuresIdx = html.indexOf('data-framer-name="Features Wrapper"');
console.log('Features wrapper at:', featuresIdx);
console.log(html.slice(featuresIdx, featuresIdx + 4500));
