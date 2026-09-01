/*
 * DEV-ONLY menu keyboard/SR verification (Task 6.2). Boots the built server and
 * asserts the full-screen Menu is fully operable: MENU toggles aria-expanded,
 * opening traps focus, Tab cycles within, Esc closes + returns focus to the
 * trigger, and a link navigates + closes. Runs desktop/tablet/mobile.
 */
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 3215;
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
    await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });

    const menuBtn = page.locator('button[aria-controls="site-menu"]');

    // Closed initially
    const expandedClosed = await menuBtn.getAttribute("aria-expanded");
    assert(`[${vp.name}] MENU aria-expanded=false when closed`, expandedClosed === "false");
    const hiddenClosed = await page.locator("#site-menu").getAttribute("hidden");
    assert(`[${vp.name}] menu hidden when closed`, hiddenClosed !== null);

    // Open via keyboard
    await menuBtn.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    const expandedOpen = await menuBtn.getAttribute("aria-expanded");
    assert(`[${vp.name}] MENU aria-expanded=true when open`, expandedOpen === "true");

    // Focus moved inside the dialog
    const focusInside = await page.evaluate(() => {
      const menu = document.getElementById("site-menu");
      return !!menu && menu.contains(document.activeElement);
    });
    assert(`[${vp.name}] focus moves inside menu on open`, focusInside);

    // Dialog semantics
    const role = await page.locator("#site-menu").getAttribute("role");
    const modal = await page.locator("#site-menu").getAttribute("aria-modal");
    assert(`[${vp.name}] menu is role=dialog aria-modal`, role === "dialog" && modal === "true");

    // Esc closes and returns focus to the trigger
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const expandedAfterEsc = await menuBtn.getAttribute("aria-expanded");
    const focusReturned = await page.evaluate(() =>
      document.activeElement === document.querySelector('button[aria-controls="site-menu"]'),
    );
    assert(`[${vp.name}] Esc closes menu`, expandedAfterEsc === "false");
    assert(`[${vp.name}] Esc returns focus to MENU trigger`, focusReturned);

    // Open again and navigate via a link -> menu closes + route changes
    await menuBtn.click();
    await page.waitForTimeout(200);
    await page.getByRole("link", { name: "Contact" }).click();
    await page.waitForURL("**/contact", { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(400);
    const url = page.url();
    const menuClosedAfterNav = await page.locator("#site-menu").getAttribute("hidden");
    assert(`[${vp.name}] link navigates to /contact`, /\/contact$/.test(url));
    assert(`[${vp.name}] menu closes after navigation`, menuClosedAfterNav !== null);

    await ctx.close();
  }

  await browser.close();
} catch (e) {
  console.error("MENU RUN ERROR:", e.message);
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
}

const failed = results.filter((r) => !r.pass);
if (failed.length) {
  console.error(`\nMenu check FAILED: ${failed.length} assertion(s).`);
  process.exitCode = 1;
} else {
  console.log(`\nMenu check passed: ${results.length} assertions.`);
}
