import fs from 'fs';

let html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

// 1. Replace the Location Map container with visible Google Maps cutout
const mapHtml = `
<div class="grand-location-container" style="width:100%; max-width:1200px; margin:40px auto; padding:0 24px; position:relative;">
  <div style="border-radius:12px; overflow:hidden; border:1px solid rgba(255, 240, 202, 0.15); box-shadow:0 20px 40px rgba(0,0,0,0.5); position:relative; background:#0d130e;">
    <img src="/images/map_cutout.webp" alt="The Grand Location - Raibareli Road, Bindaua, Lucknow" style="width:100%; height:auto; min-height:360px; max-height:480px; object-fit:cover; display:block;" />
    <div style="position:absolute; bottom:24px; left:24px; right:24px; background:rgba(18, 26, 20, 0.92); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border:1px solid rgba(255, 240, 202, 0.2); border-radius:8px; padding:20px 24px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:16px;">
      <div>
        <div style="font-family:'DM Serif Display', Georgia, serif; font-size:22px; color:#fff0ca; letter-spacing:0.02em; margin-bottom:4px;">THE GRAND</div>
        <div style="font-size:14px; color:rgba(255, 240, 202, 0.8); line-height:1.4;">
          📍 22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301<br>
          📞 +91 91291 27091 &nbsp;•&nbsp; ✉️ Thegrandbanquet07@gmail.com
        </div>
      </div>
      <div>
        <a href="https://maps.google.com/?q=22+Raibareli+Rd+Bindaua+Lucknow+Uttar+Pradesh+226301" target="_blank" rel="noopener noreferrer" style="display:inline-block; background:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, #fff0ca); color:#0e1201; font-weight:600; font-size:14px; padding:10px 20px; border-radius:4px; text-decoration:none; transition:opacity 0.2s;">
          Get Directions ↗
        </a>
      </div>
    </div>
  </div>
</div>
`;

// Replace the Framer location map container
if (html.includes('data-framer-name="Location Map"')) {
  html = html.replace(/<div class="framer-s6uv36-container" data-code-component-plugin-id="api" data-framer-name="Location Map"[^>]*>[\s\S]*?<\/div><\/div><!--\/\$-->/i, (m) => {
    return `${mapHtml}<!--/$-->`;
  });
}

// 2. Add legal footer bar to venue detail page
const legalFooterBar = `
<div style="width:100%; border-top:1px solid rgba(255, 240, 202, 0.1); padding:24px 32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; font-size:13px; color:rgba(255, 240, 202, 0.6); background:transparent;">
  <div style="display:flex; gap:24px;">
    <a href="/imprint" style="color:inherit; text-decoration:none;">Imprint</a>
    <a href="/terms" style="color:inherit; text-decoration:none;">Terms</a>
    <a href="/privacy" style="color:inherit; text-decoration:none;">Privacy</a>
  </div>
  <div>
    <a href="https://elvar.in/edifice" target="_blank" rel="noopener noreferrer" style="color:rgba(255, 240, 202, 0.8); text-decoration:none;">Built by Edifice</a>
  </div>
</div>
`;

if (!html.includes('Built by Edifice')) {
  // Inject before </footer>
  if (html.includes('</footer>')) {
    html = html.replace('</footer>', `${legalFooterBar}</footer>`);
  } else {
    html = html.replace('</body>', `${legalFooterBar}</body>`);
  }
}

// 3. Make sure window.openGrandModal is also an alias for window.openGrandBooking
if (!html.includes('window.openGrandModal = window.openGrandBooking')) {
  html = html.replace('window.openGrandBooking = function() {', 'window.openGrandModal = window.openGrandBooking = function() {');
}

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', html, 'utf8');
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n2.html', html, 'utf8');

console.log('Successfully applied Location Map and Legal Footer to venue detail pages.');
