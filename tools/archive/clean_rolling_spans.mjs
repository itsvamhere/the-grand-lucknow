import fs from 'fs';
import path from 'path';

function buildRollingSpans(text) {
  const chars = Array.from(text);
  const srSpan = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${text}</span>`;
  const charSpans = chars.map(ch => {
    return `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${ch}</span></span>`;
  }).join('');
  return srSpan + charSpans;
}

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
let footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

// Replace Apartments spans with Venues spans
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?(?:Apartments|Venues)[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    // Check if it's the Venues link
    if (match.includes('Apartment') || match.includes('Venue')) {
      const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
      return `${openTag}${buildRollingSpans('Venues')}</span><!--/$-->`;
    }
    return match;
  }
);

// Replace FacebookLinkedIn with pure Facebook
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?Facebook[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
    return `${openTag}${buildRollingSpans('Facebook')}</span><!--/$-->`;
  }
);

// Replace email
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?(?:casamomo\.at|thegrandlucknow\.in)[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
    return `${openTag}${buildRollingSpans('office@thegrandlucknow.in')}</span><!--/$-->`;
  }
);

// Replace phone
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?(?:1555605|1999605|27091)[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
    return `${openTag}${buildRollingSpans('+91 91291 27091')}</span><!--/$-->`;
  }
);

// Replace EdificeNexene with pure Edifice
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?(?:Nexene|Edifice)[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
    return `${openTag}${buildRollingSpans('Edifice')}</span><!--/$-->`;
  }
);

fs.writeFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), footer, 'utf8');
console.log('Cleaned rolling spans in canonical_footer.html');
