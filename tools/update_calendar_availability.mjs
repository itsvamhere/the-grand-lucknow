import fs from 'fs';

let html = fs.readFileSync('tools/casamomo_live_calendar_clean.html', 'utf8');

// For dates >= 2026-11-09, remove aria-disabled="true", tabindex="-1", disabled="", line-through, and set opacity: 1; cursor: pointer;
html = html.replace(/<button[^>]*data-day="(\d{4}-\d{2}-\d{2})"[^>]*>(\d+)<\/button>/g, (match, date, day) => {
  if (date >= '2026-11-09') {
    return `<button type="button" data-day="${date}" aria-label="${day} ${date.startsWith('2026-11') ? 'November' : 'December'} 2026" style="text-align: center; padding: 0.55em 0px; border-radius: 2px; cursor: pointer; opacity: 1; text-decoration: none; background: transparent; color: rgb(255, 240, 202); font-family: inherit; font-size: 15px; border: none; outline: none;">${day}</button>`;
  } else {
    return `<button type="button" data-day="${date}" aria-disabled="true" tabindex="-1" aria-label="${day} ${date.startsWith('2026-11') ? 'November' : 'December'} 2026, past" style="text-align: center; padding: 0.55em 0px; border-radius: 2px; cursor: default; opacity: 0.25; text-decoration: line-through; background: transparent; color: rgb(255, 240, 202); font-family: inherit; font-size: 15px; border: none; outline: none;">${day}</button>`;
  }
});

fs.writeFileSync('tools/casamomo_live_calendar_clean.html', html, 'utf8');
console.log('Updated tools/casamomo_live_calendar_clean.html with realistic event calendar availability!');
