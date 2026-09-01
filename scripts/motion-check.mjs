// DEV-ONLY: verify Phase 4 motion infra at viewports + reduced-motion.
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const OUT = "/projects/sandbox/.kiro/artifacts/screenshots";
mkdirSync(OUT, { recursive: true });
const PORT = 3212;
const base = `http://127.0.0.1:${PORT}`;
const server = spawn(
  "node",
  ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)],
  { cwd: "/projects/sandbox/SSZC", stdio: "ignore" },
);
async function waitFor(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try { const r = await fetch(url); if (r.ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("no server");
}

async function revealState(page) {
  // Are line-rise elements ending up visible (opacity 1, no transform) after scroll?
  return page.evaluate(async () => {
    // scroll through the page to trigger observers
    for (let y = 0; y <= document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 900));
    const rises = Array.from(document.querySelectorAll(".m-rise"));
    const masks = Array.from(document.querySelectorAll(".m-mask"));
    const riseVisible = rises.every((el) => {
      const cs = getComputedStyle(el);
      return parseFloat(cs.opacity) > 0.95;
    });
    const maskShown = masks.every((el) => el.getAttribute("data-inview") === "true");
    return { rises: rises.length, masks: masks.length, riseVisible, maskShown };
  });
}

try {
  await waitFor(`${base}/`);
  const browser = await chromium.launch({ args: ["--no-sandbox"] });

  // 1. MOTION ON — desktop
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
    const page = await ctx.newPage();
    await page.goto(`${base}/motion-preview`, { waitUntil: "networkidle" });
    const s = await revealState(page);
    console.log("MOTION ON  (1440):", JSON.stringify(s));
    await page.screenshot({ path: `${OUT}/motion-on-desktop.png`, fullPage: true });
    await ctx.close();
  }

  // 2. REDUCED MOTION — desktop: content must be fully visible (static baseline)
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(`${base}/motion-preview`, { waitUntil: "networkidle" });
    // Do NOT scroll first — under reduced motion, content should be visible immediately.
    const immediate = await page.evaluate(() => {
      const rises = Array.from(document.querySelectorAll(".m-rise"));
      const allVisible = rises.every((el) => parseFloat(getComputedStyle(el).opacity) > 0.95);
      const masks = Array.from(document.querySelectorAll(".m-mask"));
      const masksClear = masks.every((el) => getComputedStyle(el).clipPath === "none");
      return { rises: rises.length, allVisibleImmediately: allVisible, masksClear };
    });
    console.log("REDUCED MO (1440):", JSON.stringify(immediate));
    await page.screenshot({ path: `${OUT}/motion-reduced-desktop.png`, fullPage: true });
    await ctx.close();
  }

  // 3. REDUCED MOTION — mobile
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(`${base}/motion-preview`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${OUT}/motion-reduced-mobile.png`, fullPage: true });
    await ctx.close();
  }

  // 4. PAGE TRANSITION — click the transition link, confirm we land on the 2nd route
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
    const page = await ctx.newPage();
    await page.goto(`${base}/motion-preview`, { waitUntil: "networkidle" });
    await page.getByText("Go to second route").click();
    await page.waitForURL("**/motion-preview/next", { timeout: 5000 });
    await page.waitForTimeout(1000);
    const heading = await page.locator("h1").innerText();
    console.log("TRANSITION -> landed on:", page.url().split("/").slice(-1)[0], "| heading:", JSON.stringify(heading));
    await page.screenshot({ path: `${OUT}/motion-transition-landed.png`, fullPage: true });
    await ctx.close();
  }

  // 5. CURSOR — fine pointer mounts follower; coarse does not
  {
    const fine = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p1 = await fine.newPage();
    await p1.goto(`${base}/motion-preview`, { waitUntil: "networkidle" });
    await p1.waitForTimeout(300);
    const cursorMounted = await p1.evaluate(() => !!document.querySelector(".cursor-root"));
    console.log("CURSOR fine-pointer mounted:", cursorMounted);
    await fine.close();

    const coarse = await browser.newContext({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true });
    const p2 = await coarse.newPage();
    await p2.goto(`${base}/motion-preview`, { waitUntil: "networkidle" });
    await p2.waitForTimeout(300);
    const cursorOnTouch = await p2.evaluate(() => {
      const el = document.querySelector(".cursor-root");
      if (!el) return "not-mounted";
      return getComputedStyle(el).display; // should be "none" via media query
    });
    console.log("CURSOR touch/coarse:", cursorOnTouch, "(expect not-mounted or none)");
    await coarse.close();
  }

  await browser.close();
} catch (e) {
  console.error("ERR", e.message);
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
}
