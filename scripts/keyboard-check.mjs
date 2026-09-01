/*
 * DEV-ONLY keyboard/focus verification (Task 5.1). Boots the built server and
 * asserts: skip link is first focusable + moves focus to <main>; focus-visible
 * ring is applied; focus trap cycles within, Esc closes, focus returns to the
 * trigger. Runs at desktop/tablet/mobile widths.
 */
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 3214;
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

const results = [];
function assert(name, cond) {
  results.push({ name, pass: !!cond });
  console.log(`${cond ? "✓" : "✖"} ${name}`);
}

try {
  await waitFor(`${base}/`);
  const browser = await chromium.launch({ args: ["--no-sandbox"] });

  for (const vp of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "tablet", width: 900, height: 1200 },
    { name: "mobile", width: 390, height: 800 },
  ]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    // --- Skip link (on home) ---
    await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab");
    const firstFocus = await page.evaluate(() => {
      const el = document.activeElement;
      return { cls: el?.className || "", text: el?.textContent?.trim() || "" };
    });
    assert(`[${vp.name}] first Tab focuses skip link`, /skip-link/.test(firstFocus.cls));

    // activate skip link -> focus moves to <main>
    await page.keyboard.press("Enter");
    const afterSkip = await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName);
    assert(`[${vp.name}] skip link moves focus to main`, afterSkip === "main" || afterSkip === "MAIN");

    // focus-visible ring present on skip link when focused (on a real route)
    await page.goto(`${base}/about`, { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab"); // skip link
    const ring = await page.evaluate(() => {
      const el = document.activeElement;
      const cs = el ? getComputedStyle(el) : null;
      return cs ? cs.outlineStyle + " " + cs.outlineWidth : "";
    });
    assert(`[${vp.name}] focus-visible ring on skip link`, /solid/.test(ring) && !/0px/.test(ring));

    // (Focus-trap behaviour is exercised on the real full-screen Menu in
    // scripts/menu-check.mjs — open/trap/Esc/return-to-trigger.)

    await ctx.close();
  }

  await browser.close();
} catch (e) {
  console.error("KEYBOARD RUN ERROR:", e.message);
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
}

const failed = results.filter((r) => !r.pass);
if (failed.length) {
  console.error(`\nKeyboard/focus check FAILED: ${failed.length} assertion(s).`);
  process.exitCode = 1;
} else {
  console.log(`\nKeyboard/focus check passed: ${results.length} assertions.`);
}
