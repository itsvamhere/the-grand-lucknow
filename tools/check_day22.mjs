import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_live_calendar_clean.html', 'utf8');

const idx = html.indexOf('2026-11-22');
console.log('Index of 2026-11-22:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 50, idx + 200));
}
