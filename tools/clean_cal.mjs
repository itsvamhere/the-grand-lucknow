import fs from 'fs';

let html = fs.readFileSync('tools/casamomo_live_calendar_snippet.html', 'utf8');

// Strip out all the `[a-z-]+: unset; ` noise
const cleaned = html.replace(/[a-z0-9-]+:\s*unset;\s*/gi, '');
console.log('Cleaned length:', cleaned.length);
fs.writeFileSync('tools/casamomo_live_calendar_clean.html', cleaned);

console.log('First 2000 chars of cleaned:\n', cleaned.slice(0, 2000));
