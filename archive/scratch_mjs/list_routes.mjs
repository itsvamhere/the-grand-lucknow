import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const mainScript = fs.readFileSync(path.join(projectDir, 'scripts', 'script_main.mjs'), 'utf8');

console.log('Script main length:', mainScript.length);
// Find routes definition
const routesMatch = mainScript.match(/routes:\s*\{[\s\S]*?\}\s*,\s*elements/);
if (routesMatch) {
  console.log('Routes found:');
  console.log(routesMatch[0].substring(0, 1000));
} else {
  // search for path
  const matches = [...mainScript.matchAll(/path:\s*["'][^"']+["']/g)];
  console.log('Paths:', matches.map(m => m[0]));
}
