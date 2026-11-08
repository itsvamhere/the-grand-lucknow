import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const wIdx = h.indexOf('wireAll');
if (wIdx !== -1) {
  console.log(h.slice(wIdx, wIdx + 1500));
} else {
  console.log('Searching sq ft in scripts:');
  const sqIdx = h.lastIndexOf('sq ft');
  console.log(h.slice(sqIdx - 200, sqIdx + 400));
}
