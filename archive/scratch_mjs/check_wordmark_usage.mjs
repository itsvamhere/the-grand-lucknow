import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const matches = [...html.matchAll(/.{0,100}wordmark\.svg.{0,100}/g)];
matches.forEach((m, i) => console.log(`[${i}]`, m[0]));
