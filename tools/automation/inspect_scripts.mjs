import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

function printScript(id) {
  const start = html.indexOf(`id="${id}"`);
  if (start === -1) {
    console.log(`Script ${id} not found`);
    return;
  }
  const end = html.indexOf('</script>', start);
  console.log(`=== ${id} ===`);
  console.log(html.substring(start, end));
}

printScript('grand-subpage-engine-js');
printScript('casa-details-reveal-engine-js');
