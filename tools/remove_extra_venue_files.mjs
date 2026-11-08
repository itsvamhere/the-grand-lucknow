import fs from 'fs';
import path from 'path';

const toDelete = [
  'venues/north-mandap.html',
  'venues/dining-expanse.html',
  'venues/vip-atrium.html',
  'venues/bridal-suite.html',
  'venues/garden-pavilion.html',
  'venues/open-earth-lawn.html.bak_loc',
  'venues/test_noframer.html',
  'venues/test_replica_n1.html',
  'venues/casamomo_boutique_n1_original.html'
];

toDelete.forEach(f => {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log(`Deleted extra file: ${f}`);
  }
});
