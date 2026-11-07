import fs from 'fs';
import path from 'path';

const file = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(file, 'utf-8');

// Count occurrences of framer site url
const matches = [...html.matchAll(/https:\/\/framerusercontent\.com\/sites\/1bk9uGIcxVnDnwzQnwlcko\//g)];
console.log(`Found ${matches.length} occurrences in index.html`);

// Replace all modulepreload and script links to local /scripts/
html = html.replaceAll('https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/', '/scripts/');

// Also ensure searchIndex links don't break
fs.writeFileSync(file, html, 'utf-8');
console.log('Updated index.html to load all modules locally!');
