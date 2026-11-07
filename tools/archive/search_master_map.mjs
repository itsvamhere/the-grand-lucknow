import fs from 'fs';

function searchInDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = dir + '/' + e.name;
    if (e.isDirectory() && !full.includes('node_modules') && !full.includes('.git')) {
      searchInDir(full);
    } else if (e.isFile() && (e.name.endsWith('.html') || e.name.endsWith('.mjs') || e.name.endsWith('.js') || e.name.endsWith('.json'))) {
      const txt = fs.readFileSync(full, 'utf8');
      if (txt.includes('the_grand_lucknow_master_map_1920.png')) {
        console.log(`Found in: ${full}`);
      }
    }
  }
}

searchInDir('.');
