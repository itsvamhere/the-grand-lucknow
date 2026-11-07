import fs from 'fs';
import vm from 'vm';

const code = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/ParallaxImage.B0avVUfL.mjs', 'utf8');

// Find by binary search or parsing
try {
  new vm.SourceTextModule(code, { initializeImportMeta() {} });
} catch (err) {
  console.log(err);
  console.log('Error message:', err.message);
  console.log('Stack:', err.stack);
}
