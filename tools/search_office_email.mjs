import fs from 'fs';
import path from 'path';

function search(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git') search(full);
    } else if (ent.isFile() && (ent.name.endsWith('.js') || ent.name.endsWith('.mjs') || ent.name.endsWith('.html'))) {
      try {
        const text = fs.readFileSync(full, 'utf8');
        if (text.includes('office@thegrandlucknow.in')) {
          console.log(`Found in: ${full}`);
        }
      } catch (e) {}
    }
  }
}

search('.');
