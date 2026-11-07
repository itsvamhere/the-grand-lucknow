import fs from 'fs';
import path from 'path';

if (!fs.existsSync('tools/automation')) {
  fs.mkdirSync('tools/automation', { recursive: true });
}

const allFiles = fs.readdirSync('scripts');
let movedCount = 0;
let keptCount = 0;

for (const f of allFiles) {
  const full = path.join('scripts', f);
  if (fs.statSync(full).isDirectory()) continue;

  if (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.xml') || f.endsWith('.clean')) {
    fs.renameSync(full, path.join('tools/automation', f));
    movedCount++;
    continue;
  }

  if (f.endsWith('.html')) {
    fs.renameSync(full, path.join('tools/automation', f));
    movedCount++;
    continue;
  }

  if (f.endsWith('.json')) {
    if (f.startsWith('searchIndex')) {
      keptCount++;
    } else {
      fs.renameSync(full, path.join('tools/automation', f));
      movedCount++;
    }
    continue;
  }

  if (f.endsWith('.mjs') || f.endsWith('.js')) {
    const content = fs.readFileSync(full, 'utf8');
    const isTestScript = (
      content.includes("from 'fs'") ||
      content.includes('from "fs"') ||
      content.includes("require('fs')") ||
      content.includes('require("fs")') ||
      content.includes("from 'playwright") ||
      content.includes('from "playwright') ||
      content.includes("from 'node:") ||
      content.includes('from "node:') ||
      content.includes("require('node:") ||
      content.includes('require("node:') ||
      content.includes("from 'http'") ||
      content.includes('from "http"') ||
      content.includes("require('http')") ||
      content.includes('require("http")') ||
      content.includes("process.exit") ||
      content.includes("console.log") && (
        f.startsWith('check_') ||
        f.startsWith('test_') ||
        f.startsWith('verify_') ||
        f.startsWith('analyze_') ||
        f.startsWith('capture_') ||
        f.startsWith('apply_') ||
        f.startsWith('build_') ||
        f.startsWith('inspect_') ||
        f.startsWith('render_') ||
        f.startsWith('screenshot_') ||
        f.startsWith('cleanup_') ||
        f.startsWith('trace_') ||
        f.startsWith('update_') ||
        f.startsWith('compare_') ||
        f.startsWith('crop_') ||
        f.startsWith('calc_') ||
        f.startsWith('measure_') ||
        f.startsWith('find_') ||
        f.startsWith('diagnose_') ||
        f.startsWith('dump_') ||
        f.startsWith('thicken_') ||
        f.startsWith('track_') ||
        f.startsWith('sample_') ||
        f.startsWith('revert_') ||
        f.startsWith('resolve_') ||
        f.startsWith('search_') ||
        f.startsWith('deep_')
      )
    );

    if (isTestScript) {
      fs.renameSync(full, path.join('tools/automation', f));
      movedCount++;
    } else {
      keptCount++;
    }
  }
}

console.log(`Moved ${movedCount} test/automation scripts to tools/automation/`);
console.log(`Kept ${keptCount} client runtime assets in scripts/`);
const remaining = fs.readdirSync('scripts');
console.log('Remaining files in scripts/:', remaining);
