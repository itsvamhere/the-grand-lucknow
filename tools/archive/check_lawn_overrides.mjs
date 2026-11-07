import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const lawnHtml = fs.readFileSync(path.join(ROOT, 'venues', 'open-earth-lawn.html'), 'utf8');

// Check footer styles in open-earth-lawn.html
const styleMatches = lawnHtml.match(/<style[^>]*>[\s\S]*?<\/style>/g) || [];
styleMatches.forEach((s, idx) => {
  if (s.includes('framer-xj8hz2') || s.includes('grand-ticker') || s.includes('Footer Logo')) {
    console.log(`Style ${idx} has ticker/logo styles (length: ${s.length}):`);
    console.log(s.slice(0, 300));
  }
});

// Check scripts at bottom
const scriptMatches = lawnHtml.match(/<script[^>]*>[\s\S]*?<\/script>/g) || [];
scriptMatches.forEach((s, idx) => {
  if (s.includes('ticker') || s.includes('Footer Logo') || s.includes('grand-footer')) {
    console.log(`Script ${idx} has ticker script (length: ${s.length}):`);
    console.log(s.slice(0, 300));
  }
});
