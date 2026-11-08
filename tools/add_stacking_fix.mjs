import fs from 'fs';

let script = fs.readFileSync('tools/build_booking_page.mjs', 'utf8');

const targetStyle = `<style id="grand-calendar-stacking-fix">
  .framer-90rc50,
  .framer-4stydd-container,
  .casa-bk-search {
    position: relative !important;
    z-index: 200 !important;
  }
  #grand-calendar-popup {
    z-index: 10000 !important;
  }
  #cdngc4,
  .framer-cdngc4 {
    position: relative !important;
    z-index: 1 !important;
  }
</style>`;

if (!script.includes('grand-calendar-stacking-fix')) {
  script = script.replace('</head>', `${targetStyle}\n</head>`);
  fs.writeFileSync('tools/build_booking_page.mjs', script, 'utf8');
  console.log('Added stacking fix to tools/build_booking_page.mjs');
}
