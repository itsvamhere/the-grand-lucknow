import fs from 'fs';

const liveHomeFooter = fs.readFileSync('tools/live_home_footer.html', 'utf8');
const subHtmlPath = 'venues/open-earth-lawn.html';
let subHtml = fs.readFileSync(subHtmlPath, 'utf8');

console.log('1. REPLACING SUBPAGE FOOTER WITH EXACT LIVE HOME PAGE FOOTER');
const subFStart = subHtml.indexOf('<footer');
const subFEnd = subHtml.indexOf('</footer>', subFStart) + 9;
subHtml = subHtml.slice(0, subFStart) + liveHomeFooter + subHtml.slice(subFEnd);

console.log('2. USING AUTHENTIC VENUE PHOTO (/images/card_1_open_earth.webp) IN ALL 6 PICTURES');
// Replace all 6 gallery / hero stock images with the authentic venue photo
subHtml = subHtml.replace(
  /src="[^"]*?(?:open_earth_lawn_\d\.webp|the_grand_open_earth_lawn_hero\.jpg)[^"]*"/g,
  'src="/images/card_1_open_earth.webp"'
);
subHtml = subHtml.replace(
  /srcset="[^"]*?(?:open_earth_lawn_\d\.webp|the_grand_open_earth_lawn_hero\.jpg)[^"]*"/g,
  'srcset="/images/card_1_open_earth.webp 1500w"'
);

console.log('3. ADDING SEAMLESS TICKER ANIMATION SCRIPT TO MATCH HOME PAGE');
// Ensure the ticker ul continuously animates translateX smoothly like on home page
const tickerMotionScript = `
<script id="grand-footer-ticker-engine">
(function() {
  function startTicker() {
    var ul = document.querySelector('[data-framer-name="Footer Logo"] ul');
    if (!ul) return;
    var items = ul.querySelectorAll('li');
    if (!items || items.length === 0) return;
    
    // Ensure we have enough items for seamless infinite wrap
    if (ul.children.length < 4) {
      ul.appendChild(items[0].cloneNode(true));
      if (items.length > 1) {
        ul.appendChild(items[1].cloneNode(true));
      } else {
        ul.appendChild(items[0].cloneNode(true));
      }
    }
    
    var offset = 0;
    var speed = 1.0; // px per frame
    var firstLi = ul.querySelector('li');
    var itemWidth = (firstLi ? firstLi.offsetWidth : 2148) + 162;
    
    function animate() {
      offset -= speed;
      if (Math.abs(offset) >= itemWidth) {
        offset += itemWidth;
      }
      ul.style.transform = 'translateX(' + offset + 'px)';
      ul.style.willChange = 'transform';
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTicker);
  } else {
    startTicker();
  }
})();
</script>
`;

// Remove any existing ticker script if present
subHtml = subHtml.replace(/<script id="grand-footer-ticker-engine">[\s\S]*?<\/script>/g, '');
// Insert ticker script right before </body>
subHtml = subHtml.replace('</body>', tickerMotionScript.trim() + '\n</body>');

fs.writeFileSync(subHtmlPath, subHtml, 'utf8');
console.log('Successfully updated venues/open-earth-lawn.html!');
