import fs from 'fs';

const rawD = fs.readFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_matched_d.txt", "utf8").trim();

const scaleX = 2404.809 / 216.285; // 11.11870448713503
const scaleY = 300.206 / 27;       // 11.11874074074074

// Parse SVG path and scale coordinates
function scalePath(d, sx, sy) {
  // Regex to match commands and numbers
  return d.replace(/([MLHVCSQTAZmlhvcsqtaz])|(-?\d+(?:\.\d+)?)/g, (match, cmd, num) => {
    if (cmd) return cmd;
    return match; // We need to know if it is an x or y coordinate
  });
}

// Better parser: tokenize into commands and numeric arguments
function parseAndScale(d, sx, sy) {
  const tokens = d.match(/[a-df-z]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/gi);
  let result = [];
  let currentCmd = '';
  let coordIndex = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (/^[a-df-z]$/i.test(token)) {
      currentCmd = token;
      coordIndex = 0;
      result.push(token);
    } else {
      const val = parseFloat(token);
      let scaledVal = val;
      const upper = currentCmd.toUpperCase();
      
      if (upper === 'H') {
        scaledVal = val * sx;
      } else if (upper === 'V') {
        scaledVal = val * sy;
      } else if (upper === 'M' || upper === 'L' || upper === 'T') {
        scaledVal = (coordIndex % 2 === 0) ? val * sx : val * sy;
        coordIndex++;
      } else if (upper === 'S' || upper === 'Q') {
        scaledVal = (coordIndex % 2 === 0) ? val * sx : val * sy;
        coordIndex++;
      } else if (upper === 'C') {
        scaledVal = (coordIndex % 2 === 0) ? val * sx : val * sy;
        coordIndex++;
      } else if (upper === 'A') {
        // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
        const mod = coordIndex % 7;
        if (mod === 0) scaledVal = val * sx;
        else if (mod === 1) scaledVal = val * sy;
        else if (mod === 5) scaledVal = val * sx;
        else if (mod === 6) scaledVal = val * sy;
        coordIndex++;
      } else {
        scaledVal = (coordIndex % 2 === 0) ? val * sx : val * sy;
        coordIndex++;
      }
      
      // format to 3 decimals like CASA MOMO footer
      result.push(scaledVal.toFixed(3));
    }
  }

  // reconstruct path string nicely
  let pathStr = '';
  for (let i = 0; i < result.length; i++) {
    const t = result[i];
    if (/^[a-df-z]$/i.test(t)) {
      if (pathStr.length > 0) pathStr += ' ';
      pathStr += t;
    } else {
      pathStr += ' ' + t;
    }
  }
  return pathStr;
}

const scaledDesktopD = parseAndScale(rawD, scaleX, scaleY);

// Also generate mobile scaled by 0.5 of desktop (or sx * 0.5)
const scaledMobileD = parseAndScale(rawD, scaleX * 0.5, scaleY * 0.5);

console.log('Scaled desktop path length:', scaledDesktopD.length);
console.log('Desktop path sample:', scaledDesktopD.slice(0, 150));

fs.writeFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_footer_desktop_d.txt", scaledDesktopD);
fs.writeFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_footer_mobile_d.txt", scaledMobileD);

// Build complete SVGs
const desktopSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2404.809 300.206" overflow="visible"><path d="${scaledDesktopD}" fill="rgb(255,240,202)"></path></svg>`;
const mobileSvg = `<svg viewBox="0 0 1202.351 150.096" overflow="visible" id="svg870196829_4253"><path d="${scaledMobileD}" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202)) /* {&quot;name&quot;:&quot;Pearl Beige&quot;} */"></path></svg>`;

fs.writeFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_footer_desktop.svg", desktopSvg);
fs.writeFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_footer_mobile.svg", mobileSvg);

// Encode as data:image/svg+xml for background-image
// encodeURIComponent format like Framer
const encodedSvg = `data:image/svg+xml,${encodeURIComponent(desktopSvg).replace(/'/g, '%27')}`;
fs.writeFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/the_grand_footer_bg_image.txt", encodedSvg);

console.log('Successfully generated desktop & mobile footer SVGs and data URI!');
