import fs from 'fs';
const c = fs.readFileSync('scripts/script_main.mjs', 'utf8');

// print all routes
const routes = [...c.matchAll(/path:\`([^\`]+)\`/g)];
for (const r of routes) {
  console.log('Route:', r[1]);
}
