import fs from 'fs';

const subHtmlPath = 'venues/open-earth-lawn.html';
let subHtml = fs.readFileSync(subHtmlPath, 'utf8');

const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1202.351 150.096" overflow="visible"><path d="M 56.138 17.434 L 57.940 17.434 L 57.940 125.052 L 50.523 147.696 L 90.406 147.696 L 82.990 125.052 L 82.990 17.434 L 84.791 17.434 C 104.032 17.434 118.464 22.043 132.290 29.859 L 136.899 2.402 L 4.031 2.402 L 8.839 29.859 C 22.471 22.043 37.098 17.434 56.138 17.434 M 161.927 24.850 L 161.927 125.052 L 154.517 147.696 L 194.394 147.696 L 186.978 125.052 L 186.978 71.143 L 200.609 71.143 C 219.644 71.143 233.876 75.752 247.502 83.368 L 247.502 125.052 L 240.086 147.696 L 279.969 147.696 L 272.553 125.052 L 272.553 24.850 L 279.969 2.402 L 240.086 2.402 L 247.502 24.850 L 247.502 58.118 L 186.978 58.118 L 186.978 24.850 L 194.394 2.402 L 154.517 2.402 M 305.798 24.850 L 305.798 125.052 L 298.387 147.696 L 399.189 147.696 L 394.380 120.038 C 380.749 128.055 366.122 132.663 347.081 132.663 L 330.848 132.663 L 330.848 73.545 C 345.280 74.951 357.105 79.160 368.524 85.770 L 373.133 58.118 L 330.848 58.118 L 330.848 17.434 L 343.674 17.434 C 362.915 17.434 377.347 22.043 390.973 29.859 L 395.781 2.402 L 298.387 2.402 M 605.058 122.245 L 619.084 147.696 L 624.899 147.696 L 624.899 61.920 L 547.741 61.920 L 552.550 89.378 C 566.181 81.562 580.608 76.953 599.849 76.953 L 599.849 86.771 C 599.849 111.821 588.824 134.470 567.182 134.470 C 545.539 134.470 526.298 116.030 518.682 86.971 C 516.481 78.554 515.274 70.743 515.274 63.527 C 515.274 41.284 525.698 24.850 544.533 18.435 C 549.948 16.433 555.557 15.627 560.966 15.627 C 579.207 15.627 597.041 25.451 610.467 42.084 L 610.267 10.418 C 598.442 4.609 582.209 0.000 566.782 0.000 L 563.174 0.000 C 522.490 1.801 492.030 30.860 492.030 74.951 C 492.030 119.237 523.491 150.103 555.757 150.103 C 581.408 150.103 596.841 137.278 605.058 122.245 M 652.535 24.850 L 652.535 125.052 L 645.118 147.696 L 684.996 147.696 L 677.585 125.052 L 677.585 91.985 L 693.818 91.985 L 728.486 147.696 L 761.553 147.696 L 738.504 123.446 L 716.061 87.176 C 737.304 83.368 755.738 71.744 755.738 45.492 C 755.738 20.036 732.295 2.402 703.836 2.402 L 645.118 2.402 M 677.585 76.953 L 677.585 17.434 L 699.027 17.434 C 722.071 17.434 730.688 33.067 730.688 48.094 C 730.688 62.927 721.671 76.953 698.427 76.953 M 792.797 121.845 L 777.364 147.696 L 816.847 147.696 C 814.039 140.079 812.638 132.463 812.638 124.447 C 812.638 117.036 813.839 109.219 816.241 100.803 L 819.449 100.803 C 838.289 100.803 852.716 105.211 866.342 113.028 C 866.948 116.836 867.348 120.644 867.348 124.246 C 867.348 132.463 865.741 140.079 862.939 147.696 L 915.042 147.696 L 898.008 121.845 L 853.516 2.402 L 826.865 2.402 L 831.073 13.426 M 820.849 87.777 L 839.290 35.469 L 858.731 87.777 M 938.469 24.850 L 938.469 125.052 L 931.053 147.696 L 960.917 147.696 L 953.501 125.052 L 953.501 36.670 L 1026.045 147.696 L 1055.904 147.696 L 1048.488 125.052 L 1048.488 24.850 L 1055.904 2.402 L 1026.045 2.402 L 1033.461 24.850 L 1033.461 113.428 L 960.917 2.402 L 931.053 2.402 M 1081.739 24.850 L 1081.739 125.052 L 1074.323 147.696 L 1135.248 147.696 C 1167.508 147.696 1198.374 115.229 1198.374 75.952 C 1198.374 32.261 1171.116 2.802 1135.848 2.402 L 1074.323 2.402 M 1106.789 17.434 L 1129.633 17.434 C 1153.082 17.434 1173.324 40.078 1173.324 75.352 C 1173.324 110.620 1153.282 132.663 1130.239 132.663 L 1106.789 132.663" fill="rgb(255, 240, 202)"></path></svg>`;

const cleanDataUri = `data:image/svg+xml,${encodeURIComponent(cleanSvg)}`;

const exactFooterStyles = `<style id="universal-grand-footer-styles">
/* EXACT 1:1 REPLICA OF HOMEPAGE FOOTER (NO IMPROVISATION) */
footer.framer-18na9ah {
  max-width: 100% !important;
  height: min-content !important;
  overflow: clip !important;
  background-color: #964317 !important;
  position: relative !important;
  display: flex !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  z-index: 1 !important;
}

footer.framer-18na9ah .ssr-variant {
  width: 100% !important;
}

footer.framer-18na9ah .framer-192t1bg-container {
  width: 100% !important;
  height: auto !important;
  position: relative !important;
}

footer.framer-18na9ah .framer-zHQwT {
  width: 100% !important;
  opacity: 1 !important;
  transform: none !important;
  background-color: #C2653A !important;
  padding: 256px 48px 48px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  overflow: clip !important;
}

/* NAVBAR LOCK: Keep fixed navbar firmly visible at top across entire page, matching homepage */
header[data-framer-name="Navbar Wrapper"],
header.framer-1i47qog,
header.framer-bg7hsc {
  position: fixed !important;
  top: 0px !important;
  left: 0px !important;
  width: 100% !important;
  z-index: 9999 !important;
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  transform: none !important;
}

/* EXACT HOMEPAGE TICKER DIMENSIONS: 270px HEIGHT, AUTHENTIC SERIF LETTERS */
.framer-xj8hz2 {
  width: 2164.5px !important;
  height: 270px !important;
  background-image: url("${cleanDataUri}") !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  margin: 0 -16.2px 0 0 !important;
  display: block !important;
  flex-shrink: 0 !important;
}

.framer-n49p1z {
  width: 2525.39px !important;
  height: 270px !important;
  display: flex !important;
  position: relative !important;
  overflow: clip !important;
}

.framer-n49p1z ul {
  height: 270px !important;
  display: flex !important;
  align-items: center !important;
  gap: 162px !important;
  opacity: 1 !important;
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
}

.framer-n49p1z li,
.framer-n49p1z .ticker-item {
  height: 270px !important;
  width: 2148.31px !important;
  flex-shrink: 0 !important;
  display: flex !important;
  align-items: center !important;
}

/* TICKER CONTINUOUS MOTION */
@keyframes grand-home-ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

footer.framer-18na9ah .framer-n49p1z ul {
  animation: grand-home-ticker 30s linear infinite !important;
  will-change: transform !important;
}

@media (prefers-reduced-motion: reduce) {
  footer.framer-18na9ah .framer-n49p1z ul {
    animation-play-state: paused !important;
  }
}

/* RESPONSIVE MOBILE ADJUSTMENTS */
@media (max-width: 809.98px) {
  footer.framer-18na9ah .framer-zHQwT {
    padding: 120px 24px 32px !important;
  }
  footer.framer-18na9ah .framer-1h4yz5c {
    flex-direction: column !important;
    gap: 36px !important;
    width: 100% !important;
  }
  footer.framer-18na9ah .framer-1bl146l {
    display: flex !important;
    justify-content: space-between !important;
    width: 100% !important;
    gap: 20px !important;
  }
  footer.framer-18na9ah .framer-1h0qpni,
  footer.framer-18na9ah .framer-1fp396q {
    width: auto !important;
    flex: 1 !important;
  }
  footer.framer-18na9ah .framer-vwpsk8 {
    width: 100% !important;
  }
  .framer-xj8hz2 {
    width: 1200px !important;
    height: 150px !important;
  }
  .framer-n49p1z,
  .framer-n49p1z ul,
  .framer-n49p1z li {
    height: 150px !important;
  }
}

/* SOLID FOOTER LINK HOVER */
footer.framer-18na9ah a {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  text-decoration: none !important;
}
footer.framer-18na9ah a:hover {
  opacity: 0.65 !important;
}

.casa-skip:not(:focus) {
  position: absolute !important;
  left: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
}
</style>`;

subHtml = subHtml.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/, exactFooterStyles);

fs.writeFileSync(subHtmlPath, subHtml, 'utf8');
console.log('Successfully installed clean authentic serif SVG into universal-grand-footer-styles!');
