import fs from 'fs';

function checkFile(path) {
  const content = fs.readFileSync(path, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('Lay Grotesk Regular')) {
      console.log(`${path}:${i + 1}: ${l.slice(0, 160)}`);
    }
  });
}

checkFile('index.html');
checkFile('venues/open-earth-lawn.html');
