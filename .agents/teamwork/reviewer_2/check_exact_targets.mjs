import fs from 'fs';
const lawn = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
const content = fs.readFileSync(lawn, 'utf8');

const target1 = '<div class="framer-gaygr9" data-framer-appear-id="gaygr9" style="backdrop-filter:blur(8px);background-color:rgba(255, 240, 202, 0.07);-webkit-backdrop-filter:blur(8px);border-radius:2px;opacity:1;transform:none;">';
const count1 = content.split(target1).length - 1;
console.log('Target 1 occurrences:', count1);

const target2 = '<div class="framer-18mvsw1-container" data-framer-appear-id="18mvsw1" style="opacity:1;transform:none;">';
const count2 = content.split(target2).length - 1;
console.log('Target 2 occurrences:', count2);
