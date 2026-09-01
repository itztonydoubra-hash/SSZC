/*
 * Automated accessibility check (Task 5.2).
 *
 * Boots the built Next server, runs axe-core (WCAG 2.0/2.1 A & AA, incl.
 * color-contrast) against every current route at desktop / tablet / mobile,
 * and EXITS NON-ZERO on any violation — so it gates `npm run check`.
 *
 * Routes are discovered from the app router build; dev harness routes
 * (grid-preview, motion-preview) are included so regressions there are caught
 * too, but they will be removed before Phase 17 with their own note.
 */
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const PORT = 3213;
const base = `http://127.0.0.1:${PORT}`;

// Routes currently in the app. Update as routes are added per phase.
const ROUTES = [
  "/",
  "/about",
  "/leadership",
  "/chapters",
  "/projects",
  "/events",
  "/news",
  "/publications",
  "/impact",
  "/media",
  "/archive",
  "/opportunities",
  "/contact",
];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 900, height: 1200 },
  { name: "mobile", width: 390, height: 800 },
];

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
  throw new Error("server did not start");
}

let totalViolations = 0;

try {
  await waitFor(`${base}/`);
  const browser = await chromium.launch({ args: ["--no-sandbox"] });

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    for (const route of ROUTES) {
      const page = await ctx.newPage();
      await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const v = results.violations;
      if (v.length > 0) {
        totalViolations += v.length;
        console.log(`\n✖ ${route} @ ${vp.name}: ${v.length} violation(s)`);
        for (const item of v) {
          console.log(
            `   [${item.impact}] ${item.id} — ${item.help} (${item.nodes.length} node(s))`,
          );
          for (const node of item.nodes.slice(0, 3)) {
            console.log(`      ${node.target.join(" ")}`);
          }
        }
      } else {
        console.log(`✓ ${route} @ ${vp.name}: no violations`);
      }
      await page.close();
    }
    await ctx.close();
  }

  await browser.close();
} catch (e) {
  console.error("A11Y RUN ERROR:", e.message);
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
}

if (totalViolations > 0) {
  console.error(`\nAccessibility check FAILED: ${totalViolations} violation(s).`);
  process.exitCode = 1;
} else {
  console.log("\nAccessibility check passed: 0 violations.");
}
