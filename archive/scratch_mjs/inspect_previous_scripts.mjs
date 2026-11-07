import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

['apply_all_user_fixes.mjs', 'apply_user_requested_changes.mjs', 'apply_grand_wordmark.mjs'].forEach(file => {
  const p = path.join(projectDir, file);
  if (fs.existsSync(p)) {
    console.log(`\n=== ${file} ===`);
    const content = fs.readFileSync(p, 'utf8');
    const lines = content.split('\n').filter(l => l.includes('ufowuZXjc') || l.includes('svg-1334768056') || l.includes('logo') || l.includes('wordmark') || l.includes('footer'));
    lines.forEach(l => console.log('  ', l.trim()));
  }
});
