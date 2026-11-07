import fs from 'fs';
const lawn = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
const content = fs.readFileSync(lawn, 'utf8');

const target1 = '<div class="framer-gaygr9" data-framer-appear-id="gaygr9" style="backdrop-filter:blur(8px);background-color:rgba(255, 240, 202, 0.07);-webkit-backdrop-filter:blur(8px);border-radius:2px;opacity:1;transform:none;">';
const target2 = '<div class="framer-18mvsw1-container" data-framer-appear-id="18mvsw1" style="opacity:1;transform:none;">';

let idx = 0;
while ((idx = content.indexOf(target1, idx)) !== -1) {
  console.log('Target 1 line:', content.slice(0, idx).split('\n').length);
  idx += target1.length;
}

idx = content.indexOf(target2);
if (idx !== -1) {
  console.log('Target 2 line:', content.slice(0, idx).split('\n').length);
}
