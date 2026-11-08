import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_live_calendar_clean.html', 'utf8');

const regex = /<button[^>]*data-day="([^"]+)"[^>]*>/g;
let m;
const available = [];
const disabled = [];
while ((m = regex.exec(html)) !== null) {
  if (m[0].includes('aria-disabled="true"') || m[0].includes('disabled=""')) {
    disabled.push(m[1]);
  } else {
    available.push(m[1]);
  }
}

console.log('Disabled days count:', disabled.length);
console.log('Available days count:', available.length);
console.log('Available days:', available);
