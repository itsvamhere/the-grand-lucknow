import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_live_calendar_clean.html', 'utf8');
console.log(html.slice(1500, 4500));
