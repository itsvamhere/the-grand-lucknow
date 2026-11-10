import fs from 'fs';

let baseHtml = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const canHeader = fs.readFileSync('tools/canonical_header.html', 'utf8');
const canFooter = fs.readFileSync('tools/canonical_footer.html', 'utf8');
const cleanCal = fs.readFileSync('tools/casamomo_live_calendar_clean.html', 'utf8');

// 1. Title and Metadata
baseHtml = baseHtml.replace(/<title>.*?<\/title>/, '<title>Check Availability • The Grand Lucknow</title>');

// 1.5 Stacking context fix for calendar popup
const stackingFix = `<style id="grand-calendar-stacking-fix">
  .framer-90rc50,
  .framer-4stydd-container,
  .casa-bk-search {
    position: relative !important;
    z-index: 200 !important;
  }
  #grand-calendar-popup {
    z-index: 10000 !important;
  }
  #cdngc4,
  .framer-cdngc4 {
    position: relative !important;
    z-index: 1 !important;
  }
</style>
<style id="casamomo-menu-button-fix">
  /* CASAMOMO 1:1 MOBILE MENU BUTTON (FIXED 61.4px x 30px CONTAINER - ZERO EXPANSION) */
  .framer-1s5ig4a,
  [data-framer-name="Menu Button"],
  header [data-framer-name="Mobile Menu"] [data-highlight="true"],
  header [data-framer-name="Mobile Navbar"] [data-highlight="true"] {
    width: 61.4px !important;
    min-width: 61.4px !important;
    max-width: 61.4px !important;
    height: 30px !important;
    min-height: 30px !important;
    max-height: 30px !important;
    padding: 7px 12px 8px !important;
    position: absolute !important;
    top: 12px !important;
    right: 12px !important;
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: clip !important;
    border-radius: 2px !important;
    background: rgba(255, 240, 202, 0.07) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    cursor: pointer !important;
    z-index: 100 !important;
  }
  .framer-1s5ig4a .framer-1clpaht-container,
  [data-framer-name="Menu Button"] .framer-1clpaht-container,
  [data-framer-name="Menu Roll"] {
    width: 38px !important;
    min-width: 38px !important;
    max-width: 38px !important;
    height: 15px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .framer-1s5ig4a [data-rolling-label],
  [data-framer-name="Menu Button"] [data-rolling-label],
  [data-framer-name="Menu Roll"] [data-rolling-label],
  .framer-1clpaht-container [data-rolling-label] {
    display: inline-grid !important;
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr !important;
    width: 38px !important;
    min-width: 38px !important;
    max-width: 38px !important;
    height: 15px !important;
    line-height: 15px !important;
    font-size: 15px !important;
    justify-items: center !important;
    align-items: center !important;
    text-align: center !important;
    overflow: hidden !important;
    position: relative !important;
    margin: 0 !important;
  }
  .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"],
  [data-framer-name="Menu Button"] [data-rolling-label] > span[aria-hidden="true"],
  [data-framer-name="Menu Roll"] [data-rolling-label] > span[aria-hidden="true"],
  .framer-1clpaht-container [data-rolling-label] > span[aria-hidden="true"] {
    grid-area: 1 / 1 !important;
    grid-column: 1 !important;
    grid-row: 1 !important;
    display: inline-block !important;
    text-align: center !important;
    white-space: pre !important;
  }
</style>`;
baseHtml = baseHtml.replace('</head>', `${stackingFix}\n</head>`);

// 2. Remove Framer script_main bundle so it doesn't overwrite our DOM
baseHtml = baseHtml.replace(/<script[^>]*script_main[^>]*><\/script>/g, '');

// 3. Replace Header with Canonical Header
const headStart = baseHtml.indexOf('<header');
const headEnd = baseHtml.indexOf('</header>', headStart) + 9;
if (headStart !== -1 && headEnd !== -1) {
  baseHtml = baseHtml.slice(0, headStart) + canHeader + baseHtml.slice(headEnd);
}

// 4. Replace Footer with Canonical Footer
const footStart = baseHtml.indexOf('<footer');
const footEnd = baseHtml.indexOf('</footer>', footStart) + 9;
if (footStart !== -1 && footEnd !== -1) {
  baseHtml = baseHtml.slice(0, footStart) + canFooter + baseHtml.slice(footEnd);
}

// 5. Clean up H1 text styling in Section 0
baseHtml = baseHtml.replace(
  /<h1[^>]*>[\s\S]*?<\/h1>/g,
  `<h1 lang="en" style="font-family:'Lay Grotesk Regular', sans-serif;font-size:max(calc(var(--casa-page-w, 100vw) * 0.05), calc(var(--casa-phone, 0) * 36px));font-style:normal;font-weight:400;letter-spacing:-0.025em;line-height:0.95em;text-align:left;width:100%;margin:0;padding:0;display:flex;flex-wrap:wrap;column-gap:0.28em;justify-content:flex-start;color:rgb(255, 240, 202);text-transform:none;">
    <span>Check</span> <span>Availability</span>
  </h1>`
);

// 6. Replace Search Bar with interactive elements and embed clean calendar
const searchStart = baseHtml.indexOf('data-framer-name="Booking Search"');
const searchContainerStart = baseHtml.lastIndexOf('<div class="framer-4stydd-container"', searchStart);
const searchEnd = baseHtml.indexOf('</section>', searchStart);

const interactiveSearch = `<div class="framer-4stydd-container" data-code-component-plugin-id="api" data-framer-name="Booking Search" name="Booking Search" style="width: 100%; position: relative;">
  <div role="search" aria-label="Search venues by dates and guests" class="casa-bk-root casa-bk-search" style="width:100%;font-family:'Lay Grotesk Regular', sans-serif;font-size:max(14px, calc(var(--casa-page-w, 100vw) * 0.008750));font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.2em;color:rgb(255, 240, 202);position:relative">
    <div class="casa-bk-grid" style="display:grid;grid-template-columns:repeat(3, minmax(140px, 1fr)) auto;gap:6px;align-items:stretch;">
      <button type="button" id="grand-btn-arrival" aria-expanded="true" aria-haspopup="dialog" style="all:unset;color:rgb(255, 240, 202);box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;justify-content:center;gap:0.3em;padding:16px 20px;background:rgba(255, 240, 202, 0.07);border-radius:2px;outline:none;outline-offset:-1px;min-width:0;flex:1;transition:background 0.2s;">
        <span style="font-size:0.72em;line-height:1.2em;letter-spacing:0.06em;text-transform:uppercase;opacity:0.6">Arrival</span>
        <span id="grand-arrival-val" style="font-size:17px;line-height:1.2em;opacity:0.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Add date</span>
      </button>
      <button type="button" id="grand-btn-departure" aria-expanded="true" aria-haspopup="dialog" style="all:unset;color:rgb(255, 240, 202);box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;justify-content:center;gap:0.3em;padding:16px 20px;background:rgba(255, 240, 202, 0.07);border-radius:2px;outline:none;outline-offset:-1px;min-width:0;flex:1;transition:background 0.2s;">
        <span style="font-size:0.72em;line-height:1.2em;letter-spacing:0.06em;text-transform:uppercase;opacity:0.6">Departure</span>
        <span id="grand-departure-val" style="font-size:17px;line-height:1.2em;opacity:0.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Add date</span>
      </button>
      <button type="button" id="grand-btn-guests" style="all:unset;color:rgb(255, 240, 202);box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;justify-content:center;gap:0.3em;padding:16px 20px;background:rgba(255, 240, 202, 0.07);border-radius:2px;outline:none;outline-offset:-1px;min-width:0;flex:1;">
        <span style="font-size:0.72em;line-height:1.2em;letter-spacing:0.06em;text-transform:uppercase;opacity:0.6">Guests</span>
        <span id="grand-guests-val" style="font-size:17px;line-height:1.2em;opacity:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">2,500 Capacity</span>
      </button>
      <button type="button" id="grand-btn-search" style="font-family:'Lay Grotesk Regular', sans-serif;font-size:17px;font-style:normal;font-weight:400;letter-spacing:0;line-height:1.2em;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:16px 32px;border:none;border-radius:2px;background:rgb(255, 240, 202);color:rgb(14, 18, 1);cursor:pointer;white-space:nowrap;transition:opacity 0.2s;">
        <span>Search</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 1V2H6.98C7.83 2 8.26 3.03 7.66 3.63L1 10.29L1.71 11L8.37 4.34C8.97 3.74 10 4.16 10 5.02V8H11V1H4Z" fill="currentColor"/></svg>
      </button>
    </div>

    <!-- Interactive Calendar Popup -->
    <div id="grand-calendar-popup" style="display: block; position: absolute; top: calc(100% + 8px); left: 0; z-index: 10000; width: 627px; max-width: calc(100vw - 32px);">
      ${cleanCal}
    </div>
  </div>
</div>`;

baseHtml = baseHtml.slice(0, searchContainerStart) + interactiveSearch + baseHtml.slice(searchEnd);

// 7. Replace Section 1 (Apartments Grid) with dynamic 5-venue showcase
const gridStart = baseHtml.indexOf('data-framer-name="Apartments Grid"');
const gridSectionStart = baseHtml.lastIndexOf('<section class="framer-cdngc4"', gridStart);
const gridSectionEnd = baseHtml.indexOf('</section>', gridStart) + 10;

const venueShowcaseMarkup = `<section class="framer-cdngc4" data-framer-name="Apartments Grid" id="cdngc4" style="padding-top: 48px;">
  <!-- Selected Venue Top Container -->
  <div id="selected-venue-container" class="framer-3sb2hu" data-framer-name="Selected Apartment" style="width: 100%;">
    <!-- Dynamically rendered by JS -->
  </div>

  <!-- Other Venues Section Header -->
  <div style="width: 100%; border-top: 1px solid rgba(255, 240, 202, 0.12); padding-top: 48px; margin-top: 16px;">
    <h3 style="font-family:'Lay Grotesk Regular', sans-serif; font-size:16px; color:rgba(255, 240, 202, 0.6); letter-spacing:0.06em; text-transform:uppercase; margin:0 0 32px 0;">
      All Venues at The Grand Lucknow
    </h3>
  </div>

  <!-- Other Venues Grid -->
  <div id="other-venues-container" style="width: 100%; display: flex; flex-direction: column; gap: 64px;">
    <!-- Dynamically rendered by JS -->
  </div>
</section>`;

baseHtml = baseHtml.slice(0, gridSectionStart) + venueShowcaseMarkup + baseHtml.slice(gridSectionEnd);

// 8. Inject Master Booking Controller Script
const controllerScript = `
<script id="grand-booking-controller">
(function() {
  var VENUES = {
    'open-earth-lawn': {
      slug: 'open-earth-lawn',
      name: 'Open Earth Lawn',
      sizeNum: '25,000 Sqft',
      capacityNum: '2,500',
      capacityDisplay: '1,000 - 2,500 Guests',
      image: '/images/venues/open_earth_lawn_official.webp',
      subpage: '/venues/open-earth-lawn',
      desc: 'Spanning 55,000 square feet of manicured, open-sky lush greens, Open Earth Lawn is the signature outdoor event canvas of The Grand Lucknow. Surrounded by towering royal palm canopies and soft ambient architectural illumination, it offers a grand stage for 1,000 to 2,500 guests with extensive dedicated parking, pristine lawns, and bespoke hospitality orchestrations for majestic weddings and gala celebrations.'
    },
    'grassland-gala': {
      slug: 'grassland-gala',
      name: 'Grassland Gala',
      sizeNum: '20,000 Sqft',
      capacityNum: '800',
      capacityDisplay: '500 - 800 Guests',
      image: '/images/venues/grassland_gala_official.webp',
      subpage: '/venues/grassland-gala',
      desc: 'A spacious lawn area ideal for medium to large weddings and outdoor events. Beautiful landscaping with modern amenities, manicured green lawns, and ambient garden lighting for vibrant cocktail evenings and wedding celebrations.'
    },
    'garden-galaxy': {
      slug: 'garden-galaxy',
      name: 'Garden Galaxy',
      sizeNum: '15,000 Sqft',
      capacityNum: '300',
      capacityDisplay: '250 - 300 Guests',
      image: '/images/venues/garden_galaxy_official.webp',
      subpage: '/venues/garden-galaxy',
      desc: 'An intimate outdoor lawn space perfect for smaller gatherings, pre-wedding functions, and private celebrations. Garden Galaxy offers lush garden ambiance, private event hospitality, and dedicated event management for unforgettable moments.'
    },
    'the-grand-courtyard': {
      slug: 'the-grand-courtyard',
      name: 'The Grand Courtyard',
      sizeNum: '15,000 Sqft',
      capacityNum: '250',
      capacityDisplay: '200 - 250 Guests',
      image: '/images/venues/the_grand_courtyard_official.webp',
      subpage: '/venues/the-grand-courtyard',
      desc: 'A charming courtyard space specially designed for traditional ceremonies like Haldi, Mehndi, and intimate pre-wedding functions. Blending authentic Awadhi architectural charm with serene natural open-air surroundings.'
    },
    'the-royal-legacy-banquet': {
      slug: 'the-royal-legacy-banquet',
      name: 'The Royal Legacy Banquet',
      sizeNum: '10,000 Sqft',
      capacityNum: '600',
      capacityDisplay: '400 - 600 Guests',
      image: '/images/venues/royal_legacy_banquet_official.webp',
      subpage: '/venues/the-royal-legacy-banquet',
      desc: 'A luxurious pillarless indoor banquet hall featuring soaring ceilings, grand crystal chandeliers, and cutting-edge acoustic engineering. The Royal Legacy Banquet is Lucknow premier address for regal indoor weddings, corporate summits, and prestigious galas.'
    }
  };

  var ALIASES = {
    'venue-n1': 'open-earth-lawn',
    'boutique-n1': 'open-earth-lawn',
    'venue-n2': 'grassland-gala',
    'boutique-n2': 'grassland-gala',
    'venue-n3': 'garden-galaxy',
    'boutique-n3': 'garden-galaxy',
    'venue-n4': 'the-grand-courtyard',
    'the-courtyard': 'the-grand-courtyard',
    'boutique-n4': 'the-grand-courtyard',
    'venue-n5': 'the-royal-legacy-banquet',
    'grand-ballroom': 'the-royal-legacy-banquet',
    'royal-legacy-banquet': 'the-royal-legacy-banquet',
    'boutique-n5': 'the-royal-legacy-banquet',
    'loft-n1': 'the-royal-legacy-banquet'
  };

  var startDate = null;
  var endDate = null;
  var currentVenueSlug = 'open-earth-lawn';

  function getQuerySlug() {
    var params = new URLSearchParams(window.location.search);
    var v = params.get('venue') || params.get('apartment') || 'open-earth-lawn';
    if (ALIASES[v]) v = ALIASES[v];
    return VENUES[v] ? v : 'open-earth-lawn';
  }

  currentVenueSlug = getQuerySlug();

  function renderBookingItem(v, isSelected) {
    var checkDatesAction = startDate && endDate
      ? 'window.open(\\'https://wa.me/919129127091?text=' + encodeURIComponent('Hello The Grand Lucknow, I would like to reserve dates for ' + v.name + ' from ' + startDate + ' to ' + endDate + '.') + '\\', \\'_blank\\')'
      : 'toggleCalendar(true)';

    var statusText = startDate && endDate
      ? '<span style="color:#BC6F45; font-weight:500;">Available for ' + formatDateNice(startDate) + ' – ' + formatDateNice(endDate) + '</span>'
      : 'Choose your dates to see the price';

    var buttonLabel = startDate && endDate ? 'Inquire for Dates ↗' : 'Check dates ↗';

    return '<div class="framer-gsn7ju" data-framer-name="Booking Item" style="display:flex; flex-flow:row; gap:48px; width:100%; align-items:flex-start;">' +
      '<div class="framer-1snxl4n-container" style="flex:1 0 0; width:1px; position:relative;">' +
        '<a class="framer-ysBPc framer-yRUcs framer-prpyo3" href="' + v.subpage + '" target="_blank" style="text-decoration:none; display:block; width:100%; border-radius:2px; overflow:hidden;">' +
          '<div style="width:100%; aspect-ratio:16/10; overflow:hidden; position:relative; background:#161A13; border-radius:2px;">' +
            '<img src="' + v.image + '" alt="' + v.name + '" style="width:100%; height:100%; object-fit:cover; transition:transform 0.8s cubic-bezier(0.52,0,0,1);" onmouseover="this.style.transform=\\'scale(1.03)\\'" onmouseout="this.style.transform=\\'scale(1)\\'"/>' +
          '</div>' +
          '<div style="padding:16px 0 0 0; display:flex; flex-direction:column; gap:8px;">' +
            '<h2 style="font-family:\\'Lay Grotesk Regular\\', sans-serif; font-size:24px; color:rgb(255,240,202); margin:0; font-weight:400; line-height:1.2em;">' + v.name + '</h2>' +
            '<div style="display:flex; gap:16px; align-items:center;">' +
              '<div style="display:flex; align-items:center; gap:6px; color:rgb(255,240,202); opacity:0.8; font-size:15px;">' +
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/></svg>' +
                '<span>' + v.sizeNum + '</span>' +
              '</div>' +
              '<div style="display:flex; align-items:center; gap:6px; color:rgb(255,240,202); opacity:0.8; font-size:15px;">' +
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4" r="2.5" stroke="currentColor" stroke-width="1.2"/><path d="M2.5 12.5C2.5 9.73858 4.51472 8 7 8C9.48528 8 11.5 9.73858 11.5 12.5" stroke="currentColor" stroke-width="1.2"/></svg>' +
                '<span>' + v.capacityNum + ' Guests</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</a>' +
      '</div>' +
      '<div class="framer-7g9wgs" style="flex:1 0 0; width:1px; display:flex; flex-direction:column; gap:16px;">' +
        '<p style="font-family:\\'Lay Grotesk Regular\\', sans-serif; font-size:17px; line-height:1.45em; color:rgba(255,240,202,0.7); margin:0;">' + v.desc + '</p>' +
      '</div>' +
      '<div class="framer-19x7sgr-container" style="flex:1 0 0; width:1px; display:flex; flex-direction:column; gap:16px; align-items:flex-start;">' +
        '<p id="status-' + v.slug + '" style="font-family:\\'Lay Grotesk Regular\\', sans-serif; font-size:16px; color:rgba(255,240,202,0.85); margin:0;">' + statusText + '</p>' +
        (isSelected
          ? '<button type="button" onclick="' + checkDatesAction + '" style="font-family:\\'Lay Grotesk Regular\\', sans-serif; font-size:17px; padding:14px 28px; background:rgb(255,240,202); color:rgb(14,18,1); border:none; border-radius:2px; cursor:pointer; font-weight:400; display:inline-flex; align-items:center; gap:8px; transition:opacity 0.2s;">' + buttonLabel + '</button>'
          : '<button type="button" onclick="selectVenue(\\'' + v.slug + '\\')" style="font-family:\\'Lay Grotesk Regular\\', sans-serif; font-size:16px; padding:12px 24px; background:rgba(255,240,202,0.1); color:rgb(255,240,202); border:1px solid rgba(255,240,202,0.2); border-radius:2px; cursor:pointer; font-weight:400; display:inline-flex; align-items:center; gap:8px; transition:all 0.2s;">Select Venue ↗</button>'
        ) +
      '</div>' +
    '</div>';
  }

  function formatDateNice(isoStr) {
    if (!isoStr) return '';
    var parts = isoStr.split('-');
    var day = parseInt(parts[2], 10);
    var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var m = monthNames[parseInt(parts[1], 10) - 1];
    return day + ' ' + m;
  }

  window.selectVenue = function(slug) {
    if (!VENUES[slug]) return;
    currentVenueSlug = slug;
    var newUrl = window.location.pathname + '?venue=' + slug;
    window.history.pushState({ venue: slug }, '', newUrl);
    renderAllVenues();
    var gVal = document.getElementById('grand-guests-val');
    if (gVal) gVal.innerText = VENUES[slug].capacityNum + ' Capacity';
    var topSec = document.getElementById('selected-venue-container');
    if (topSec) topSec.scrollIntoView({ behavior: 'smooth' });
  };

  function renderAllVenues() {
    var selContainer = document.getElementById('selected-venue-container');
    var otherContainer = document.getElementById('other-venues-container');
    if (!selContainer || !otherContainer) return;

    var cur = VENUES[currentVenueSlug] || VENUES['open-earth-lawn'];
    var gVal = document.getElementById('grand-guests-val');
    if (gVal) gVal.innerText = cur.capacityNum + ' Capacity';
    selContainer.innerHTML = renderBookingItem(cur, true);

    var others = Object.keys(VENUES).filter(function(k) { return k !== currentVenueSlug; });
    otherContainer.innerHTML = others.map(function(k) { return renderBookingItem(VENUES[k], false); }).join('');
  }

  // Calendar Logic
  var calPopup = document.getElementById('grand-calendar-popup');
  var arrBtn = document.getElementById('grand-btn-arrival');
  var depBtn = document.getElementById('grand-btn-departure');
  var searchBtn = document.getElementById('grand-btn-search');
  var arrVal = document.getElementById('grand-arrival-val');
  var depVal = document.getElementById('grand-departure-val');

  window.toggleCalendar = function(open) {
    if (!calPopup) return;
    if (typeof open === 'boolean') {
      calPopup.style.display = open ? 'block' : 'none';
    } else {
      calPopup.style.display = calPopup.style.display === 'none' ? 'block' : 'none';
    }
  };

  if (arrBtn) arrBtn.addEventListener('click', function(e) { e.stopPropagation(); toggleCalendar(); });
  if (depBtn) depBtn.addEventListener('click', function(e) { e.stopPropagation(); toggleCalendar(); });

  if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleCalendar(false);
      var sel = document.getElementById('selected-venue-container');
      if (sel) sel.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function initCalendarClicks() {
    var dayButtons = calPopup ? calPopup.querySelectorAll('button[data-day]') : [];
    dayButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var dateStr = btn.getAttribute('data-day');
        if (btn.hasAttribute('disabled') || btn.getAttribute('aria-disabled') === 'true') {
          return;
        }

        if (!startDate || (startDate && endDate)) {
          startDate = dateStr;
          endDate = null;
          if (arrVal) {
            arrVal.innerText = formatDateNice(startDate) + ' 2026';
            arrVal.style.opacity = '1';
          }
          if (depVal) {
            depVal.innerText = 'Add date';
            depVal.style.opacity = '0.6';
          }
        } else {
          if (dateStr < startDate) {
            startDate = dateStr;
            if (arrVal) arrVal.innerText = formatDateNice(startDate) + ' 2026';
          } else {
            endDate = dateStr;
            if (depVal) {
              depVal.innerText = formatDateNice(endDate) + ' 2026';
              depVal.style.opacity = '1';
            }
            setTimeout(function() { toggleCalendar(false); }, 350);
          }
        }

        updateCalendarHighlights();
        renderAllVenues();
      });
    });
  }

  function updateCalendarHighlights() {
    if (!calPopup) return;
    var dayButtons = calPopup.querySelectorAll('button[data-day]');
    dayButtons.forEach(function(btn) {
      var d = btn.getAttribute('data-day');
      var isPast = btn.hasAttribute('disabled') || btn.getAttribute('aria-disabled') === 'true';
      if (isPast) return;

      if (d === startDate || d === endDate) {
        btn.style.background = 'rgb(188, 111, 69)';
        btn.style.color = 'rgb(14, 18, 1)';
        btn.style.fontWeight = 'bold';
        btn.style.borderRadius = '2px';
      } else if (startDate && endDate && d > startDate && d < endDate) {
        btn.style.background = 'rgba(188, 111, 69, 0.25)';
        btn.style.color = 'rgb(255, 240, 202)';
        btn.style.fontWeight = 'normal';
        btn.style.borderRadius = '0';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'rgb(255, 240, 202)';
        btn.style.fontWeight = 'normal';
      }
    });
  }

  document.addEventListener('click', function(e) {
    if (calPopup && calPopup.style.display !== 'none') {
      if (!calPopup.contains(e.target) && !arrBtn.contains(e.target) && !depBtn.contains(e.target)) {
        calPopup.style.display = 'none';
      }
    }
  });

  renderAllVenues();
  initCalendarClicks();
})();
</script>`;

baseHtml = baseHtml.replace('</body>', `${controllerScript}\n</body>`);

// Write out to book/venue.html and book/apartment.html
fs.writeFileSync('book/venue.html', baseHtml, 'utf8');
fs.writeFileSync('book/apartment.html', baseHtml, 'utf8');
console.log('Successfully rebuilt book/venue.html and book/apartment.html without Framer bundle interference!');
