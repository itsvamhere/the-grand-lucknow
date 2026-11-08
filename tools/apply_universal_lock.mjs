import fs from 'fs';

const subHtmlPath = 'venues/open-earth-lawn.html';
let subHtml = fs.readFileSync(subHtmlPath, 'utf8');

console.log('1. Removing grand-footer-nav-observer script');
subHtml = subHtml.replace(/<script id="grand-footer-nav-observer">[\s\S]*?<\/script>/g, '');

console.log('2. Removing grand-nav-footer-collision-guard style');
subHtml = subHtml.replace(/<style id="grand-nav-footer-collision-guard">[\s\S]*?<\/style>/g, '');

console.log('3. Ensuring universal-grand-footer-styles has exact parity with index.html');
// Verify universal-grand-footer-styles
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

/* EXACT HOMEPAGE TICKER DIMENSIONS: 270px HEIGHT, MASSIVE SERIF LETTERS */
.framer-xj8hz2 {
  width: 2164.5px !important;
  height: 270px !important;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%202404.809%20300.206%22%20overflow%3D%22visible%22%3E%3Cpath%20d%3D%22M%20112.277%2034.868%20L%20115.879%2034.868%20L%20115.879%20250.105%20L%20101.047%20295.392%20L%20180.812%20295.392%20L%20165.980%20250.105%20L%20165.980%2034.868%20L%20169.582%2034.868%20C%20208.064%2034.868%20236.928%2044.086%20264.581%2059.719%20L%20273.798%204.803%20L%208.061%204.803%20L%2017.679%2059.719%20C%2044.942%2044.086%2074.195%2034.868%20112.277%2034.868%20M%20323.855%2049.701%20L%20323.855%20250.105%20L%20309.033%20295.392%20L%20388.788%20295.392%20L%20373.955%20250.105%20L%20373.955%20142.287%20L%20401.218%20142.287%20C%20439.289%20142.287%20467.753%20151.504%20495.005%20166.737%20L%20495.005%20250.105%20L%20480.172%20295.392%20L%20559.938%20295.392%20L%20545.106%20250.105%20L%20545.106%2049.701%20L%20559.938%204.803%20L%20480.172%204.803%20L%20495.005%2049.701%20L%20495.005%20116.235%20L%20373.955%20116.235%20L%20373.955%2049.701%20L%20388.788%204.803%20L%20309.033%204.803%20M%20611.595%2049.701%20L%20611.595%20250.105%20L%20596.774%20295.392%20L%20798.379%20295.392%20L%20788.761%20240.076%20C%20761.498%20256.109%20732.245%20265.327%20694.163%20265.327%20L%20661.696%20265.327%20L%20661.696%20147.090%20C%20690.560%20149.903%20714.210%20158.320%20737.048%20171.540%20L%20746.265%20116.235%20L%20661.696%20116.235%20L%20661.696%2034.868%20L%20687.347%2034.868%20C%20725.829%2034.868%20754.693%2044.086%20781.945%2059.719%20L%20791.563%204.803%20L%20596.774%204.803%20M%201210.115%20244.490%20L%201238.168%20295.392%20L%201249.798%20295.392%20L%201249.798%20123.841%20L%201095.481%20123.841%20L%201105.099%20178.756%20C%201132.362%20163.123%201161.215%20153.906%201199.697%20153.906%20L%201199.697%20173.541%20C%201199.697%20223.642%201177.649%20268.940%201134.364%20268.940%20C%201091.078%20268.940%201052.597%20232.059%201037.364%20173.942%20C%201032.961%20157.108%201030.548%20141.486%201030.548%20127.054%20C%201030.548%2082.568%201051.396%2049.701%201089.066%2036.870%20C%201099.896%2032.867%201111.114%2031.255%201121.933%2031.255%20C%201158.413%2031.255%201194.082%2050.902%201220.934%2084.169%20L%201220.534%2020.837%20C%201196.884%209.217%201164.417%200.000%201133.563%200.000%20L%201126.347%200.000%20C%201044.980%203.602%20984.061%2061.720%20984.061%20149.903%20C%20984.061%20238.475%201046.982%20300.206%201111.515%20300.206%20C%201162.816%20300.206%201193.682%20274.555%201210.115%20244.490%20M%201305.069%2049.701%20L%201305.069%20250.105%20L%201290.237%20295.392%20L%201369.991%20295.392%20L%201355.170%20250.105%20L%201355.170%20183.971%20L%201387.637%20183.971%20L%201456.973%20295.392%20L%201523.107%20295.392%20L%201477.009%20246.892%20L%201432.122%20174.353%20C%201474.607%20166.737%201511.477%20143.487%201511.477%2090.985%20C%201511.477%2040.072%201464.589%204.803%201407.672%204.803%20L%201290.237%204.803%20M%201355.170%20153.906%20L%201355.170%2034.868%20L%201398.055%2034.868%20C%201444.142%2034.868%201461.376%2066.134%201461.376%2096.188%20C%201461.376%20125.853%201443.341%20153.906%201396.854%20153.906%20M%201585.594%20243.689%20L%201554.718%20295.392%20L%201494.999%20295.392%20L%201569.544%20170.738%20L%201524.646%2096.188%20C%201509.825%2071.738%201499.006%2049.701%201490.187%2034.868%20L%201493.799%2034.868%20L%201536.674%20104.605%20L%201592.408%20197.608%20L%201648.132%20104.605%20L%201691.007%2034.868%20L%201694.619%2034.868%20C%201685.8%2049.701%201674.981%2071.738%201660.16%2096.188%20L%201615.263%20170.738%20L%201689.807%20295.392%20L%201630.088%20295.392%20M%201717.462%20175.554%20L%201758.349%20244.490%20L%201728.694%20295.392%20L%201799.231%20295.392%20L%201814.064%20250.105%20L%201814.064%20191.190%20L%201726.289%2049.701%20L%201711.456%204.803%20L%201771.186%204.803%20L%201786.007%2049.701%20L%201844.123%20147.090%20L%201902.249%2049.701%20L%201917.082%204.803%20L%201976.802%204.803%20L%201961.979%2049.701%20L%201874.204%20191.190%20L%201874.204%20250.105%20L%201889.037%20295.392%20L%201959.574%20295.392%20L%201929.919%20244.490%20L%201970.806%20175.554%20C%201991.644%20140.285%202008.887%20108.623%202018.506%2081.766%20L%202022.108%2081.766%20C%202013.289%20108.623%201996.056%20140.285%201975.218%20175.554%20L%201934.331%20244.490%20L%201844.123%2090.985%20L%201753.935%20244.490%20L%201713.048%20175.554%20C%201692.21%20140.285%201674.967%20108.623%201665.349%2081.766%20L%201668.951%2081.766%20C%201677.77%20108.623%201695.012%20140.285%201715.850%20175.554%20M%201717.462%20175.554%20L%201668.580%2070.938%20L%201717.462%20175.554%20M%201876.937%2049.701%20L%201876.937%20250.105%20L%201862.105%20295.392%20L%201921.835%20295.392%20L%201907.002%20250.105%20L%201907.002%2073.339%20L%202052.090%20295.392%20L%202111.809%20295.392%20L%202096.977%20250.105%20L%202096.977%2049.701%20L%202111.809%204.803%20L%202052.090%204.803%20L%202066.923%2049.701%20L%202066.923%20226.856%20L%201921.835%204.803%20L%201862.105%204.803%20M%202163.478%2049.701%20L%202163.478%20250.105%20L%202148.645%20295.392%20L%202270.495%20295.392%20C%202335.017%20295.392%202396.748%20230.458%202396.748%20151.904%20C%202396.748%2064.522%202342.233%205.604%202271.696%204.803%20L%202148.645%204.803%20M%202213.578%2034.868%20L%202259.265%2034.868%20C%202306.164%2034.868%202346.647%2080.155%202346.647%20150.703%20C%202346.647%20221.241%202306.564%20265.327%202260.477%20265.327%20L%202213.578%20265.327%22%20fill%3D%22rgb(255%2C240%2C202)%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E") !important;
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
console.log('Successfully updated venues/open-earth-lawn.html!');
