import fs from 'fs';

const htmlPages = [
  'index.html',
  'about.html',
  'venues.html',
  'contact.html',
  'venues/open-earth-lawn.html',
  'venues/venue-n1.html'
];

const results = {};

for (const p of htmlPages) {
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, 'utf8');
  
  // Find script srcs
  const scriptSrcs = [];
  const scriptRegex = /<script[^>]+src=["']([^"']+)["']/g;
  let m;
  while ((m = scriptRegex.exec(content)) !== null) {
    scriptSrcs.push(m[1]);
  }

  // Find module imports
  const moduleImports = [];
  const importRegex = /from\s+["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;
  while ((m = importRegex.exec(content)) !== null) {
    moduleImports.push(m[1] || m[2]);
  }

  // Find json references
  const jsonRefs = [];
  const jsonRegex = /["']([^"']+\.json)["']/g;
  while ((m = jsonRegex.exec(content)) !== null) {
    jsonRefs.push(m[1]);
  }

  results[p] = {
    scriptSrcs,
    moduleImports: [...new Set(moduleImports)],
    jsonRefs: [...new Set(jsonRefs)]
  };
}

console.log(JSON.stringify(results, null, 2));
