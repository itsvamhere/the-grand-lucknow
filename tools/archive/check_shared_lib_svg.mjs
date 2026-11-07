import fs from 'fs';

const js = fs.readFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/shared-lib.DganPNQZ.mjs", "utf8");

const idx = js.indexOf('layoutId:`AOxZDvmqQ`');
if (idx !== -1) {
  const svgStart = js.indexOf('svg:`', idx);
  const svgEnd = js.indexOf('`', svgStart + 5);
  console.log('Current AOxZDvmqQ SVG in shared-lib:');
  console.log(js.slice(svgStart, Math.min(svgStart + 300, svgEnd + 1)));
}
