import fs from 'fs';
import path from 'path';

const allFiles = fs.readdirSync('scripts');
const clientBundles = [];
const testScripts = [];
const otherAssets = [];

for (const f of allFiles) {
  const full = path.join('scripts', f);
  const stat = fs.statSync(full);
  if (stat.isDirectory()) continue;

  if (f.endsWith('.png') || f.endsWith('.jpg')) {
    testScripts.push(f);
  } else if (f.endsWith('.html')) {
    // Check if it's a snippet or test
    testScripts.push(f);
  } else if (f.endsWith('.json')) {
    if (f.startsWith('searchIndex')) {
      clientBundles.push(f);
    } else {
      testScripts.push(f);
    }
  } else if (f.endsWith('.mjs') || f.endsWith('.js')) {
    // Check file content to see if it's a Node script (imports 'fs', 'playwright', 'http', etc.) or client Framer bundle
    const head = fs.readFileSync(full, 'utf8').slice(0, 500);
    const isNodeScript = (
      head.includes("from 'fs'") ||
      head.includes("require('fs')") ||
      head.includes("from 'playwright") ||
      head.includes("from 'node:") ||
      head.includes("require('node:") ||
      head.includes("from 'http'") ||
      head.includes("require('http')") ||
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
      f.startsWith('update_')
    );

    if (isNodeScript) {
      testScripts.push(f);
    } else {
      clientBundles.push(f);
    }
  } else {
    otherAssets.push(f);
  }
}

console.log('Client Bundles count:', clientBundles.length);
console.log('Client Bundles sample:', clientBundles.slice(0, 20));
console.log('Test/Automation Scripts count:', testScripts.length);
console.log('Test/Automation Scripts sample:', testScripts.slice(0, 20));
console.log('Other Assets:', otherAssets);
