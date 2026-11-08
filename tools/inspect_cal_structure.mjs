import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_live_calendar_snippet.html', 'utf8');
console.log('Snippet length:', html.length);

// Check headings / months
const months = html.match(/<[^>]+>(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}<\/[^>]+>/g);
console.log('Months in calendar:', months);

// Check button types
const buttons = html.match(/<button[^>]*>.*?<\/button>/gs) || [];
console.log('Total buttons in calendar:', buttons.length);
if (buttons.length > 0) {
  console.log('Sample button 0:', buttons[0]);
  console.log('Sample button 1:', buttons[1]);
  console.log('Sample day button:', buttons.find(b => b.includes('>15<') || b.includes('>10<')));
}
