import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Find all /scripts/ references in all .html files
const htmlFiles = [
  'index.html',
  'about.html',
  'venues.html',
  'contact.html',
  'imprint.html',
  'terms.html',
  'privacy.html',
  'venues/open-earth-lawn.html',
  'venues/venue-n1.html'
];

const neededScripts = new Set();
for (const h of htmlFiles) {
  if (!fs.existsSync(h)) continue;
  const c = fs.readFileSync(h, 'utf8');
  const matches = c.match(/\/scripts\/[a-zA-Z0-9_\-\.]+\.(?:mjs|js|json)/g) || [];
  for (const m of matches) {
    neededScripts.add(m.replace('/scripts/', ''));
  }
}

console.log('Directly referenced scripts from HTML:', [...neededScripts]);

// Now let's trace transitive imports from script_main.mjs and others
const queue = [...neededScripts];
const allProductionAssets = new Set(neededScripts);

while (queue.length > 0) {
  const current = queue.shift();
  const filePath = `scripts/${current}`;
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /(?:from\s*["']|\bimport\s*\(\s*["']|\b(?:url|src)\s*[:=]\s*["'])\.?\/?([^"']+\.(?:mjs|js|json))["']/g;
    let m;
    while ((m = importRegex.exec(content)) !== null) {
      const dep = m[1].replace(/^\.\//, '').replace(/^scripts\//, '');
      if (!allProductionAssets.has(dep) && fs.existsSync(`scripts/${dep}`)) {
        allProductionAssets.add(dep);
        queue.push(dep);
      }
    }
  }
}

console.log(`Total production assets traced: ${allProductionAssets.size}`);
console.log('Production assets list:', [...allProductionAssets].slice(0, 30));
