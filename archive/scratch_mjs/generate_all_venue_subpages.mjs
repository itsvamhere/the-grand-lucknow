import fs from 'fs';
import path from 'path';

const venues = [
  {
    num: 'N°01',
    name: 'Open Earth Lawn',
    slug: 'venue-n1',
    boutiqueSlug: 'boutique-n1',
    upstreamFile: 'upstream_boutique-n1.html',
    areaNum: '55,000',
    capacityNum: '1,500',
    desc: 'Our most expansive outdoor lawn space combining two magnificent phases, perfect for grand weddings and massive celebrations. Surrounded by lush natural greenery, open skies, and state-of-the-art illumination, Open Earth Lawn accommodates royal banquets and high-profile wedding receptions with distinction.',
    type: 'Grand Outdoor Celebration Lawn'
  },
  {
    num: 'N°02',
    name: 'Grassland Gala',
    slug: 'venue-n2',
    boutiqueSlug: 'boutique-n2',
    upstreamFile: 'upstream_boutique-n2.html',
    areaNum: '20,000',
    capacityNum: '800',
    desc: 'A spacious manicured lawn area ideal for medium to large weddings and outdoor events. Beautiful landscaping with modern amenities, illuminated perimeter pathways, and seamless stage staging create an enchanting ambiance under the stars.',
    type: 'Manicured Garden Celebration Lawn'
  },
  {
    num: 'N°03',
    name: 'The Royal Legacy Banquet',
    slug: 'venue-n3',
    boutiqueSlug: 'boutique-n3',
    upstreamFile: 'upstream_boutique-n3.html',
    areaNum: '10,000',
    capacityNum: '600',
    desc: 'Our signature indoor ballroom featuring double-height pillarless architecture, grand Austrian crystal chandeliers, and opulent royal drapery. The pinnacle of luxury indoor wedding celebrations, corporate galas, and festive gatherings.',
    type: 'Pillarless Luxury Banquet Hall'
  },
  {
    num: 'N°04',
    name: 'Garden Galaxy',
    slug: 'venue-n4',
    boutiqueSlug: 'boutique-n4',
    upstreamFile: 'upstream_boutique-n4.html',
    areaNum: '15,000',
    capacityNum: '300',
    desc: 'An intimate outdoor garden space surrounded by dense foliage and tranquil canopies, ideal for pre-wedding functions, cocktail receptions, and elegant private celebrations.',
    type: 'Intimate Garden Celebration Setting'
  },
  {
    num: 'N°05',
    name: 'The Grand Courtyard',
    slug: 'venue-n5',
    boutiqueSlug: 'loft-n1',
    upstreamFile: 'upstream_loft-n1.html',
    areaNum: '15,000',
    capacityNum: '250',
    desc: 'A traditional ceremonial courtyard specially designed for auspicious rituals such as Haldi, Mehndi, and intimate pre-wedding ceremonies with authentic festive charm and heritage aesthetics.',
    type: 'Traditional Ceremonial Courtyard'
  }
];

function makeRollingWord(word) {
  let res = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${word}</span>`;
  for (const ch of word) {
    res += `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${ch}</span></span>`;
  }
  return res;
}

const venuesRolling = makeRollingWord('Venues');
const fbRolling = makeRollingWord('Facebook');

// Generate the Interactive Booking Modal for a specific venue
function generateBookingModal(v) {
  return `
<!-- Interactive Booking Modal & Client Injection Script -->
<script id="grand-injected-script">
(function() {
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
            <h3 style="font-family:'DM Serif Display', Georgia, serif; font-size:28px; margin:0; color:#fff0ca;">${v.num} • ${v.name}</h3>
          </div>
          <button onclick="document.getElementById('grand-booking-modal').style.display='none'" style="background:transparent; border:none; color:#fff0ca; font-size:24px; cursor:pointer; padding:4px 8px; line-height:1;">&times;</button>
        </div>

        <div style="background:rgba(255, 240, 202, 0.05); border-left:3px solid #d4af37; padding:12px 16px; border-radius:0 6px 6px 0; margin-bottom:24px; font-size:13.5px; line-height:1.5;">
          <strong>Venue Scale:</strong> ${v.areaNum} sq ft &nbsp;•&nbsp; ${v.capacityNum} Capacity<br>
          <em>Note: Custom event pricing is tailored to your guest count, catering curation, and production setup (to be discussed with our estate concierge). Lock your date with an advance reservation deposit.</em>
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
              <input type="number" id="grand-guests" min="50" max="3000" value="${v.capacityNum.replace(/[^0-9]/g, '')}" placeholder="e.g. 500" required style="width:100%; padding:12px; background:rgba(255,240,202,0.08); border:1px solid rgba(255,240,202,0.25); border-radius:6px; color:#fff0ca; font-size:15px; outline:none;" />
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
            Your date lock request for <strong>${v.num} • ${v.name}</strong> has been logged. Our Senior Event Concierge will connect with you at <strong>+91 91291 27091</strong> to finalize menu curation, layout options, and custom quotes.
          </p>
          <div style="font-family:monospace; background:rgba(255,240,202,0.08); padding:10px 16px; border-radius:6px; display:inline-block; font-size:14px; color:#d4af37;">
            Booking Reference: TGL-2026-${v.num.replace('N°', 'N')}-9842
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

  function wireAll() {
    ensureGrandModal();
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

    // Client-side fixup for description & features after React hydration
    var allNodes = document.querySelectorAll('p, span, div');
    allNodes.forEach(function(el) {
      if (el.children.length === 0 && el.innerText) {
        var txt = el.innerText.trim();
        if (txt === 'Apartment Size' || txt.includes('Apartment Size')) el.innerText = 'Venue Scale';
        if (txt.includes('sq ft sq ft')) el.innerText = '${v.areaNum} sq ft';
        if (txt === '45 m²' || txt === '45' || txt === '60 m²' || txt === '75 m²') el.innerText = '${v.areaNum} sq ft';
        if (txt === '3' || txt === '2' || txt === '4') el.innerText = '${v.capacityNum}';
      }
    });

    var descParas = document.querySelectorAll('p');
    descParas.forEach(function(p) {
      var txt = p.innerText || '';
      if (txt.includes('painted ceiling') || txt.includes('rarity in Graz') || txt.includes('temporary home') || txt.includes('Designer Apartment')) {
        p.innerText = "${v.desc.replace(/"/g, '\\"')}";
      }
    });

    // Fixup venue chip on the map
    var chips = document.querySelectorAll('.casa-map-chip');
    chips.forEach(function(chip) {
      var txt = chip.innerText.trim();
      if (txt.startsWith('Boutique') || txt.startsWith('Loft') || txt.startsWith('Venue')) {
        chip.innerText = "${v.num} • ${v.name}";
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireAll);
  } else {
    wireAll();
  }
  window.addEventListener('load', wireAll);
  setInterval(wireAll, 1000);
})();
</script>
`;
}

// Transform upstream HTML into customized venue sub-page
function buildVenuePage(v) {
  const upstreamPath = path.join('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo', v.upstreamFile);
  let html = fs.readFileSync(upstreamPath, 'utf8');

  // Preserve pristine handover data so React hydration never crashes
  const handoverMatch = html.match(/<script type="framer\/handover" id="__framer__handoverData">[\s\S]*?<\/script>/);
  const originalHandover = handoverMatch ? handoverMatch[0] : null;

  // 1. Title and Metadata
  html = html.replace(/<title>.*?<\/title>/i, `<title>${v.num} • ${v.name} • The Grand Lucknow</title>`);
  html = html.replace(/content=".*?Boutique.*?"/gi, `content="${v.num} • ${v.name} • Premier Event Venue in Lucknow • The Grand"`);
  html = html.replace(/https:\/\/www\.casamomo\.at\/apartments\/[a-z0-9-]+/g, `https://www.thegrandlucknow.in/venues/${v.slug}`);

  // 2. Head Fonts & Serif Logo Symbol (Issue 6)
  const fontLinks = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">\n</head>`;
  html = html.replace('</head>', fontLinks);

  const logoDef = `<svg viewBox="0 0 160 30" overflow="visible" id="svg-1334768056_3843">
  <text x="50%" y="22.5" text-anchor="middle" font-family="'DM Serif Display', 'Playfair Display', Didot, 'Bodoni MT', Georgia, serif" font-size="26" font-weight="900" letter-spacing="0.06em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>
</svg>`;
  html = html.replace('<svg', `${logoDef}\n<svg`);

  // 3. SSR Text Swaps for this venue
  html = html.replaceAll('>Boutique</span>', `>${v.name}</span>`);
  html = html.replaceAll('>Loft</span>', `>${v.name}</span>`);
  html = html.replaceAll('>Boutique N°1<', `>${v.num}<`);
  html = html.replaceAll('>Boutique N°2<', `>${v.num}<`);
  html = html.replaceAll('>Boutique N°3<', `>${v.num}<`);
  html = html.replaceAll('>Boutique N°4<', `>${v.num}<`);
  html = html.replaceAll('>Loft N°1<', `>${v.num}<`);
  html = html.replaceAll('Boutique N°1', `${v.num} • ${v.name}`);
  html = html.replaceAll('Boutique N°2', `${v.num} • ${v.name}`);
  html = html.replaceAll('Boutique N°3', `${v.num} • ${v.name}`);
  html = html.replaceAll('Boutique N°4', `${v.num} • ${v.name}`);
  html = html.replaceAll('Loft N°1', `${v.num} • ${v.name}`);
  html = html.replaceAll('Boutique', 'Venue');

  // Replace description paragraph in HTML and in JSON payload
  html = html.replace(/Look up\. An original 19th-century painted ceiling[^<"]+/g, v.desc);
  html = html.replace(/Boutique N°\d in Graz:[^<"]+/g, `${v.num} • ${v.name} in Lucknow: ${v.areaNum} sq ft for up to ${v.capacityNum} guests.`);
  
  // Replace area and capacity in HTML and in JSON payload
  html = html.replaceAll('>m²<', '>sq ft<');
  html = html.replaceAll('>m<', '>sq ft<');
  html = html.replaceAll('>45<', `>${v.areaNum}<`);
  html = html.replaceAll('>3<', `>${v.capacityNum}<`);
  html = html.replaceAll('"45"', `"${v.areaNum}"`);
  html = html.replaceAll('{"type":6,"value":18},"3"', `{"type":6,"value":18},"${v.capacityNum}"`);

  html = html.replaceAll('Designer Apartment in Graz', `Premier Event Venue in Lucknow`);
  html = html.replaceAll('Designer Apartment', `${v.type}`);
  html = html.replaceAll('Personally designed apartments', `Premier luxury event spaces for weddings, receptions, and galas`);

  // 4. Collective Voice & Contact
  html = html.replaceAll('send me an email', 'send us an email');
  html = html.replaceAll('give me a call', 'give us a call');
  html = html.replaceAll('send me', 'send us');
  html = html.replaceAll('give me', 'give us');
  html = html.replaceAll('or your stay', 'or your celebration');
  html = html.replaceAll('or your stay?', 'or your celebration?');
  html = html.replaceAll("I'd be happy to help you personally", "We would be delighted to assist you with your celebration");
  html = html.replaceAll("I’d be happy to help you personally", "We would be delighted to assist you with your celebration");
  html = html.replaceAll('+43 664 1999605', '+91 91291 27091');
  html = html.replaceAll('office@casamomo.at', 'Thegrandbanquet07@gmail.com');
  html = html.replaceAll('Schönaugasse 76, 8010 Graz, Austria', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India');
  html = html.replaceAll('Schönaugasse 76', '22, Raibareli Rd, Bindaua');
  html = html.replaceAll('Graz, Austria', 'Lucknow, Uttar Pradesh');
  html = html.replaceAll('Graz', 'Lucknow');
  html = html.replaceAll('Casa Momo', 'The Grand');
  html = html.replaceAll('Moritz Steinlechner', 'The Grand');

  // 5. Blank Photo Assets (Keep photo assets blank, but PRESERVE map image UayMv2I16UbQQBQkbI90HsJMv5o)
  // Use single quotes inside SVG so it does NOT break JSON in __framer__handoverData
  html = html.replace(/https:\/\/framerusercontent\.com\/images\/(?!UayMv2I16UbQQBQkbI90HsJMv5o)[^"')\s]+/g, `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><rect width='100%' height='100%' fill='%23141a15'/><rect x='20' y='20' width='1160' height='760' fill='none' stroke='rgba(255,240,202,0.08)' stroke-width='2'/><text x='50%' y='50%' font-family='serif' font-size='26' fill='rgba(255,240,202,0.25)' text-anchor='middle' dominant-baseline='middle'>THE GRAND • ${v.num} • ${v.name.toUpperCase()}</text></svg>`);

  // 6. Navigation
  html = html.replace(/href="\.\.\/apartments"/g, 'href="/venues"');
  html = html.replace(/<span style="position:absolute[^>]*>Apartments<\/span>.*?<\/span><!--\/\$-->/s, `${venuesRolling}<!--/$-->`);

  // 7. Footer Socials: Instagram and Facebook only (NO LinkedIn)
  html = html.replaceAll('https://www.linkedin.com/in/moritz-steinlechner-045a4417b/', 'https://www.facebook.com/thegrandlucknow/');
  html = html.replaceAll('https://www.linkedin.com/in/moritz-steinlechner-045a4417b', 'https://www.facebook.com/thegrandlucknow/');
  html = html.replaceAll('https://www.instagram.com/casamomo_apartments/', 'https://www.instagram.com/thegrand.lucknow/');
  html = html.replaceAll('https://www.instagram.com/thegrandlucknow.in/', 'https://www.instagram.com/thegrand.lucknow/');

  html = html.replace(/(<span data-rolling-label[^>]*>)(?:<span style="position:absolute[^>]*>(?:Facebook|LinkedIn)<\/span>.*?)(<\/span><\/div>)/gs, (match, prefix, suffix) => {
    return `${prefix}${fbRolling}${suffix}`;
  });

  // 8. Attribution & Legal
  html = html.replaceAll('https://nexene.at/', 'https://elvar.in/edifice');
  html = html.replaceAll('https://nexene.at', 'https://elvar.in/edifice');
  html = html.replaceAll('Made with love by Nexene', 'Built by Edifice');
  html = html.replaceAll('Made with love by', 'Built by');
  html = html.replaceAll('Nexene', 'Edifice');

  // 9. Authentic Casa Momo Map Layout: preserve Casa Momo's native map and update landmark chips
  html = html.replaceAll('Main Square', 'Shaheed Path');
  html = html.replaceAll('Schlossberg', 'Gomti Riverfront');
  html = html.replaceAll('Schloßberg', 'Gomti Riverfront');
  html = html.replaceAll('Mur Island', 'Raibareli Road');
  html = html.replaceAll('Stadtpark', 'Bindaua Estate');
  html = html.replaceAll('Lendplatz', 'SGPGI Hub');
  html = html.replaceAll('Opera', 'Mohanlalganj');
  html = html.replaceAll('Jakominiplatz', 'Hazratganj');
  html = html.replaceAll('Kunsthaus', 'Charbagh');
  html = html.replaceAll('Main Station', 'Amar Shaheed Path');
  html = html.replaceAll('Volksgarten', 'Kisan Path');
  html = html.replaceAll('Augarten', 'Alambagh');

  // 10. Legal Footer Bar
  const legalFooterBar = `
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
  `;

  if (!html.includes('id="grand-legal-footer"')) {
    if (html.includes('</footer>')) {
      html = html.replace('</footer>', `${legalFooterBar}</footer>`);
    } else {
      html = html.replace('</body>', `${legalFooterBar}</body>`);
    }
  }

  // 11. Interactive Booking Modal Script
  const modalScript = generateBookingModal(v);
  html = html.replace('</body>', `${modalScript}</body>`);

  // Restore pristine handover script so React hydration never crashes
  if (originalHandover) {
    html = html.replace(/<script type="framer\/handover" id="__framer__handoverData">[\s\S]*?<\/script>/, originalHandover);
  }

  // Write out to venues/ directory
  const venueFile = path.join('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues', `${v.slug}.html`);
  const boutiqueFile = path.join('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues', `${v.boutiqueSlug}.html`);
  
  fs.mkdirSync(path.dirname(venueFile), { recursive: true });
  fs.writeFileSync(venueFile, html, 'utf8');
  fs.writeFileSync(boutiqueFile, html, 'utf8');
  console.log(`Generated: ${venueFile} (${html.length} bytes) and alias ${boutiqueFile}`);
}

venues.forEach(buildVenuePage);
console.log('All 5 venue sub-pages generated successfully!');
