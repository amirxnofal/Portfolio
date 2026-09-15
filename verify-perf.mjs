import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3100";

async function scrollThrough(page, sections) {
  const seen = [];
  for (const s of sections) {
    const el = page.locator(`#${s}`).first();
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      seen.push(s);
    }
  }
  return seen;
}

(async () => {
  const browser = await chromium.launch();
  const out = { errors: [], warnings: [] };

  // ── Desktop ────────────────────────────────────────────────
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("console", (m) => {
    if (m.type() === "error") out.errors.push(m.text());
  });
  page.on("pageerror", (e) => out.errors.push(String(e)));

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  // Hero elements present
  const portrait = await page.locator('img[alt="Amir — backend developer"]').count();
  const marquee = await page.locator(".animate-marquee").count();
  const navProgress = await page.locator('main').count() > 0;
  out.hero = { portraitLayers: portrait, marqueeClass: marquee, navSeen: navProgress };

  // Marquee really animates (computed transform changes over time)
  const t0 = await page.locator(".animate-marquee").evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(300);
  const t1 = await page.locator(".animate-marquee").evaluate((el) => getComputedStyle(el).transform);
  out.marqueeAnimates = t0 !== t1;

  // Nav progress fills as we scroll
  const p0 = await page.evaluate(() => {
    const bar = document.querySelector("header .origin-left");
    return bar ? getComputedStyle(bar).transform : null;
  });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  const p1 = await page.evaluate(() => {
    const bar = document.querySelector("header .origin-left");
    return bar ? getComputedStyle(bar).transform : null;
  });
  out.navProgressChanges = JSON.stringify(p0) !== JSON.stringify(p1);

  // Portrait parallax responds to mouse movement
  const layerTransform0 = await page.evaluate(() => {
    const imgs = document.querySelectorAll("#top img");
    return imgs.length ? getComputedStyle(imgs[0]).transform : null;
  });
  await page.mouse.move(100, 120, { steps: 5 });
  await page.waitForTimeout(150);
  const layerTransform1 = await page.evaluate(() => {
    const imgs = document.querySelectorAll("#top img");
    return imgs.length ? getComputedStyle(imgs[0]).transform : null;
  });
  out.parallaxResponds = layerTransform0 !== layerTransform1;

  // Scan through all sections
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  out.seenDesktop = await scrollThrough(page, ["about", "capabilities", "engineering", "projects", "contact"]);
  await page.waitForTimeout(400);
  await page.screenshot({ path: "shot-perf-full.png", fullPage: true });

  // ── Mobile ─────────────────────────────────────────────────
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mob.on("console", (m) => {
    if (m.type() === "error") out.errors.push("[mobile] " + m.text());
  });
  mob.on("pageerror", (e) => out.errors.push("[mobile] " + String(e)));
  await mob.goto(URL, { waitUntil: "networkidle" });
  await mob.waitForTimeout(1000);
  await mob.screenshot({ path: "shot-perf-mobile-top.png", clip: { x: 0, y: 0, width: 390, height: 844 } });
  out.seenMobile = await scrollThrough(mob, ["about", "capabilities", "engineering", "projects", "contact"]);
  await mob.waitForTimeout(400);
  await mob.screenshot({ path: "shot-perf-mobile.png", fullPage: true });

  // ── Report ─────────────────────────────────────────────────
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})();