import re
import os

print('=== Building Canonical Subpage System ===')

with open('index.html', 'r', encoding='utf-8') as f:
    h_home = f.read()

with open('venues/open-earth-lawn.html', 'r', encoding='utf-8') as f:
    h_sub = f.read()

# 1. Extract exact Header 0 (desktop) and Header 1 (mobile) slices from index.html
idx_desk_home = h_home.find('<div class="ssr-variant hidden-o5o8qi"><header class="framer-bg7hsc"')
idx_mob_home = h_home.find('<div class="ssr-variant hidden-72rtr7 hidden-p8zd8m"><header class="framer-bg7hsc"')
idx_end_home = h_home.find('</header></div>', idx_mob_home) + len('</header></div>')

if idx_desk_home == -1 or idx_mob_home == -1 or idx_end_home == -1:
    raise Exception('Failed to find exact header slices in index.html')

header_desk = h_home[idx_desk_home:idx_mob_home]
header_mob = h_home[idx_mob_home:idx_end_home]
print(f'Extracted desktop header ({len(header_desk)} bytes) and mobile header ({len(header_mob)} bytes)')

# Replace relative links with root links
header_desk = re.sub(r'href="\./venues"', 'href="/venues"', header_desk)
header_desk = re.sub(r'href="\./about"', 'href="/about"', header_desk)
header_desk = re.sub(r'href="\./contact"', 'href="/contact"', header_desk)
header_desk = re.sub(r'href="\./book"', 'href="/contact"', header_desk)
header_desk = re.sub(r'href="\./"', 'href="/"', header_desk)

header_mob = re.sub(r'href="\./venues"', 'href="/venues"', header_mob)
header_mob = re.sub(r'href="\./about"', 'href="/about"', header_mob)
header_mob = re.sub(r'href="\./contact"', 'href="/contact"', header_mob)
header_mob = re.sub(r'href="\./book"', 'href="/contact"', header_mob)
header_mob = re.sub(r'href="\./"', 'href="/"', header_mob)

# Add subpage breakpoint classes so they show/hide on both desktop and mobile media queries
header_desk = header_desk.replace('class="ssr-variant hidden-o5o8qi"', 'class="ssr-variant hidden-o5o8qi hidden-u6hac7"')
header_mob = header_mob.replace('class="ssr-variant hidden-72rtr7 hidden-p8zd8m"', 'class="ssr-variant hidden-72rtr7 hidden-p8zd8m hidden-1azqig2 hidden-1l94oxb"')

# In mobile header, ensure mobile logo wordmark has opacity: 1
header_mob = re.sub(r'(<a as="a" class="framer-4iomze[^"]*"[^>]*style="[^"]*opacity:)\s*0', r'\g<1>1', header_mob)

# 2. Extract exact Footer slice from index.html (108,228 bytes)
idx_home_footer_start = h_home.find('<footer class="framer-18na9ah"')
idx_home_footer_end = h_home.find('</footer>', idx_home_footer_start) + len('</footer>')
canonical_footer = h_home[idx_home_footer_start:idx_home_footer_end]
print(f'Extracted canonical footer ({len(canonical_footer)} bytes)')

# Ensure root links in footer
canonical_footer = re.sub(r'href="\./venues"', 'href="/venues"', canonical_footer)
canonical_footer = re.sub(r'href="\./about"', 'href="/about"', canonical_footer)
canonical_footer = re.sub(r'href="\./contact"', 'href="/contact"', canonical_footer)
canonical_footer = re.sub(r'href="\./"', 'href="/"', canonical_footer)

# 3. Extract CSS rules from index.html for header
css_m = re.search(r'<style data-framer-css-ssr-minified[^>]*>([\s\S]*?)<\/style>', h_home)
css = css_m.group(1)

header_classes = [
    'framer-bg7hsc', 'framer-1q3kxxd', 'framer-1nw9de0', 'framer-uYnNg', 'framer-1dc0xew',
    'framer-1kcv8in', 'framer-5m8qjw', 'framer-p8bmaz', 'framer-1tpngbn', 'framer-ypCW0',
    'framer-zl1g6k', 'framer-w9fus0', 'framer-1jbrocx', 'framer-14llan9', 'framer-1yt0oai',
    'framer-1kxerdz', 'framer-1t6aeyj', 'framer-vO7O2', 'framer-9t14z3', 'framer-v-wf9qrl',
    'framer-1swxj4p', 'framer-10dp641', 'framer-nbr5p7', 'framer-1ko9uiy', 'framer-14b9qd0',
    'framer-m12jrg', 'framer-c5802p', 'framer-tNLhi', 'framer-up9a4a', 'framer-p57yy4',
    'framer-RDRJk', 'framer-6uh8lh', 'framer-1763xqs', 'framer-1yau3vx', 'framer-1px75a6',
    'framer-fx9txd', 'framer-1taqf0l', 'framer-1gyxj21', 'framer-6ffj8', 'framer-14hjx1z',
    'framer-1ge2xbm', 'framer-1fslfdg', 'framer-188zsml', 'framer-1s5ig4a', 'framer-1clpaht',
    'framer-4iomze', 'framer-abt6p4', 'framer-1ngqbpf', 'framer-19qr6g5', 'framer-gyzc1k',
    'framer-QnCu0', 'framer-umsvbj', 'framer-v-b08zsq', 'framer-v-1dc0xew', 'framer-v-up9a4a',
    'framer-v-6uh8lh', 'framer-v-zl1g6k'
]

matched_rules = []
pos = 0
while pos < len(css):
    if css[pos:pos+6] == '@media':
        brace1 = css.find('{', pos)
        if brace1 == -1: break
        depth = 1
        i = brace1 + 1
        while i < len(css) and depth > 0:
            if css[i] == '{': depth += 1
            elif css[i] == '}': depth -= 1
            i += 1
        media_block = css[pos:i]
        if any(cls in media_block for cls in header_classes):
            matched_rules.append(media_block)
        pos = i
    else:
        semi_or_brace = css.find('{', pos)
        if semi_or_brace == -1: break
        rule_end = css.find('}', semi_or_brace)
        if rule_end == -1: break
        rule = css[pos:rule_end+1]
        if any(cls in rule for cls in header_classes):
            matched_rules.append(rule)
        pos = rule_end + 1

extracted_header_css = '\n'.join(matched_rules)
print(f'Extracted {len(matched_rules)} CSS rules ({len(extracted_header_css)} bytes) for header')

# 4. Construct Locked CSS Block
locked_css = f'''<style id="grand-locked-header-and-gallery-css">
/* --- 1. Extracted Base Header CSS from index.html --- */
{extracted_header_css}

/* --- 2. Gradual Navbar Reveal on Page Load (4s Delay, 1s Float-Up matching Casa Momo & Home) --- */
.framer-1kcv8in,
[data-framer-name="Navbar Menu"] .framer-1kcv8in {{
  opacity: 0.001 !important;
  transform: translateY(10px) !important;
  will-change: transform, opacity !important;
  animation: grandNavReveal 1s cubic-bezier(0.12, 0.23, 0.5, 1) 4s forwards !important;
}}

.framer-1t6aeyj-container,
[data-framer-name="Navbar Menu"] .framer-1t6aeyj-container {{
  opacity: 0.001 !important;
  transform: translateY(10px) !important;
  will-change: transform, opacity !important;
  animation: grandNavReveal 1s cubic-bezier(0.12, 0.23, 0.5, 1) 4.1s forwards !important;
}}

.framer-p57yy4-container,
header [data-framer-name="Mobile Menu"] {{
  opacity: 0.001 !important;
  transform: translateY(10px) !important;
  will-change: transform, opacity !important;
  animation: grandMobileMenuReveal 1s cubic-bezier(0.12, 0.23, 0.5, 1) 4s forwards !important;
}}

@keyframes grandNavReveal {{
  0% {{
    opacity: 0.001;
    transform: translateY(10px);
  }}
  100% {{
    opacity: 1;
    transform: translateY(0);
  }}
}}

@keyframes grandMobileMenuReveal {{
  0% {{
    opacity: 0.001;
    transform: translateY(10px);
  }}
  100% {{
    opacity: 1;
    transform: translateY(0);
  }}
}}

/* Immediately reveal navbar on user scroll if before 4s */
body.grand-user-scrolled .framer-1kcv8in,
body.grand-user-scrolled .framer-1t6aeyj-container,
body.grand-user-scrolled .framer-p57yy4-container,
body.grand-user-scrolled header [data-framer-name="Mobile Menu"] {{
  animation: none !important;
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: opacity 0.5s ease-out, transform 0.5s ease-out !important;
}}

/* --- 3. Mobile Navbar & Menu Button Parity (Fixed 12px bounds, 61.4x30 button) --- */
@media (max-width: 809.98px) {{
  .framer-bg7hsc,
  header[data-framer-name="Navbar Wrapper"] {{
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 60px !important;
    z-index: 1002 !important;
    pointer-events: none !important;
    transform: none !important;
    display: block !important;
  }}

  header [data-framer-name="Mobile Navbar"],
  header .framer-tNLhi {{
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 60px !important;
    z-index: 1002 !important;
    pointer-events: none !important;
  }}

  header [data-framer-name="Mobile Navbar"] [data-framer-name="Logo"],
  header .framer-4iomze {{
    position: fixed !important;
    top: 16px !important;
    left: 12px !important;
    width: 160px !important;
    height: 20px !important;
    aspect-ratio: 8 / 1 !important;
    display: block !important;
    opacity: 1 !important;
    z-index: 10000 !important;
    pointer-events: auto !important;
  }}

  header .framer-4iomze img {{
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    display: block !important;
  }}

  .framer-1s5ig4a,
  header [data-framer-name="Menu Button"] {{
    width: 61.4px !important;
    min-width: 61.4px !important;
    max-width: 61.4px !important;
    height: 30px !important;
    min-height: 30px !important;
    max-height: 30px !important;
    padding: 7px 12px 8px !important;
    position: fixed !important;
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
    z-index: 10000 !important;
    pointer-events: auto !important;
    user-select: none !important;
  }}

  .framer-1s5ig4a [data-rolling-label] {{
    display: inline-grid !important;
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr !important;
    width: 38px !important;
    height: 15px !important;
    line-height: 15px !important;
    font-size: 15px !important;
    justify-items: center !important;
    align-items: center !important;
    text-align: center !important;
    overflow: hidden !important;
    position: relative !important;
    margin: 0 !important;
    pointer-events: none !important;
  }}

  .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"] {{
    grid-area: 1 / 1 !important;
    grid-column: 1 !important;
    grid-row: 1 !important;
    display: inline-block !important;
    text-align: center !important;
    white-space: pre !important;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: transform !important;
  }}

  .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(2) {{
    transform: translateY(0%) !important;
  }}
  .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3) {{
    transform: translateY(100%) !important;
  }}

  body.casa-menu-open .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(2) {{
    transform: translateY(-100%) !important;
  }}
  body.casa-menu-open .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3) {{
    transform: translateY(0%) !important;
  }}

  /* --- 4. Mobile Menu Overlay & Staggered Link Reveal --- */
  /* Suppress desktop header overlay completely */
  .hidden-o5o8qi .framer-1763xqs,
  .hidden-u6hac7 .framer-1763xqs,
  .hidden-o5o8qi [data-framer-name="Menu Overlay"],
  .hidden-u6hac7 [data-framer-name="Menu Overlay"] {{
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }}

  .framer-1763xqs,
  [data-framer-name="Menu Overlay"] {{
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background-color: rgb(14, 18, 1) !important;
    z-index: 9999 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: flex-start !important;
    padding: 0 32px !important;
    box-sizing: border-box !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.45s !important;
    will-change: opacity, visibility !important;
  }}

  body.casa-menu-open .framer-1763xqs,
  body.casa-menu-open [data-framer-name="Menu Overlay"] {{
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
  }}

  body.casa-menu-open .framer-p57yy4-container,
  body.casa-menu-open header [data-framer-name="Mobile Menu"] {{
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }}

  .framer-1763xqs .framer-1yau3vx,
  [data-framer-name="Menu Overlay"] [data-framer-name="Links"] {{
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    width: 100% !important;
    height: auto !important;
    padding: 0 !important;
    margin: 0 !important;
  }}

  .framer-1763xqs .framer-1yau3vx a,
  [data-framer-name="Menu Overlay"] a {{
    font-family: "Lay Grotesk Regular", "Lay Grotesk Regular Placeholder", sans-serif !important;
    font-size: 36px !important;
    line-height: 1.2em !important;
    letter-spacing: -0.02em !important;
    color: #FFF0CA !important;
    text-decoration: none !important;
    display: block !important;
    cursor: pointer !important;
    opacity: 0 !important;
    transform: translateY(28px) !important;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: opacity, transform !important;
  }}

  body.casa-menu-open .framer-1763xqs .framer-1yau3vx a,
  body.casa-menu-open [data-framer-name="Menu Overlay"] a {{
    opacity: 1 !important;
    transform: translateY(0) !important;
  }}

  /* Staggered Delay for the 4 links matching Casa Momo (0ms, 80ms, 160ms, 240ms) */
  body.casa-menu-open .framer-1763xqs .framer-1yau3vx a:nth-child(1),
  body.casa-menu-open [data-framer-name="Menu Overlay"] a:nth-child(1) {{
    transition-delay: 0ms !important;
  }}
  body.casa-menu-open .framer-1763xqs .framer-1yau3vx a:nth-child(2),
  body.casa-menu-open [data-framer-name="Menu Overlay"] a:nth-child(2) {{
    transition-delay: 80ms !important;
  }}
  body.casa-menu-open .framer-1763xqs .framer-1yau3vx a:nth-child(3),
  body.casa-menu-open [data-framer-name="Menu Overlay"] a:nth-child(3) {{
    transition-delay: 160ms !important;
  }}
  body.casa-menu-open .framer-1763xqs .framer-1yau3vx a:nth-child(4),
  body.casa-menu-open [data-framer-name="Menu Overlay"] a:nth-child(4) {{
    transition-delay: 240ms !important;
  }}

  .framer-1763xqs a *,
  [data-framer-name="Menu Overlay"] a * {{
    color: #FFF0CA !important;
  }}
}}

/* --- 5. Gallery Image Containers Rounded Edges (Casa Momo Parity: 20px Mobile, 28px Desktop) --- */
.framer-jhveby-container > div,
[data-framer-name="Image"] > div,
[data-framer-name="Gallery"] .framer-18k7fzy,
[data-framer-name="Gallery"] [data-framer-name="Item"],
[data-framer-name="Gallery"] div[style*="overflow:hidden"] {{
  border-radius: 20px !important;
  overflow: hidden !important;
  -webkit-mask-image: -webkit-radial-gradient(white, black) !important;
}}

@media (min-width: 810px) {{
  .framer-jhveby-container > div,
  [data-framer-name="Image"] > div,
  [data-framer-name="Gallery"] .framer-18k7fzy,
  [data-framer-name="Gallery"] [data-framer-name="Item"],
  [data-framer-name="Gallery"] div[style*="overflow:hidden"] {{
    border-radius: 28px !important;
  }}
}}
</style>'''

# 5. Controller Scripts (Menu Toggle + Parallax Scroll Engine)
locked_scripts = '''<script id="grand-nav-and-gallery-controller">
(function() {
  'use strict';

  // 1. Reveal navbar on first scroll if before 4s
  var scrolledOnce = false;
  function handleFirstScroll() {
    if (!scrolledOnce && window.scrollY > 15) {
      scrolledOnce = true;
      document.body.classList.add('grand-user-scrolled');
    }
  }
  window.addEventListener('scroll', handleFirstScroll, { passive: true });

  // 2. Mobile Menu Controller
  function initMobileMenu() {
    var menuBtns = document.querySelectorAll('.framer-1s5ig4a, [data-framer-name="Menu Button"]');
    var overlays = document.querySelectorAll('.framer-1763xqs, [data-framer-name="Menu Overlay"]');
    var rdrElements = document.querySelectorAll('.framer-RDRJk');
    if (!menuBtns || menuBtns.length === 0) return;

    function openMenu() {
      document.body.classList.add('casa-menu-open');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      rdrElements.forEach(function(rdr) {
        rdr.classList.remove('framer-v-6uh8lh');
        rdr.classList.add('framer-v-n5eu9c');
      });
      menuBtns.forEach(function(btn) {
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Close Menu');
      });
    }

    function closeMenu() {
      document.body.classList.remove('casa-menu-open');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      rdrElements.forEach(function(rdr) {
        rdr.classList.remove('framer-v-n5eu9c');
        rdr.classList.add('framer-v-6uh8lh');
      });
      menuBtns.forEach(function(btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open Menu');
      });
    }

    function toggleMenu(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      var isOpen = document.body.classList.contains('casa-menu-open');
      if (isOpen) { closeMenu(); } else { openMenu(); }
    }

    menuBtns.forEach(function(btn) {
      if (btn.getAttribute('data-menu-bound') === 'true') return;
      btn.setAttribute('data-menu-bound', 'true');
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', toggleMenu);
    });

    overlays.forEach(function(overlay) {
      var links = overlay.querySelectorAll('a');
      links.forEach(function(a) {
        a.addEventListener('click', function() { closeMenu(); });
      });
    });

    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.body.classList.contains('casa-menu-open')) {
        closeMenu();
      }
    });
  }

  // 3. Smooth Gallery Parallax Curtain Scroll Engine (translateY +8% to -8%)
  function initGalleryParallax() {
    var items = document.querySelectorAll(
      '[data-framer-name="Gallery"] [data-framer-name="Item"], [data-framer-name="Item"], .framer-18k7fzy'
    );
    if (!items || items.length === 0) return;

    function onScroll() {
      var vh = window.innerHeight;
      items.forEach(function(item) {
        var rect = item.getBoundingClientRect();
        if (rect.bottom >= -150 && rect.top <= vh + 150) {
          var progress = (vh - rect.top) / (vh + rect.height);
          progress = Math.max(0, Math.min(1, progress));
          // translateY: +8% (bottom entry) to -8% (top exit)
          var translateY = (8 - progress * 16);
          var wrap = item.querySelector('div[style*="will-change:transform"]') || item.querySelector('.framer-jhveby-container div[style*="translateY"]');
          if (wrap) {
            wrap.style.setProperty('transform', 'translateY(' + translateY.toFixed(2) + '%)', 'important');
          }
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  function initAll() {
    initMobileMenu();
    initGalleryParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
  setTimeout(initAll, 250);
  setTimeout(initAll, 1000);
})();
</script>'''

# 6. Apply exact replacement to venues/open-earth-lawn.html
# Find exact subpage headers slice
idx_desk_sub = h_sub.find('<div class="ssr-variant hidden-u6hac7"><header class="framer-1i47qog"')
if idx_desk_sub == -1:
    idx_desk_sub = h_sub.find('<div class="ssr-variant hidden-o5o8qi hidden-u6hac7"><header class="framer-bg7hsc"')

idx_mob_sub = h_sub.find('<div class="ssr-variant hidden-1azqig2 hidden-1l94oxb"><header class="framer-1i47qog"', idx_desk_sub)
if idx_mob_sub == -1:
    idx_mob_sub = h_sub.find('<div class="ssr-variant hidden-72rtr7 hidden-p8zd8m hidden-1azqig2 hidden-1l94oxb"><header class="framer-bg7hsc"', idx_desk_sub)

idx_end_sub = h_sub.find('</header></div>', idx_mob_sub) + len('</header></div>')

print(f'Replacing subpage headers slice from {idx_desk_sub} to {idx_end_sub} ({idx_end_sub - idx_desk_sub} bytes)...')
h_sub_headers_replaced = h_sub[:idx_desk_sub] + header_desk + '\n' + header_mob + h_sub[idx_end_sub:]

# Find exact subpage footer slice
idx_footer_start = h_sub_headers_replaced.find('<footer class="framer-18na9ah"')
idx_footer_end = h_sub_headers_replaced.find('</footer>', idx_footer_start) + len('</footer>')
print(f'Replacing subpage footer slice from {idx_footer_start} to {idx_footer_end} ({idx_footer_end - idx_footer_start} bytes)...')
h_sub_footer_replaced = h_sub_headers_replaced[:idx_footer_start] + canonical_footer + h_sub_headers_replaced[idx_footer_end:]

# Clean old styles/scripts and inject locked CSS + scripts
clean_html = re.sub(r'<style id="casamomo-menu-button-fix">[\s\S]*?<\/style>', '', h_sub_footer_replaced)
clean_html = re.sub(r'<script id="grand-mobile-menu-controller">[\s\S]*?<\/script>', '', clean_html)
clean_html = re.sub(r'<style id="grand-locked-header-and-gallery-css">[\s\S]*?<\/style>', '', clean_html)
clean_html = re.sub(r'<script id="grand-nav-and-gallery-controller">[\s\S]*?<\/script>', '', clean_html)

clean_html = clean_html.replace('</head>', locked_css + '\n' + locked_scripts + '\n</head>')

with open('venues/open-earth-lawn.html', 'w', encoding='utf-8') as f:
    f.write(clean_html)

print('Successfully created master template venues/open-earth-lawn.html!')
