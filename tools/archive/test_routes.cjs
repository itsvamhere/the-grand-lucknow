const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log("=== Testing /venues/boutique-n1 ===");
  try {
    const res1 = await page.goto("http://localhost:3000/venues/boutique-n1", { waitUntil: "networkidle", timeout: 15000 });
    console.log("Final URL:", page.url());
    console.log("Status:", res1 ? res1.status() : "no response");
    console.log("Title:", await page.title());
    await page.screenshot({ path: "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/current_boutique_test.png" });
  } catch (e) {
    console.error("Error testing boutique-n1:", e.message);
  }

  console.log("\n=== Testing /venues/venue-n1 ===");
  try {
    const res2 = await page.goto("http://localhost:3000/venues/venue-n1", { waitUntil: "networkidle", timeout: 15000 });
    console.log("Final URL:", page.url());
    console.log("Status:", res2 ? res2.status() : "no response");
    console.log("Title:", await page.title());
    const bodyText = await page.innerText("body");
    console.log("Contains 404 text:", bodyText.includes("doesn't exist"));
    console.log("First 200 chars:", bodyText.substring(0, 200).replace(/\n+/g, " "));
    await page.screenshot({ path: "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3/current_venue_n1_test.png" });
  } catch (e) {
    console.error("Error testing venue-n1:", e.message);
  }

  await browser.close();
})();
