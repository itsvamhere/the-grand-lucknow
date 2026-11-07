import fs from 'fs';
import path from 'path';

function buildRollingInner(text, size = 'var(--grand-p1-size, 32px)', ls = 'var(--grand-p1-ls, -0.2px)', lh = 'var(--grand-p1-lh, 1.2em)', color = 'var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2)') {
  const chars = Array.from(text);
  const srSpan = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${text}</span>`;
  const charSpans = chars.map(ch => {
    return `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${ch}</span></span>`;
  }).join('');
  return `<span data-rolling-label style="font-family:&quot;Lay Grotesk Regular&quot;, &quot;Lay Grotesk Regular Placeholder&quot;, sans-serif;font-size:${size};font-style:normal;font-weight:400;letter-spacing:${ls};line-height:${lh};color:${color};position:relative;display:inline-block;overflow:hidden;white-space:nowrap;width:max-content;margin:0;user-select:none;vertical-align:top">${srSpan}${charSpans}</span>`;
}

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
let footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

// 1. Replace Venues link content
footer = footer.replace(
  /(<a[^>]*href="\/venues"[^>]*>[\s\S]*?<div class="framer-w9fus0-container"[^>]*><!--\$\s*-->)[\s\S]*?(<!--\/\$\s*--><\/div>)/gi,
  `$1${buildRollingInner('Venues')}$2`
);

// 2. Replace Facebook link content
footer = footer.replace(
  /(<a[^>]*href="https:\/\/www\.facebook\.com\/[^"]*"[^>]*>[\s\S]*?<div class="framer-w9fus0-container"[^>]*><!--\$\s*-->)[\s\S]*?(<!--\/\$\s*--><\/div>)/gi,
  `$1${buildRollingInner('Facebook')}$2`
);

// 3. Replace Email link content
footer = footer.replace(
  /(<a[^>]*href="mailto:office@thegrandlucknow\.in"[^>]*>[\s\S]*?<div class="framer-w9fus0-container"[^>]*><!--\$\s*-->)[\s\S]*?(<!--\/\$\s*--><\/div>)/gi,
  `$1${buildRollingInner('office@thegrandlucknow.in', '15px', '0px', '1em')}$2`
);

// 4. Replace Phone link content
footer = footer.replace(
  /(<a[^>]*href="tel:\+919129127091"[^>]*>[\s\S]*?<div class="framer-w9fus0-container"[^>]*><!--\$\s*-->)[\s\S]*?(<!--\/\$\s*--><\/div>)/gi,
  `$1${buildRollingInner('+91 91291 27091', '15px', '0px', '1em')}$2`
);

// 5. Replace Edifice link content
footer = footer.replace(
  /(<a[^>]*href="https:\/\/elvar\.in\/edifice"[^>]*>[\s\S]*?<div class="framer-w9fus0-container"[^>]*><!--\$\s*-->)[\s\S]*?(<!--\/\$\s*--><\/div>)/gi,
  `$1${buildRollingInner('Edifice', '15px', '0px', '1em')}$2`
);

fs.writeFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), footer, 'utf8');
console.log('Successfully upgraded canonical_footer.html with pure rolling spans!');
