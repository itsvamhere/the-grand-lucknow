import fs from 'fs';

let html = fs.readFileSync('tools/casamomo_live_calendar_clean.html', 'utf8');

html = html.replace(/position:\s*absolute;\s*top:\s*463\.094px;\s*left:\s*48px;/, 'position: relative; top: 0px; left: 0px;');
fs.writeFileSync('tools/casamomo_live_calendar_clean.html', html, 'utf8');
console.log('Fixed calendar outer position!');
