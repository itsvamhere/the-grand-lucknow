import fs from 'fs';

// Check any scripts in tools/ or git history or previous transcripts that reference the_grand_lucknow_master_map
const files = fs.readdirSync('tools').filter(f => f.endsWith('.mjs') || f.endsWith('.js'));
for (const f of files) {
  const content = fs.readFileSync('tools/' + f, 'utf8');
  if (content.includes('the_grand_lucknow_master_map') || content.includes('Bindaua') || content.includes('RESORT_COORDS') || content.includes('pointer')) {
    console.log(`tools/${f} references map or coords`);
  }
}
