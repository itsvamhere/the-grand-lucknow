import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const content = fs.readFileSync(path.join(projectDir, 'scripts', 'kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs'), 'utf8');

const imgs = [...content.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'&?]+/g)].map(m => m[0]);
console.log('Images in about page:', [...new Set(imgs)]);

const localImgs = [...content.matchAll(/\/images\/[^"'&?]+/g)].map(m => m[0]);
console.log('Local images in about page:', [...new Set(localImgs)]);
