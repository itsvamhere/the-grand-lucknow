import fs from 'fs';

const files = [
  'scripts/Booking.DRu38j-Y.mjs',
  'scripts/ea8VEhypONL-CowtP6L2FMQ7YAMcB94GVI5vwrKH0aI.DIy8bvsL.mjs',
  'scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs',
  'scripts/ParallaxImage.B0avVUfL.mjs',
  'scripts/PXfCBBVdr1GiXbxS496O94zYab6pssG5Ev_S-lqmN0M.DHwy7ZPQ.mjs',
  'scripts/X9drs3mNUXS3PETG6xlOUkGt_KAHNqPT50YcA5qCpBQ.CB5F-yZR.mjs'
];

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  let idx = 0;
  while ((idx = c.toLowerCase().indexOf('boutique', idx)) !== -1) {
    const start = Math.max(0, idx - 40);
    const end = Math.min(c.length, idx + 80);
    console.log('  ' + c.substring(start, end).replace(/\n/g, ' '));
    idx += 8;
  }
}
