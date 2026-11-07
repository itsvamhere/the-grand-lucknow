import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

console.log('=== CREATING VENUE N°2 PAGE ===');

// Read upstream_boutique_n2.html
const rawHtml = fs.readFileSync(path.join(projectDir, 'upstream_boutique_n2.html'), 'utf-8');

let html = rawHtml;

// 1. Module Preload and Upstream replacements
html = html.replaceAll('https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/', '/scripts/');
html = html.replaceAll('https://www.casamomo.at', 'https://www.thegrandlucknow.in');
html = html.replaceAll('casamomo.at', 'thegrandlucknow.in');
html = html.replaceAll('Casa Momo', 'The Grand');
html = html.replaceAll('CASA MOMO', 'THE GRAND');
html = html.replaceAll('Graz', 'Lucknow');
html = html.replaceAll('Austria', 'India');

// 2. Titles and Headings: Venue N°2 (NOT Boutique)
html = html.replaceAll('N°02 • Designer Apartment in Graz • Casa Momo', 'Venue N°2 • Premier Celebration Venue • The Grand Lucknow');
html = html.replaceAll('N°02 • Designer Apartment in Graz', 'Venue N°2 • Premier Celebration Venue in Lucknow');
html = html.replaceAll('N°02', 'Venue N°2');
html = html.replaceAll('Boutique  N°2', 'Venue  N°2');
html = html.replaceAll('N°01', 'Venue N°1');
html = html.replaceAll('N°03', 'Venue N°3');
html = html.replaceAll('N°04', 'Venue N°4');
html = html.replaceAll('Details', 'Details');
html = html.replaceAll('Apartment  Details', 'Venue  Details');
html = html.replaceAll('Other Places to Stay', 'Other Event Venues');
html = html.replaceAll('Other  Places  to  Stay', 'Other  Event  Venues');
html = html.replaceAll('short and longer stays', 'grand celebrations and weddings');

// 3. Venue Sizing & Capacity (not 45 sqm / 3 guests)
html = html.replaceAll('20,000 sq ft', '14,000 sq ft');
html = html.replaceAll('20,000 sq ft', '14,000 sq ft');
html = html.replaceAll('45 sqft', '14,000 sq ft');
html = html.replaceAll('3 guests', '900 guests');
html = html.replaceAll('3 Guests', '900 Guests');
html = html.replaceAll('1 bedroom', 'Pillarless Ballroom & Lawns');
html = html.replaceAll('1 Bedroom', 'Pillarless Ballroom & Lawns');
html = html.replaceAll('1 bed', 'Main Ballroom + Bridal Suites');
html = html.replaceAll('1 Bed', 'Main Ballroom + Bridal Suites');

// 4. Attribution: Built by Edifice
html = html.replaceAll('Built by Nexene', 'Built by Edifice');
html = html.replaceAll('Built by', 'Built by');
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('>Nexene<', '>Edifice<');

// 5. Contact info & Address
html = html.replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com');
html = html.replaceAll('office@casamomo.at', 'Thegrandbanquet07@gmail.com');
html = html.replaceAll('+43 664 1999605', '+91 91291 27091');
html = html.replaceAll('Schönaugasse 76', '22, Raibareli Rd, Bindaua');

// 6. Socials: Facebook instead of LinkedIn
html = html.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
html = html.replaceAll('https://www.facebook.com/thegrandlucknow/', 'https://www.facebook.com/thegrandlucknow/');
html = html.replaceAll('>Facebook<', '>Facebook<');

// 7. Remove all Casa Momo photos (make gallery blank as requested: "just keep the photos for each venue page as blank")
html = html.replace(/<img[^>]*framerusercontent\.com\/images\/[^>]*>/gi, (match) => {
  // If it's a logo or map, keep it; otherwise replace with empty styled placeholder
  if (match.includes('logo') || match.includes('map')) return match;
  return `<div style="width:100%;height:100%;min-height:480px;background:rgba(255,240,202,0.03);border:1px solid rgba(255,240,202,0.08);border-radius:4px;display:flex;align-items:center;justify-content:center;color:rgba(255,240,202,0.25);font-size:14px;letter-spacing:0.1em;text-transform:uppercase;">Venue N°02 • Space Architecture</div>`;
});

// Suppress all picture / img tags referencing Casa Momo CDN
html = html.replaceAll(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.]+\.(jpg|jpeg|png|webp)/gi, '/images/map_cutout.webp');

// 8. Make Location Visible with Google Maps Cutout
const locationSectionRegex = /<section[^>]*data-framer-name="Location"[\s\S]*?<\/section>/i;
const googleMapSection = `
<section class="framer-location-section" data-framer-name="Location" style="padding: 80px max(48px, calc(var(--grand-page-w, 100vw) * 0.030000)); background: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, #0e1201); color: #fff0ca;">
  <div style="max-width: 1400px; margin: 0 auto;">
    <h2 style="font-family: 'DM Serif Display', Georgia, serif; font-size: 56px; font-weight: 400; margin-bottom: 24px; color: #fff0ca;">Location</h2>
    <p style="font-family: 'Lay Grotesk Regular', sans-serif; font-size: 20px; line-height: 1.5; color: rgba(255, 240, 202, 0.8); max-width: 800px; margin-bottom: 32px;">
      Venue N°2 is located within The Grand estate on <strong>22, Raibareli Road, Bindaua, Lucknow</strong>. Seamless arterial connectivity via Amar Shaheed Path with dedicated valet parking for over 1,500 vehicles.
    </p>
    <div style="width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 240, 202, 0.15); box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
      <img src="/images/map_cutout.webp" alt="The Grand Estate Location Map - Raibareli Road, Bindaua, Lucknow" style="width: 100%; height: auto; max-height: 600px; object-fit: cover; display: block;">
    </div>
  </div>
</section>
`;

if (locationSectionRegex.test(html)) {
  html = html.replace(locationSectionRegex, googleMapSection);
}

// 9. Add Interactive Booking Calendar & Payment Gateway Drawer
const bookingModalHtml = `
<!-- ========================================================================= -->
<!-- THE GRAND: EVENT CALENDAR & RAZORPAY PAYMENT GATEWAY MODAL               -->
<!-- ========================================================================= -->
<div id="grand-booking-modal" style="display:none; position:fixed; inset:0; z-index:999999; background:rgba(0,0,0,0.75); backdrop-filter:blur(10px); align-items:center; justify-content:center; padding:20px;">
  <div style="background:#151b0e; border:1px solid rgba(255,240,202,0.2); border-radius:12px; width:100%; max-width:680px; max-height:90vh; overflow-y:auto; padding:36px; box-shadow:0 24px 64px rgba(0,0,0,0.6); color:#fff0ca; font-family:'Lay Grotesk Regular', sans-serif;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; border-bottom:1px solid rgba(255,240,202,0.12); padding-bottom:16px;">
      <div>
        <h3 style="font-family:'DM Serif Display', Georgia, serif; font-size:32px; font-weight:400; color:#fff0ca; margin:0;">Check Availability & Reserve</h3>
        <p style="font-size:14px; color:rgba(255,240,202,0.7); margin-top:4px;">Venue N°2 • 14,000 sq ft • Up to 900 Guests</p>
      </div>
      <button onclick="document.getElementById('grand-booking-modal').style.display='none'" style="background:transparent; border:none; color:#fff0ca; font-size:28px; cursor:pointer; line-height:1;">&times;</button>
    </div>

    <!-- Pricing Policy Notice -->
    <div style="background:rgba(255,240,202,0.06); border-left:4px solid #d4af37; padding:14px 18px; border-radius:4px; margin-bottom:24px; font-size:14px; line-height:1.5; color:rgba(255,240,202,0.9);">
      <strong>Custom Event Pricing:</strong> Every celebration at The Grand is bespoke. Exact package cost is tailored to guest count, multi-cuisine catering, and mandap decor (to be discussed with our event concierge). Lock your requested date with an advance reservation deposit.
    </div>

    <!-- Booking Form -->
    <form id="grand-booking-form" onsubmit="event.preventDefault(); window.triggerGrandPayment();">
      <!-- Date Picker -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
        <div>
          <label style="display:block; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,240,202,0.6); margin-bottom:6px;">Event Date</label>
          <input type="date" required id="event-date" value="2026-12-15" style="width:100%; background:rgba(255,240,202,0.08); border:1px solid rgba(255,240,202,0.2); border-radius:6px; padding:12px; color:#fff0ca; font-size:15px; outline:none; box-sizing:border-box;">
        </div>
        <div>
          <label style="display:block; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,240,202,0.6); margin-bottom:6px;">Event Slot</label>
          <select id="event-slot" style="width:100%; background:#1c2414; border:1px solid rgba(255,240,202,0.2); border-radius:6px; padding:12px; color:#fff0ca; font-size:15px; outline:none; box-sizing:border-box;">
            <option value="evening">Evening Gala (17:00 – 23:30)</option>
            <option value="morning">Morning Auspicious (09:00 – 15:00)</option>
            <option value="fullday">Full Day Exclusive (24-Hour Access)</option>
          </select>
        </div>
      </div>

      <!-- Occasion & Guest Count -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
        <div>
          <label style="display:block; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,240,202,0.6); margin-bottom:6px;">Occasion</label>
          <select id="event-type" style="width:100%; background:#1c2414; border:1px solid rgba(255,240,202,0.2); border-radius:6px; padding:12px; color:#fff0ca; font-size:15px; outline:none; box-sizing:border-box;">
            <option>Wedding & Reception</option>
            <option>Sangeet & Mehendi Celebration</option>
            <option>Ring Ceremony / Engagement</option>
            <option>Corporate Annual Gala</option>
            <option>Anniversary / Family Gathering</option>
          </select>
        </div>
        <div>
          <label style="display:block; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,240,202,0.6); margin-bottom:6px;">Estimated Guests</label>
          <select id="guest-count" style="width:100%; background:#1c2414; border:1px solid rgba(255,240,202,0.2); border-radius:6px; padding:12px; color:#fff0ca; font-size:15px; outline:none; box-sizing:border-box;">
            <option>300 – 500 Guests</option>
            <option>500 – 900 Guests (Recommended for Venue N°2)</option>
            <option>900 – 1,500 Guests (With Lawn Access)</option>
          </select>
        </div>
      </div>

      <!-- Contact details -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
        <div>
          <label style="display:block; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,240,202,0.6); margin-bottom:6px;">Your Name</label>
          <input type="text" required placeholder="Full Name" value="Aarav Sharma" style="width:100%; background:rgba(255,240,202,0.08); border:1px solid rgba(255,240,202,0.2); border-radius:6px; padding:12px; color:#fff0ca; font-size:15px; outline:none; box-sizing:border-box;">
        </div>
        <div>
          <label style="display:block; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,240,202,0.6); margin-bottom:6px;">Mobile Number</label>
          <input type="tel" required placeholder="+91 98765 43210" value="+91 91291 27091" style="width:100%; background:rgba(255,240,202,0.08); border:1px solid rgba(255,240,202,0.2); border-radius:6px; padding:12px; color:#fff0ca; font-size:15px; outline:none; box-sizing:border-box;">
        </div>
      </div>

      <!-- Deposit & Payment Method Selector -->
      <div style="background:rgba(255,240,202,0.04); border:1px solid rgba(255,240,202,0.15); border-radius:8px; padding:20px; margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <div>
            <div style="font-size:13px; color:rgba(255,240,202,0.7); text-transform:uppercase; letter-spacing:0.06em;">Advance Date Lock Deposit</div>
            <div style="font-size:26px; font-weight:700; color:#d4af37; margin-top:2px;">₹50,000 <span style="font-size:14px; font-weight:400; color:rgba(255,240,202,0.6);">(INR)</span></div>
          </div>
          <div style="text-align:right; font-size:12px; color:rgba(255,240,202,0.6);">
            Adjustable against final banquet bill<br>
            Secure Razorpay & UPI Gateway
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-top:10px;">
          <label style="border:1px solid rgba(255,240,202,0.3); border-radius:6px; padding:10px; display:flex; align-items:center; gap:8px; cursor:pointer; background:rgba(255,240,202,0.06); font-size:13px;">
            <input type="radio" name="payment-method" value="upi" checked> <strong>UPI</strong> (GPay/PhonePe)
          </label>
          <label style="border:1px solid rgba(255,240,202,0.2); border-radius:6px; padding:10px; display:flex; align-items:center; gap:8px; cursor:pointer; background:rgba(255,240,202,0.02); font-size:13px;">
            <input type="radio" name="payment-method" value="card"> <strong>Cards</strong> (Visa/Master/RuPay)
          </label>
          <label style="border:1px solid rgba(255,240,202,0.2); border-radius:6px; padding:10px; display:flex; align-items:center; gap:8px; cursor:pointer; background:rgba(255,240,202,0.02); font-size:13px;">
            <input type="radio" name="payment-method" value="netbanking"> <strong>NetBanking</strong>
          </label>
        </div>
      </div>

      <!-- Action Button -->
      <button type="submit" style="width:100%; background:#d4af37; color:#0e1201; border:none; padding:16px; border-radius:6px; font-size:16px; font-weight:700; letter-spacing:0.04em; cursor:pointer; transition:background 0.2s; text-transform:uppercase;">
        Proceed to Secure Payment (₹50,000) &rarr;
      </button>
    </form>

    <!-- Success Confirmation State -->
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
  </div>
</div>

<script>
window.openGrandBooking = function() {
  var modal = document.getElementById('grand-booking-modal');
  if (modal) {
    modal.style.display = 'flex';
  }
};

window.triggerGrandPayment = function() {
  document.getElementById('grand-booking-form').style.display = 'none';
  document.getElementById('grand-payment-success').style.display = 'block';
};

// Wire all "Check Availability" and "Plan Your Event" buttons on the page to open this modal
document.addEventListener('DOMContentLoaded', function() {
  function wireButtons() {
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
  wireButtons();
  setTimeout(wireButtons, 1500);
});
</script>
`;

html = html.replace('</body>', bookingModalHtml + '\n</body>');

// Save as both venues/venue-n2.html and venues/boutique-n2.html
fs.mkdirSync(path.join(projectDir, 'venues'), { recursive: true });
fs.writeFileSync(path.join(projectDir, 'venues/venue-n2.html'), html, 'utf-8');
fs.writeFileSync(path.join(projectDir, 'venues/boutique-n2.html'), html, 'utf-8');

console.log('✓ Created venues/venue-n2.html and venues/boutique-n2.html');
