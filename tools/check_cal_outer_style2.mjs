import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_live_calendar_clean.html', 'utf8');
console.log('Chars 300 to 700:\n', html.slice(300, 700));
