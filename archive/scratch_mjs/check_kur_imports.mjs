import fs from 'fs';
const c = fs.readFileSync('scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs', 'utf8');

// print all imports in kUR3
const imports = [...c.matchAll(/import\s*\{[^}]*\}\s*from\s*["']([^"']+)["']/g)];
for (const m of imports) {
  console.log('Import:', m[1]);
}
