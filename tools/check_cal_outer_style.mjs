import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_live_calendar_clean.html', 'utf8');
console.log('First 400 chars of clean calendar:\n', html.slice(0, 400));
