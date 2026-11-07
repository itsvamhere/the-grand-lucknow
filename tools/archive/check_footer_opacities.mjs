import fs from 'fs';

const sub = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Check opacity overrides in universal-grand-footer-styles
const idx = sub.indexOf('id="universal-grand-footer-styles"');
const end = sub.indexOf('</style>', idx);
const styles = sub.slice(idx, end);

const opRules = styles.match(/[^}]*opacity[^}]*\}/g) || [];
console.log('Opacity rules in universal-grand-footer-styles:', opRules.length);
opRules.forEach(r => console.log(r.trim()));
