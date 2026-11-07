import fs from 'fs';

if (fs.existsSync('tools/automation/render_matched_vector_map.mjs')) {
  console.log('=== render_matched_vector_map.mjs ===');
  console.log(fs.readFileSync('tools/automation/render_matched_vector_map.mjs', 'utf8').slice(0, 1500));
}
if (fs.existsSync('tools/automation/refine_master_cartography.mjs')) {
  console.log('=== refine_master_cartography.mjs ===');
  console.log(fs.readFileSync('tools/automation/refine_master_cartography.mjs', 'utf8').slice(0, 1500));
}
