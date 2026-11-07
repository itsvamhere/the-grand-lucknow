import sharp from 'sharp';
import fs from 'node:fs';

async function compare() {
  const origMeta = await sharp('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/casamomo_map_orig.png').metadata();
  console.log('Casa Momo original map metadata:', origMeta.width, 'x', origMeta.height, origMeta.format);

  const proofMeta = await sharp('C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_venue_map_viewport.png').metadata();
  console.log('Our proof viewport metadata:', proofMeta.width, 'x', proofMeta.height);

  // Copy both into artifact directory so we can analyze them side by side
  fs.copyFileSync(
    'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/casamomo_map_orig.png',
    'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/casamomo_map_orig_reference.png'
  );
  console.log('Copied casamomo_map_orig_reference.png to artifacts');
}

compare().catch(console.error);
