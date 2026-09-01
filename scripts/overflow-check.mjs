// DEV-ONLY: verify no horizontal overflow at key widths on the grid harness.
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 3211;
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

const widths = [375, 390, 414, 600, 768, 900, 1024, 1280, 1440, 1920];
try {
  await waitFor(`${base}/`);
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(`${base}/grid-preview`, { waitUntil: "domcontentloaded" });
    const res = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    const overflow = res.scrollW - res.clientW;
    console.log(
      `w=${String(w).padStart(4)}  scrollW=${res.scrollW}  clientW=${res.clientW}  overflow=${overflow}px  ${overflow > 1 ? "OVERFLOW" : "ok"}`,
    );
    await page.close();
  }
  await browser.close();
} catch (e) {
  console.error("ERR", e.message);
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
}
