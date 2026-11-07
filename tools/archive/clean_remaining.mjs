import fs from 'fs';
import path from 'path';

const remainingTests = [
  'check_casa_trans.mjs',
  'export_clean_base.mjs',
  'extract_road_mask.mjs',
  'generate_final_proof_grid.mjs',
  'generate_proof_comparisons.mjs',
  'grid_overlay.mjs',
  'lookup_places.mjs',
  'probe_casamomo_colors.mjs',
  'road_geometries.mjs',
  'zoom_big_text.mjs'
];

for (const f of remainingTests) {
  const p = path.join('scripts', f);
  if (fs.existsSync(p)) {
    fs.renameSync(p, path.join('tools/automation', f));
    console.log(`Moved ${f} to tools/automation/`);
  }
}

console.log('Final remaining files in scripts/:', fs.readdirSync('scripts'));
