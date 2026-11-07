import fs from 'fs';

// Let's inspect CASA MOMO navbar path vs CASA MOMO footer path
const footerSvg = fs.readFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/casamomo_footer_decoded.svg", "utf8");
const footerD = footerSvg.match(/d="([^"]+)"/)[1];

// Let's get the navbar D from logo-light.svg or wordmark.svg
const navbarSvg = fs.readFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images/wordmark.svg", "utf8");
console.log('Navbar SVG viewBox:', navbarSvg.match(/viewBox="([^"]+)"/)?.[1]);

// Let's see the bounds of footerD
function getBounds(d) {
  const nums = d.match(/-?\d+(?:\.\d+)?/g).map(Number);
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  // Parse commands roughly
  const parts = d.trim().split(/(?=[MLHVCSQTAZmlhvcsqtaz])/);
  let curX = 0, curY = 0;
  for (const part of parts) {
    const cmd = part[0];
    const coords = part.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);
    for (let i = 0; i < coords.length; i += 2) {
      if (i + 1 < coords.length) {
        const x = coords[i], y = coords[i+1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
}

console.log('Footer bounds:', getBounds(footerD));
