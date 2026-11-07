import fs from 'fs';

const upstream = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique_n2.html', 'utf8');

let html = upstream;

// Helper: rolling letters for Framer
function makeRollingWord(word) {
  let res = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${word}</span>`;
  for (const ch of word) {
    res += `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${ch}</span></span>`;
  }
  return res;
}

// 1. Title and Metadata
html = html.replace(/<title>.*?<\/title>/i, '<title>N°02 • Premier Celebration Venue in Lucknow • The Grand</title>');
html = html.replace(/content=".*?N°02.*?"/gi, 'content="Venue N°2 • Premier Celebration Venue in Lucknow • The Grand"');
html = html.replace(/https:\/\/www\.casamomo\.at\/apartments\/boutique-n2/g, 'https://www.thegrandlucknow.in/venues/venue-n2');

// 2. Head Fonts & Serif Logo Symbol
const fontLinks = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">\n</head>`;
html = html.replace('</head>', fontLinks);

const logoDef = `<svg viewBox="0 0 160 30" overflow="visible" id="svg-1334768056_3843">
  <text x="50%" y="22.5" text-anchor="middle" font-family="'DM Serif Display', 'Playfair Display', Didot, 'Bodoni MT', Georgia, serif" font-size="26" font-weight="900" letter-spacing="0.06em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>
</svg>`;
html = html.replace('<svg', `${logoDef}\n<svg`);

// 3. SSR Text Swaps
html = html.replaceAll('>Boutique</span>', '>Venue</span>');
html = html.replaceAll('>N°02<', '>Venue N°02<');
html = html.replaceAll('N°02', 'Venue N°02');
html = html.replaceAll('N°01', 'Venue N°01');
html = html.replaceAll('N°03', 'Venue N°03');
html = html.replaceAll('N°04', 'Venue N°04');
html = html.replaceAll('Boutique', 'Venue');
html = html.replaceAll('>sq ft</span>', '>sq ft</span>');
html = html.replaceAll('>45</span>', '>14,000</span>');
html = html.replaceAll('>3</span>', '>900</span>');
html = html.replaceAll('Designer Apartment', 'Premier Celebration Venue');
html = html.replaceAll('Personally designed apartments', 'Premier event venues for celebrations and weddings');

// 4. Collective Voice & Contact Info
html = html.replaceAll('send us an email', 'send us an email');
html = html.replaceAll('give us a call', 'give us a call');
html = html.replaceAll('send us', 'send us');
html = html.replaceAll('give us', 'give us');
html = html.replaceAll('or your celebration', 'or your celebration');
html = html.replaceAll('or your celebration?', 'or your celebration?');
html = html.replaceAll("We would be delighted to assist you with your celebration", "We would be delighted to assist you with your celebration");
html = html.replaceAll("We would be delighted to assist you with your celebration", "We would be delighted to assist you with your celebration");
html = html.replaceAll('+43 664 1999605', '+91 91291 27091');
html = html.replaceAll('office@casamomo.at', 'Thegrandbanquet07@gmail.com');
html = html.replaceAll('Schönaugasse 76, 8010 Graz, Austria', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
html = html.replaceAll('Schönaugasse 76', '22, Raibareli Rd, Bindaua');
html = html.replaceAll('Graz, Austria', 'Lucknow, Uttar Pradesh');
html = html.replaceAll('Graz', 'Lucknow');
html = html.replaceAll('Casa Momo', 'The Grand');
html = html.replaceAll('Moritz Steinlechner', 'The Grand');

// 5. Blank Photo Assets (Remove all Casa Momo apartment photo URLs)
html = html.replace(/https:\/\/framerusercontent\.com\/images\/[^"')\s]+/g, 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="100%" height="100%" fill="%23141a15"/><rect x="20" y="20" width="1160" height="760" fill="none" stroke="rgba(255,240,202,0.08)" stroke-width="2"/><text x="50%" y="50%" font-family="serif" font-size="24" fill="rgba(255,240,202,0.3)" text-anchor="middle" dominant-baseline="middle">THE GRAND • VENUE N°2</text></svg>');

// 6. Navigation
const venuesRolling = makeRollingWord('Venues');
html = html.replace(/href="\.\.\/apartments"/g, 'href="/venues"');
html = html.replace(/<span style="position:absolute[^>]*>Apartments<\/span>.*?<\/span><!--\/\$-->/s, `${venuesRolling}<!--/$-->`);

// 7. Footer Socials: Instagram and Facebook only (NO LinkedIn)
html = html.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
html = html.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
html = html.replaceAll('https://www.instagram.com/casamomo_apartments/', 'https://www.instagram.com/thegrand.lucknow/');
html = html.replaceAll('https://www.instagram.com/thegrandlucknow.in/', 'https://www.instagram.com/thegrand.lucknow/');

const fbRolling = makeRollingWord('Facebook');
html = html.replace(/(<span data-rolling-label[^>]*>)(?:<span style="position:absolute[^>]*>(?:Facebook|LinkedIn)<\/span>.*?)(<\/span><\/div>)/gs, (match, prefix, suffix) => {
  return `${prefix}${fbRolling}${suffix}`;
});

// 8. Attribution & Legal
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('Built by Nexene', 'Built by Edifice');
html = html.replaceAll('Built by', 'Built by');
html = html.replaceAll('Nexene', 'Edifice');

// 9. Append Custom Interactive Elements & Location Map via Robust Script before </body>
const customInjection = `
<!-- Legal Footer Bar -->
<div id="grand-legal-footer" style="width:100%; border-top:1px solid rgba(255, 240, 202, 0.1); padding:28px 32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; font-size:13px; color:rgba(255, 240, 202, 0.6); background:#0e1201; position:relative; z-index:100;">
  <div style="display:flex; gap:24px;">
    <a href="/imprint" style="color:inherit; text-decoration:none;">Imprint</a>
    <a href="/terms" style="color:inherit; text-decoration:none;">Terms</a>
    <a href="/privacy" style="color:inherit; text-decoration:none;">Privacy</a>
  </div>
  <div>
    <a href="https://elvar.in/edifice" target="_blank" rel="noopener noreferrer" style="color:rgba(255, 240, 202, 0.8); text-decoration:none;">Built by Edifice</a>
  </div>
</div>

<!-- Booking Modal & Client Injection Script -->
<script id="grand-injected-script">
(function() {
  // 1. Inject Visible Location Map into the page
  function injectLocationMap() {
    if (document.getElementById('grand-location-card')) return;
    
    // Find the Location heading or section
    var locationHeading = null;
    var headings = document.querySelectorAll('h2, h3, div[data-framer-name="Location"]');
    for (var i = 0; i < headings.length; i++) {
      if ((headings[i].innerText || '').toLowerCase().includes('location')) {
        locationHeading = headings[i];
        break;
      }
    }

    var mapCard = document.createElement('div');
    mapCard.id = 'grand-location-card';
    mapCard.style.cssText = 'width:100%; max-width:1200px; margin:40px auto; padding:0 24px; position:relative; z-index:10;';
    mapCard.innerHTML = \`
      <div style="border-radius:12px; overflow:hidden; border:1px solid rgba(255, 240, 202, 0.15); box-shadow:0 20px 40px rgba(0,0,0,0.5); position:relative; background:#0d130e;">
        <img src="/images/map_cutout.webp" alt="The Grand Location - Raibareli Road, Bindaua, Lucknow" style="width:100%; height:auto; min-height:360px; max-height:480px; object-fit:cover; display:block;" />
        <div style="position:absolute; bottom:24px; left:24px; right:24px; background:rgba(18, 26, 20, 0.94); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border:1px solid rgba(255, 240, 202, 0.2); border-radius:8px; padding:20px 24px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:16px;">
          <div>
            <div style="font-family:'DM Serif Display', Georgia, serif; font-size:22px; color:#fff0ca; letter-spacing:0.02em; margin-bottom:4px;">THE GRAND</div>
            <div style="font-size:14px; color:rgba(255, 240, 202, 0.85); line-height:1.4;">
              📍 22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301<br>
              📞 +91 91291 27091 &nbsp;•&nbsp; ✉️ Thegrandbanquet07@gmail.com
            </div>
          </div>
          <div>
            <a href="https://maps.google.com/?q=22+Raibareli+Rd+Bindaua+Lucknow+Uttar+Pradesh+226301" target="_blank" rel="noopener noreferrer" style="display:inline-block; background:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, #fff0ca); color:#0e1201; font-weight:600; font-size:14px; padding:10px 20px; border-radius:4px; text-decoration:none;">
              Get Directions ↗
            </a>
          </div>
        </div>
      </div>
    \`;

    if (locationHeading && locationHeading.parentNode) {
      locationHeading.parentNode.appendChild(mapCard);
    } else {
      var footer = document.querySelector('footer') || document.getElementById('grand-legal-footer');
      if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(mapCard, footer);
      } else {
        document.body.appendChild(mapCard);
      }
    }
  }

  // 2. Inject Booking Modal
  function ensureGrandModal() {
    if (document.getElementById('grand-booking-modal')) return;

    var modalDiv = document.createElement('div');
    modalDiv.id = 'grand-booking-modal';
    modalDiv.style.cssText = 'display:none; position:fixed; inset:0; z-index:999999; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); justify-content:center; align-items:center; padding:20px;';
    modalDiv.innerHTML = \`
      <div style="background:#131a14; border:1px solid rgba(255, 240, 202, 0.25); border-radius:12px; width:100%; max-width:620px; max-height:92vh; overflow-y:auto; padding:32px; box-shadow:0 24px 60px rgba(0,0,0,0.8); color:#fff0ca; font-family:'Lay Grotesk Regular', sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; border-bottom:1px solid rgba(255,240,202,0.15); padding-bottom:16px;">
          <div>
            <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.1em; color:#d4af37; margin-bottom:4px;">Direct Estate Reservation</div>
            <h3 style="font-family:'DM Serif Display', Georgia, serif; font-size:28px; margin:0; color:#fff0ca;">Venue N°2 • Date Lock</h3>
          </div>
          <button onclick="document.getElementById('grand-booking-modal').style.display='none'" style="background:transparent; border:none; color:#fff0ca; font-size:24px; cursor:pointer; padding:4px 8px; line-height:1;">&times;</button>
        </div>

        <div style="background:rgba(255, 240, 202, 0.05); border-left:3px solid #d4af37; padding:12px 16px; border-radius:0 6px 6px 0; margin-bottom:24px; font-size:13.5px; line-height:1.5;">
          <strong>Estate Venue Scale:</strong> 14,000 sq ft &nbsp;•&nbsp; 900 Seated / 1,500 Floating Capacity<br>
          <em>Note: Custom event pricing is tailored to your celebration requirements (to be finalized with our estate concierge). Lock your date with an advance reservation deposit.</em>
        </div>

        <form id="grand-booking-form" onsubmit="event.preventDefault(); window.triggerGrandPayment();">
          <div style="margin-bottom:16px;">
            <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#fff0ca;">Select Celebration Date</label>
            <input type="date" id="grand-date" required style="width:100%; padding:12px; background:rgba(255,240,202,0.08); border:1px solid rgba(255,240,202,0.25); border-radius:6px; color:#fff0ca; font-size:15px; outline:none;" />
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
            <div>
              <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#fff0ca;">Time Slot</label>
              <select id="grand-slot" style="width:100%; padding:12px; background:#1b241c; border:1px solid rgba(255,240,202,0.25); border-radius:6px; color:#fff0ca; font-size:14px; outline:none;">
                <option value="evening">Evening Gala (6 PM - 1 AM)</option>
                <option value="morning">Morning & Lunch (10 AM - 4 PM)</option>
                <option value="fullday">Full Day Buyout (24 Hours)</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#fff0ca;">Estimated Guests</label>
              <input type="number" id="grand-guests" min="100" max="2000" value="500" placeholder="e.g. 500" required style="width:100%; padding:12px; background:rgba(255,240,202,0.08); border:1px solid rgba(255,240,202,0.25); border-radius:6px; color:#fff0ca; font-size:15px; outline:none;" />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
            <div>
              <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#fff0ca;">Host / Organiser Name</label>
              <input type="text" id="grand-name" placeholder="Full Name" required style="width:100%; padding:12px; background:rgba(255,240,202,0.08); border:1px solid rgba(255,240,202,0.25); border-radius:6px; color:#fff0ca; font-size:15px; outline:none;" />
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#fff0ca;">Phone Number</label>
              <input type="tel" id="grand-phone" placeholder="+91 91291 27091" required style="width:100%; padding:12px; background:rgba(255,240,202,0.08); border:1px solid rgba(255,240,202,0.25); border-radius:6px; color:#fff0ca; font-size:15px; outline:none;" />
            </div>
          </div>

          <div style="margin-bottom:20px;">
            <label style="display:block; font-size:13px; font-weight:600; margin-bottom:6px; color:#fff0ca;">Email Address</label>
            <input type="email" id="grand-email" placeholder="concierge@example.com" required style="width:100%; padding:12px; background:rgba(255,240,202,0.08); border:1px solid rgba(255,240,202,0.25); border-radius:6px; color:#fff0ca; font-size:15px; outline:none;" />
          </div>

          <div style="background:rgba(255,240,202,0.06); padding:16px; border-radius:8px; margin-bottom:24px; border:1px solid rgba(255,240,202,0.15);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:14px; color:rgba(255,240,202,0.85);">Advance Date Reservation Lock:</span>
              <span style="font-size:18px; font-weight:700; color:#d4af37;">₹50,000 INR</span>
            </div>
            <div style="font-size:12px; color:rgba(255,240,202,0.6); line-height:1.4;">
              Secure payment gateway via Razorpay / UPI / Credit & Debit Cards / NetBanking. Fully adjustable against final event billing.
            </div>
          </div>

          <button type="submit" style="width:100%; background:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, #fff0ca); color:#0e1201; font-weight:700; font-size:16px; padding:16px; border:none; border-radius:6px; cursor:pointer; transition:transform 0.2s, background 0.2s;">
            Proceed to Payment Gateway (₹50,000) &rarr;
          </button>
        </form>

        <div id="grand-payment-success" style="display:none; text-align:center; padding:30px 10px;">
          <div style="width:64px; height:64px; border-radius:50%; background:#34a853; color:#ffffff; font-size:32px; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">&check;</div>
          <h4 style="font-family:'DM Serif Display', Georgia, serif; font-size:28px; color:#fff0ca; margin-bottom:8px;">Reservation Initiated!</h4>
          <p style="font-size:15px; color:rgba(255,240,202,0.8); line-height:1.5; margin-bottom:20px;">
            Your date lock request for <strong>Venue N°2</strong> has been logged. Our Senior Event Concierge will connect with you at <strong>+91 91291 27091</strong> to finalize menu curation, layout options, and custom quotes.
          </p>
          <div style="font-family:monospace; background:rgba(255,240,202,0.08); padding:10px 16px; border-radius:6px; display:inline-block; font-size:14px; color:#d4af37;">
            Booking Reference: TGL-2026-N02-9842
          </div>
          <div style="margin-top:24px;">
            <button onclick="document.getElementById('grand-booking-modal').style.display='none'" style="background:transparent; border:1px solid rgba(255,240,202,0.4); color:#fff0ca; padding:10px 24px; border-radius:4px; cursor:pointer;">Close</button>
          </div>
        </div>
      </div>\`;
    document.body.appendChild(modalDiv);
  }

  window.openGrandModal = window.openGrandBooking = function() {
    ensureGrandModal();
    var modal = document.getElementById('grand-booking-modal');
    if (modal) modal.style.display = 'flex';
  };

  window.triggerGrandPayment = function() {
    var form = document.getElementById('grand-booking-form');
    var success = document.getElementById('grand-payment-success');
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';
  };

  function initAll() {
    injectLocationMap();
    ensureGrandModal();
    
    // Wire all booking / availability buttons
    var buttons = document.querySelectorAll('button, a, div[role="button"]');
    buttons.forEach(function(btn) {
      var text = (btn.innerText || '').toLowerCase();
      if (text.includes('availability') || text.includes('check avail') || text.includes('book now') || text.includes('inquire')) {
        btn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          window.openGrandBooking();
        };
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
  window.addEventListener('load', initAll);
  setInterval(initAll, 2000);
})();
</script>
`;

html = html.replace('</body>', `${customInjection}</body>`);

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', html, 'utf8');
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n2.html', html, 'utf8');

console.log(`Rebuilt venue-n2.html successfully. Length: ${html.length}`);
