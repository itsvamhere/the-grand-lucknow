import fs from 'node:fs';

['scripts/capture_svg_proofs.mjs', 'scripts/capture_live_proofs.mjs', 'scripts/capture_big_map.mjs'].forEach(f => {
  if (fs.existsSync(f)) {
    console.log('--- ' + f + ' ---');
    console.log(fs.readFileSync(f, 'utf8').slice(0, 400));
  }
});
