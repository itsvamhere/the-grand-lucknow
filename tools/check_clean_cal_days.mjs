import fs from 'fs';

const cal = fs.readFileSync('tools/casamomo_live_calendar_clean.html', 'utf8');
console.log('Calendar clean length:', cal.length);

// Check if all months and day grids are present
const months = cal.match(/<div style="text-align: center; margin-bottom: 0\.8em;">[^<]+<\/div>/g);
console.log('Months:', months);

// Check day buttons count
const days = cal.match(/data-day="[^"]+"/g);
console.log('Total days in calendar:', days ? days.length : 0);
if (days) {
  console.log('First 5 days:', days.slice(0, 5));
  console.log('Last 5 days:', days.slice(-5));
}
