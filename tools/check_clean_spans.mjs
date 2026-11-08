import fs from 'fs';

const up = fs.readFileSync('tools/archive/clean_rolling_spans.mjs', 'utf8');
console.log('clean_rolling_spans snippet:');
console.log(up.slice(0, 500));
