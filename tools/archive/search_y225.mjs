import fs from 'fs';
import path from 'path';

function searchForPattern(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git') searchForPattern(full, pattern);
    } else {
      try {
        const content = fs.readFileSync(full, 'utf8');
        if (content.includes(pattern)) {
          console.log('FOUND PATTERN IN:', full);
        }
      } catch (e) {}
    }
  }
}

searchForPattern('.', 'y="225"');
searchForPattern('.', 'y%3D%22225%22');
searchForPattern('.', '225');
