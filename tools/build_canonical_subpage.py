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

# Clean Facebook rolling spans: keep only the first 8 spans (F, a, c, e, b, o, o, k), remove LinkedIn spans
pattern_fb = r"(<span[^>]*data-rolling-label[^>]*><span[^>]*>Facebook</span>)([\s\S]*?)(</span><!--/\$-->)"
def clean_fb_spans(m):
    prefix = m.group(1)
    body = m.group(2)
    suffix = m.group(3)
    spans = re.findall(r"<span aria-hidden=\"true\"[\s\S]*?</span></span>", body)
    clean_body = "".join(spans[:8])
    return prefix + clean_body + suffix

canonical_footer = re.sub(pattern_fb, clean_fb_spans, canonical_footer)

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

/* --- 2. Casamomo Slot-Machine Elevation & Interaction System --- */
@keyframes grandWordElevate {{
  0% {{
    transform: translateY(400px) rotate(8deg);
  }}
  100% {{
    transform: translateY(0px) rotate(0deg);
  }}
}}

.grand-hero-word {{
  display: inline-block !important;
  transform-origin: 50% 100% !important;
  will-change: transform !important;
  opacity: 1 !important;
  transform: translateY(400px) rotate(8deg);
  animation: grandWordElevate 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}}

.grand-hero-word[data-word-idx="0"] {{
  animation-delay: 1.35s !important;
}}
.grand-hero-word[data-word-idx="1"] {{
  animation-delay: 1.45s !important;
}}
.grand-hero-word[data-word-idx="2"] {{
  animation-delay: 1.55s !important;
}}
.grand-hero-word[data-word-idx="3"] {{
  animation-delay: 1.65s !important;
}}
.grand-hero-word[data-word-idx="4"] {{
  animation-delay: 1.75s !important;
}}

body.grand-user-scrolled .grand-hero-word {{
  animation: none !important;
  transform: none !important;
}}

/* 2.1 Sticky Button (Check Availability): Transitions opacity 0 -> 1 at 1.2s matching Casamomo */
[data-framer-name="Sticky Button"],
.framer-1n8t7q3 {{
  opacity: 0.001 !important;
  pointer-events: none !important;
  transition: opacity 0.4s cubic-bezier(0.44, 0, 0.56, 1) 1.2s !important;
  will-change: opacity !important;
}}

body.grand-nav-revealed [data-framer-name="Sticky Button"],
body.grand-nav-revealed .framer-1n8t7q3,
body.grand-user-scrolled [data-framer-name="Sticky Button"],
body.grand-user-scrolled .framer-1n8t7q3 {{
  opacity: 1 !important;
  pointer-events: auto !important;
  transition: opacity 0.4s cubic-bezier(0.44, 0, 0.56, 1) !important;
}}

body.grand-footer-visible [data-framer-name="Sticky Button"],
body.grand-footer-visible .framer-1n8t7q3 {{
  opacity: 0 !important;
  pointer-events: none !important;
  transform: translateY(14px) !important;
}}

/* 2.2 Scroll Pill / Menu Title Reveal */
[data-framer-name="Sticky Header Text"] .framer-ajtkp9,
.framer-1s87mre .framer-ajtkp9 {{
  opacity: 0.001 !important;
  transform: translateY(10px) !important;
  transition: opacity 0.8s cubic-bezier(0.12, 0.23, 0.5, 1) 1.25s, transform 0.8s cubic-bezier(0.12, 0.23, 0.5, 1) 1.25s !important;
  will-change: transform, opacity !important;
}}

body.grand-nav-revealed [data-framer-name="Sticky Header Text"] .framer-ajtkp9,
body.grand-nav-revealed .framer-1s87mre .framer-ajtkp9,
body.grand-user-scrolled [data-framer-name="Sticky Header Text"] .framer-ajtkp9,
body.grand-user-scrolled .framer-1s87mre .framer-ajtkp9 {{
  opacity: 1 !important;
  transform: translateY(0) !important;
}}

/* 2.3 Navbar Reveal: Floats in at 1.6s */
.framer-1kcv8in,
[data-framer-name="Navbar Menu"] .framer-1kcv8in,
.framer-1t6aeyj-container,
[data-framer-name="Navbar Menu"] .framer-1t6aeyj-container,
.framer-gaygr9,
[data-framer-name="Navbar Menu"] .framer-gaygr9,
.framer-10dp641,
[data-framer-name="Navbar Menu"] .framer-10dp641,
.framer-p57yy4-container,
header [data-framer-name="Navbar Menu"],
.framer-1nw9de0-container nav,
.framer-gaeku5-container nav,
header [data-framer-name="Mobile Menu"],
.framer-1s5ig4a,
header [data-framer-name="Menu Button"] {{
  opacity: 0.001 !important;
  transform: translateY(10px) !important;
  transition: opacity 0.8s cubic-bezier(0.12, 0.23, 0.5, 1) 1.6s, transform 0.8s cubic-bezier(0.12, 0.23, 0.5, 1) 1.6s !important;
  will-change: transform, opacity !important;
  pointer-events: none !important;
}}

body.grand-nav-revealed .framer-1kcv8in,
body.grand-nav-revealed [data-framer-name="Navbar Menu"] .framer-1kcv8in,
body.grand-nav-revealed .framer-1t6aeyj-container,
body.grand-nav-revealed [data-framer-name="Navbar Menu"] .framer-1t6aeyj-container,
body.grand-nav-revealed .framer-gaygr9,
body.grand-nav-revealed [data-framer-name="Navbar Menu"] .framer-gaygr9,
body.grand-nav-revealed .framer-10dp641,
body.grand-nav-revealed [data-framer-name="Navbar Menu"] .framer-10dp641,
body.grand-nav-revealed .framer-p57yy4-container,
body.grand-nav-revealed header [data-framer-name="Navbar Menu"],
body.grand-nav-revealed .framer-1nw9de0-container nav,
body.grand-nav-revealed .framer-gaeku5-container nav,
body.grand-nav-revealed header [data-framer-name="Mobile Menu"],
body.grand-nav-revealed .framer-1s5ig4a,
body.grand-nav-revealed header [data-framer-name="Menu Button"],
body.grand-user-scrolled .framer-1kcv8in,
body.grand-user-scrolled [data-framer-name="Navbar Menu"] .framer-1kcv8in,
body.grand-user-scrolled .framer-1t6aeyj-container,
body.grand-user-scrolled [data-framer-name="Navbar Menu"] .framer-1t6aeyj-container,
body.grand-user-scrolled .framer-gaygr9,
body.grand-user-scrolled [data-framer-name="Navbar Menu"] .framer-gaygr9,
body.grand-user-scrolled .framer-10dp641,
body.grand-user-scrolled [data-framer-name="Navbar Menu"] .framer-10dp641,
body.grand-user-scrolled .framer-p57yy4-container,
body.grand-user-scrolled header [data-framer-name="Navbar Menu"],
body.grand-user-scrolled .framer-1nw9de0-container nav,
body.grand-user-scrolled .framer-gaeku5-container nav,
body.grand-user-scrolled header [data-framer-name="Mobile Menu"],
body.grand-user-scrolled .framer-1s5ig4a,
body.grand-user-scrolled header [data-framer-name="Menu Button"] {{
  opacity: 1 !important;
  transform: translateY(0) !important;
  pointer-events: auto !important;
  transition: opacity 0.8s cubic-bezier(0.12, 0.23, 0.5, 1), transform 0.8s cubic-bezier(0.12, 0.23, 0.5, 1) !important;
}}

/* --- 2.5 Desktop Navbar & Sticky Logo Parity (Full-width fixed header, sticky corner logo, parallel corner nav) --- */
@media (min-width: 810px) {{
  header.framer-1i47qog,
  header.framer-bg7hsc,
  header[data-framer-name="Navbar Wrapper"] {{
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 110px !important;
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    z-index: 1001 !important;
    transform: none !important;
    pointer-events: none !important;
  }}

  .framer-14ux6li-container,
  .framer-1q3kxxd-container {{
    position: relative !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    flex: 1 0 0px !important;
    width: auto !important;
    height: 100% !important;
    padding: 0 0 0 48px !important;
    box-sizing: border-box !important;
    pointer-events: auto !important;
  }}

  .framer-14ux6li-container .framer-QnCu0,
  .framer-1q3kxxd-container .framer-QnCu0,
  header [data-framer-name="Logo"] {{
    opacity: 1 !important;
    visibility: visible !important;
    display: flex !important;
    pointer-events: auto !important;
    transform: none !important;
    padding: 0 !important;
  }}

  .framer-14ux6li-container .framer-QnCu0 *,
  .framer-1q3kxxd-container .framer-QnCu0 * {{
    opacity: 1 !important;
    visibility: visible !important;
  }}

  .framer-gaeku5-container,
  .framer-1nw9de0-container {{
    position: relative !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    flex: 1 0 0px !important;
    width: auto !important;
    height: 100% !important;
    padding: 0 48px 0 0 !important;
    box-sizing: border-box !important;
    pointer-events: auto !important;
  }}

  .framer-gaeku5-container nav,
  .framer-1nw9de0-container nav {{
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 12px !important;
    width: auto !important;
  }}
}}

/* --- 3. Mobile Navbar & Menu Button Parity (Fixed 12px bounds, 61.4x30 button) --- */
@media (max-width: 809.98px) {{
  .framer-bg7hsc,
  .framer-1i47qog,
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

  body.casa-menu-open .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(2),
  body.casa-menu-open .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(2) span {{
    transform: translateY(-100%) !important;
  }}
  body.casa-menu-open .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3),
  body.casa-menu-open .framer-1s5ig4a [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3) span {{
    transform: translateY(0%) !important;
    color: #FFF0CA !important;
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
  body.casa-menu-open header [data-framer-name="Mobile Menu"],
  body.casa-menu-open .framer-1s5ig4a,
  body.casa-menu-open header [data-framer-name="Menu Button"] {{
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

/* --- 5. Gallery Image Containers Interactive Corner Morphing (Rounded entering -> Pointy on screen) --- */
.framer-jhveby-container > div,
[data-framer-name="Image"] > div,
[data-framer-name="Gallery"] .framer-18k7fzy,
[data-framer-name="Gallery"] [data-framer-name="Item"],
[data-framer-name="Gallery"] div[style*="overflow:hidden"] {{
  overflow: hidden !important;
  -webkit-mask-image: -webkit-radial-gradient(white, black) !important;
  will-change: border-radius, transform !important;
  transition: border-radius 0.12s ease-out !important;
}}
</style>'''

# 5. Controller Scripts (Menu Toggle + Parallax & Corner Morphing Engine)
locked_scripts = '''<script id="grand-nav-and-gallery-controller">
(function() {
  'use strict';

  // 1. Reveal navbar after 1.8s, or immediately on first user scroll
  var navTimer = setTimeout(function() {
    document.body.classList.add('grand-nav-revealed');
  }, 1800);

  var scrolledOnce = false;
  function handleFirstScroll() {
    if (!scrolledOnce && window.scrollY > 15) {
      scrolledOnce = true;
      clearTimeout(navTimer);
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
        var closeSpans = btn.querySelectorAll('[data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3), [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3) span');
        closeSpans.forEach(function(s) {
          s.style.setProperty('transform', 'translateY(0%)', 'important');
          s.style.setProperty('color', '#FFF0CA', 'important');
        });
        var menuSpans = btn.querySelectorAll('[data-rolling-label] > span[aria-hidden="true"]:nth-of-type(2), [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(2) span');
        menuSpans.forEach(function(s) {
          s.style.setProperty('transform', 'translateY(-100%)', 'important');
        });
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
        var closeSpans = btn.querySelectorAll('[data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3), [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(3) span');
        closeSpans.forEach(function(s) {
          s.style.setProperty('transform', 'translateY(100%)', 'important');
        });
        var menuSpans = btn.querySelectorAll('[data-rolling-label] > span[aria-hidden="true"]:nth-of-type(2), [data-rolling-label] > span[aria-hidden="true"]:nth-of-type(2) span');
        menuSpans.forEach(function(s) {
          s.style.setProperty('transform', 'translateY(0%)', 'important');
        });
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

  // 3. Smooth Gallery Parallax Curtain & Interactive Corner Morphing (translateY +8% to -8%, 44px -> 0px)
  function initGalleryParallax() {
    var items = document.querySelectorAll(
      '[data-framer-name="Gallery"] [data-framer-name="Item"], [data-framer-name="Item"], .framer-18k7fzy'
    );
    if (!items || items.length === 0) return;

    function onScroll() {
      var vh = window.innerHeight;
      var isMobile = window.innerWidth < 810;
      var maxRadius = isMobile ? 44 : 52;

      items.forEach(function(item) {
        var rect = item.getBoundingClientRect();
        if (rect.bottom >= -150 && rect.top <= vh + 150) {
          // A. Curtain Parallax (+8% entry to -8% exit)
          var progress = (vh - rect.top) / (vh + rect.height);
          progress = Math.max(0, Math.min(1, progress));
          var translateY = (8 - progress * 16);
          var wrap = item.querySelector('div[style*="will-change:transform"]') || item.querySelector('.framer-jhveby-container div[style*="translateY"]');
          if (wrap) {
            wrap.style.setProperty('transform', 'translateY(' + translateY.toFixed(2) + '%)', 'important');
          }

          // B. Interactive Corner Morphing (Rounded ONLY on entry -> Pointy when visible on screen -> Stays pointy on exit)
          var rad = 0;
          if (rect.top > vh * 0.40) {
            // Entering from bottom towards center
            var enterRatio = (rect.top - vh * 0.40) / (vh * 0.50);
            enterRatio = Math.max(0, Math.min(1, enterRatio));
            rad = Math.round(enterRatio * maxRadius);
          } else {
            // Once reached screen view and as it exits off the top: NEVER round off!
            rad = 0;
          }

          var targets = item.querySelectorAll('.framer-jhveby-container > div, [data-framer-name="Image"] > div, div[style*="overflow:hidden"]');
          targets.forEach(function(el) {
            el.style.setProperty('border-radius', rad + 'px', 'important');
          });
          item.style.setProperty('border-radius', rad + 'px', 'important');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  // 4. Footer Observer to toggle grand-footer-visible on body when footer is visible
  function initFooterObserver() {
    var footer = document.querySelector('footer.framer-18na9ah, footer');
    if (footer && window.IntersectionObserver) {
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            document.body.classList.add('grand-footer-visible');
          } else {
            document.body.classList.remove('grand-footer-visible');
          }
        });
      }, { threshold: 0.05 });
      obs.observe(footer);
    }
  }

  // 5. Accurate Location & Open in Maps overlap fade: ONLY dims when physically overlapping the floating navbar
  function initLocationOverlap() {
    function onLocScroll() {
      var navWrapper = document.querySelector('header[data-framer-name="Navbar Wrapper"], header');
      var navHeight = (navWrapper && navWrapper.offsetHeight > 0) ? navWrapper.offsetHeight : 110;
      var locH = Array.from(document.querySelectorAll('h2')).find(function(h) {
        return h.textContent.trim() === 'Location' && h.offsetParent !== null;
      });
      var btnWrap = document.querySelector('a.dark-btn, [data-framer-name="Dark"]');
      
      if (locH) {
        var rH = locH.getBoundingClientRect();
        var hOverlaps = (rH.top < navHeight && rH.bottom > 15);
        locH.style.opacity = hOverlaps ? '0.5' : '1';
      }
      
      if (btnWrap) {
        var rB = btnWrap.getBoundingClientRect();
        var bOverlaps = (rB.top < navHeight && rB.bottom > 15);
        btnWrap.style.opacity = bOverlaps ? '0.5' : '1';
      }
    }
    window.addEventListener('scroll', onLocScroll, { passive: true });
    window.addEventListener('resize', onLocScroll, { passive: true });
    setInterval(onLocScroll, 100);
    onLocScroll();
  }

  function initAll() {
    initMobileMenu();
    initGalleryParallax();
    initFooterObserver();
    initLocationOverlap();
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

# 5.5 Bulletproof Logo & Navbar Dynamic Contrast Switcher (Light text on Dark bg, Dark text on Light bg)
locked_contrast_css = '''<style id="grand-contrast-switcher-style">
:root {
  --grand-logo-color: #FFF0CA;
}

/* Dark Theme (over Light/Beige/Cream background: Pearl Beige #F3E8CE / #FFF0CA) */
html.logo-dark-text,
html[data-logo-theme="dark"],
body.is-light-theme,
body[data-theme="light"],
[data-theme="light"] {
  --grand-logo-color: #1A241E;
}

html.logo-dark-text [data-framer-name="Logo"] path,
html.logo-dark-text #svg-1334768056_3843 path,
html[data-logo-theme="dark"] [data-framer-name="Logo"] path,
html[data-logo-theme="dark"] #svg-1334768056_3843 path,
html[data-logo-theme="dark"] header svg path,
body.is-light-theme header [data-framer-name="Logo"] path,
body.is-light-theme #svg-1334768056_3843 path,
[data-framer-name="Logo"].logo-dark-text path {
  fill: #1A241E !important;
  transition: fill 0.25s ease-in-out !important;
}

/* Light Theme (over Dark background: Dark Green #0E1201 / #1A241E) */
html.logo-light-text [data-framer-name="Logo"] path,
html.logo-light-text #svg-1334768056_3843 path,
html:not([data-logo-theme="dark"]) [data-framer-name="Logo"] path,
html:not([data-logo-theme="dark"]) #svg-1334768056_3843 path,
[data-framer-name="Logo"].logo-light-text path {
  fill: #FFF0CA !important;
  transition: fill 0.25s ease-in-out !important;
}

/* Navbar Links & Buttons Adaptation on Light Background */
html.logo-dark-text header nav [data-rolling-label],
html[data-logo-theme="dark"] header nav [data-rolling-label],
body.is-light-theme header nav [data-rolling-label] {
  color: #1A241E !important;
  transition: color 0.25s ease-in-out !important;
}

html.logo-dark-text header nav .framer-1kcv8in,
html[data-logo-theme="dark"] header nav .framer-1kcv8in,
body.is-light-theme header nav .framer-1kcv8in {
  background-color: rgba(26, 36, 30, 0.08) !important;
  transition: background-color 0.25s ease-in-out !important;
}

html.logo-dark-text header .framer-1t6aeyj-container a,
html[data-logo-theme="dark"] header .framer-1t6aeyj-container a,
body.is-light-theme header .framer-1t6aeyj-container a {
  background-color: #1A241E !important;
  color: #FFF0CA !important;
  transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out !important;
}

html.logo-dark-text header .framer-1t6aeyj-container a *,
html[data-logo-theme="dark"] header .framer-1t6aeyj-container a *,
body.is-light-theme header .framer-1t6aeyj-container a * {
  color: #FFF0CA !important;
  fill: #FFF0CA !important;
}

/* Mobile Menu Button on Light Background */
html.logo-dark-text .framer-1s5ig4a,
html[data-logo-theme="dark"] .framer-1s5ig4a,
body.is-light-theme .framer-1s5ig4a {
  background-color: rgba(26, 36, 30, 0.08) !important;
}

html.logo-dark-text .framer-1s5ig4a [data-rolling-label],
html[data-logo-theme="dark"] .framer-1s5ig4a [data-rolling-label],
body.is-light-theme .framer-1s5ig4a [data-rolling-label] {
  color: #1A241E !important;
}
</style>'''

locked_contrast_script = '''<script id="grand-contrast-switcher-script">
(function(){
  var lastIsLight = null;
  function updateLogoColorClass(){
    var isMobile = window.innerWidth <= 810;
    var x = isMobile ? 50 : 110;
    var y = isMobile ? 24 : 50;
    var isLight = false;

    // Signal 1: Framer Body theme class
    if (document.body.classList.contains('is-light-theme') || 
        document.body.getAttribute('data-theme') === 'light' ||
        document.documentElement.getAttribute('data-theme') === 'light') {
      isLight = true;
    }

    // Signal 2: Check full-screen Color Change background layer
    if (!isLight) {
      var colorChangeV1 = document.querySelector('[data-framer-name="Color Change"] [data-framer-name="Variant 1"], [name="Color Change"] > div');
      if (colorChangeV1) {
        var v1Bg = window.getComputedStyle(colorChangeV1).backgroundColor;
        var pV1 = v1Bg ? v1Bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/) : null;
        if (pV1) {
          var v1Lum = 0.299 * (+pV1[1]) + 0.587 * (+pV1[2]) + 0.114 * (+pV1[3]);
          if (v1Lum > 140) isLight = true;
        }
      }
    }

    // Signal 3: Check elements directly under the logo point
    if (!isLight) {
      var els = document.elementsFromPoint(x, y) || [];
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.closest && el.closest('header, [data-framer-name="Navbar Wrapper"], [data-framer-name="Mobile Navbar"], [data-framer-name="Logo"]')) continue;
        if (el.matches && el.matches('[data-theme="light"], .light-section, [data-bg="light"]') || 
           (el.closest && el.closest('[data-theme="light"], .light-section, [data-bg="light"]'))) {
          isLight = true;
          break;
        }
        var bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          var p = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
          if (p) {
            if (p[4] !== undefined && parseFloat(p[4]) < 0.2) continue;
            var lum = 0.299 * (+p[1]) + 0.587 * (+p[2]) + 0.114 * (+p[3]);
            if (lum > 140) {
              isLight = true;
              break;
            } else if (lum < 110) {
              isLight = false;
              break;
            }
          }
        }
      }
    }

    // Signal 4: Fallback to body / html background
    if (!isLight) {
      var bBg = window.getComputedStyle(document.body).backgroundColor;
      var hBg = window.getComputedStyle(document.documentElement).backgroundColor;
      var effBg = (bBg && bBg !== 'rgba(0, 0, 0, 0)' && bBg !== 'transparent') ? bBg : hBg;
      if (effBg) {
        var pb = effBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (pb) {
          var bLum = 0.299 * (+pb[1]) + 0.587 * (+pb[2]) + 0.114 * (+pb[3]);
          if (bLum > 140) isLight = true;
        }
      }
    }

    // Signal 5: Fallback to intersecting light sections (Paragraph / Location)
    if (!isLight) {
      var lightSecs = document.querySelectorAll('section.framer-179pke1, section.framer-t0nwrn, #bigtext-1, [data-framer-name="Location"]');
      for (var s = 0; s < lightSecs.length; s++) {
        var r = lightSecs[s].getBoundingClientRect();
        if (r.top <= y + 20 && r.bottom >= y - 20) {
          isLight = true;
          break;
        }
      }
    }

    if (isLight !== lastIsLight) {
      lastIsLight = isLight;
      var root = document.documentElement;
      var logoEls = document.querySelectorAll('[data-framer-name="Logo"], #svg-1334768056_3843');
      if (isLight) {
        root.setAttribute('data-logo-theme', 'dark');
        root.classList.add('logo-dark-text');
        root.classList.remove('logo-light-text');
        root.style.setProperty('--grand-logo-color', '#1A241E');
        logoEls.forEach(function(l){
          l.classList.add('logo-dark-text');
          l.classList.remove('logo-light-text');
          var p = l.querySelector('path');
          if (p) p.style.fill = '#1A241E';
        });
      } else {
        root.removeAttribute('data-logo-theme');
        root.classList.add('logo-light-text');
        root.classList.remove('logo-dark-text');
        root.style.setProperty('--grand-logo-color', '#FFF0CA');
        logoEls.forEach(function(l){
          l.classList.add('logo-light-text');
          l.classList.remove('logo-dark-text');
          var p = l.querySelector('path');
          if (p) p.style.fill = '#FFF0CA';
        });
      }
    }
  }

  window.addEventListener('scroll', updateLogoColorClass, { passive: true });
  window.addEventListener('resize', updateLogoColorClass, { passive: true });
  setInterval(updateLogoColorClass, 100);

  if (window.__lenis) {
    try { window.__lenis.on('scroll', updateLogoColorClass); } catch(e){}
  }

  var obs = new MutationObserver(updateLogoColorClass);
  obs.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateLogoColorClass);
  } else {
    updateLogoColorClass();
  }
})();
</script>'''

# 6. Apply Canonical Header & Footer System across all site pages
def apply_canonical_system(filepath):
    print(f'Applying canonical system to {filepath}...')
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find headers slice
    idx_desk = html.find('<div class="ssr-variant hidden-u6hac7"><header class="framer-1i47qog"')
    if idx_desk == -1:
        idx_desk = html.find('<div class="ssr-variant hidden-o5o8qi hidden-u6hac7"><header class="framer-bg7hsc"')
    if idx_desk == -1:
        idx_desk = html.find('<div class="ssr-variant hidden-o5o8qi"><header class="framer-bg7hsc"')

    idx_mob = html.find('<div class="ssr-variant hidden-1azqig2 hidden-1l94oxb"><header class="framer-1i47qog"', idx_desk)
    if idx_mob == -1:
        idx_mob = html.find('<div class="ssr-variant hidden-72rtr7 hidden-p8zd8m hidden-1azqig2 hidden-1l94oxb"><header class="framer-bg7hsc"', idx_desk)
    if idx_mob == -1:
        idx_mob = html.find('<div class="ssr-variant hidden-72rtr7 hidden-p8zd8m"><header class="framer-bg7hsc"', idx_desk)

    idx_end = html.find('</header></div>', idx_mob) + len('</header></div>')

    if idx_desk != -1 and idx_mob != -1 and idx_end != -1:
        html = html[:idx_desk] + header_desk + '\n' + header_mob + html[idx_end:]

    # Find footer slice
    idx_footer_start = html.find('<footer class="framer-18na9ah"')
    idx_footer_end = html.find('</footer>', idx_footer_start) + len('</footer>')
    if idx_footer_start != -1 and idx_footer_end != -1:
        html = html[:idx_footer_start] + canonical_footer + html[idx_footer_end:]

    # Clean old styles/scripts and inject locked CSS + scripts + contrast switcher
    html = re.sub(r'<style id="grand-contrast-switcher-style">[\s\S]*?<\/style>', '', html)
    html = re.sub(r'<script id="grand-contrast-switcher-script">[\s\S]*?<\/script>', '', html)
    html = re.sub(r'<style id="casamomo-menu-button-fix">[\s\S]*?<\/style>', '', html)
    html = re.sub(r'<script id="grand-mobile-menu-controller">[\s\S]*?<\/script>', '', html)
    html = re.sub(r'<style id="grand-locked-header-and-gallery-css">[\s\S]*?<\/style>', '', html)
    html = re.sub(r'<script id="grand-nav-and-gallery-controller">[\s\S]*?<\/script>', '', html)

    # Ensure SVG path has var(--grand-logo-color, ...)
    html = re.sub(
        r'(<svg[^>]*id="svg-1334768056_3843"[^>]*><path[^>]*fill=")[^"]*(")',
        r'\g<1>var(--grand-logo-color, var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(255, 240, 202)))\g<2>',
        html
    )

    head_inject = locked_contrast_css + '\n' + locked_contrast_script + '\n' + locked_css + '\n' + locked_scripts + '\n'
    html = html.replace('</head>', head_inject + '</head>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  Successfully updated {filepath}')

apply_canonical_system('venues/open-earth-lawn.html')
apply_canonical_system('about.html')
apply_canonical_system('contact.html')
apply_canonical_system('venues.html')

