import fs from 'fs';

let html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const modalScript = `
<script>
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
            <h3 style="font-family:'DM Serif Display', Georgia, serif; font-size:28px; margin:0; color:#fff0ca;">Venue N°2 • Date Lock</h3>
          </div>
          <button onclick="document.getElementById('grand-booking-modal').style.display='none'" style="background:transparent; border:none; color:#fff0ca; font-size:24px; cursor:pointer; padding:4px 8px; line-height:1;">&times;</button>
        </div>

        <div style="background:rgba(255, 240, 202, 0.05); border-left:3px solid #d4af37; padding:12px 16px; border-radius:0 6px 6px 0; margin-bottom:24px; font-size:13.5px; line-height:1.5;">
          <strong>Estate Venue Scale:</strong> 14,000 sq ft &nbsp;•&nbsp; 900 Seated / 1,500 Floating Capacity<br>
          <em>Note: Custom event pricing is tailored to your guest count, catering curation, and production requirements (to be discussed with our estate concierge). Lock your celebration date with an advance deposit.</em>
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

  function wireButtons() {
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireButtons);
  } else {
    wireButtons();
  }
  window.addEventListener('load', wireButtons);
  setInterval(wireButtons, 2000);
})();
</script>
`;

// Replace existing booking modal script
if (html.includes('window.openGrandBooking = function()') || html.includes('window.openGrandModal = window.openGrandBooking = function()')) {
  html = html.replace(/<script>[\s\S]*?window\.openGrandModal[\s\S]*?<\/script>/i, modalScript);
} else {
  html = html.replace('</body>', `${modalScript}</body>`);
}

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', html, 'utf8');
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n2.html', html, 'utf8');
console.log('Immune modal script injected successfully!');
