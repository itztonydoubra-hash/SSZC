/*
 * ============================================================================
 * STATIC EXPORT / GITHUB PAGES VERIFICATION
 * ============================================================================
 * The review deployment serves the static export from a project SUB-PATH
 * (`basePath: "/SSZC"`). A build that works perfectly on `next start` at the
 * domain root can still ship broken assets there — notably because an
 * UNOPTIMISED next/image emits its `src` verbatim, with no basePath
 * (docs/decisions.md D7). Nothing else in the pipeline catches that.
 *
 * This serves ./out from a /SSZC prefix, exactly as Pages does, and asserts that
 * the real images actually decode (naturalWidth > 0) and that no request 404s.
 *
 * Run:
 *   DEPLOY_TARGET=gh-pages npm run build && npm run check:export
 * ============================================================================
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = "/projects/sandbox/SSZC";
const OUT = `${ROOT}/out`;
const BASE_PATH = "/SSZC";
const PORT = 3216;

if (!fs.existsSync(`${OUT}/index.html`)) {
  console.error(
    "No static export found at ./out — run: DEPLOY_TARGET=gh-pages npm run build",
  );
  process.exit(1);
}

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

/* Serve ./out under the deployment sub-path, like GitHub Pages does. */
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  if (!url.startsWith(`${BASE_PATH}/`) && url !== BASE_PATH) {
    res.writeHead(404).end("outside basePath");
    return;
  }
  let file = path.join(OUT, url.slice(BASE_PATH.length) || "/");
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  } catch {
    res.writeHead(404).end("not found");
    return;
  }
  try {
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(fs.readFileSync(file));
  } catch {
    res.writeHead(404).end("not found");
  }
});
await new Promise((resolve) => server.listen(PORT, resolve));
const base = `http://127.0.0.1:${PORT}${BASE_PATH}`;

let failures = 0;
const check = (name, ok, detail) => {
  if (!ok) failures++;
  console.log(`${ok ? "✓" : "✖"} ${name}${detail ? ` — ${detail}` : ""}`);
};

const browser = await chromium.launch({ args: ["--no-sandbox"] });

/**
 * Loads a route, waits for hydration, and reports every image on the page plus
 * any failed request or console error.
 */
async function inspect(url, { selector, act } = {}) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const problems = [];
  page.on("response", (r) => r.status() >= 400 && problems.push(`${r.status()} ${r.url()}`));
  page.on("pageerror", (e) => problems.push(`JS: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
  await page.goto(`${base}${url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  if (act) await act(page);
  const images = await page.evaluate(
    (sel) =>
      [...document.querySelectorAll(sel ? `${sel} img` : "img")].map((el) => ({
        src: el.getAttribute("src"),
        alt: el.alt,
        w: el.naturalWidth,
      })),
    selector,
  );
  const result = { page, problems, images };
  return result;
}

/* ---- Chapter-president portraits (the reason this check exists) ---------- */
const PORTRAITS = [
  ["cross-river", "arthur-jarvis-university", "Edem Divine Agbor, SAL"],
  ["bayelsa", "hensard-university", "Elijah Christian Fonikimi"],
  ["delta", "michael-and-cecilia-ibru-university", "Plaku Jessica Pere-ere, SAL"],
  ["edo", "edo-state-university", "Omorhienrhien Princess Abieyuwa"],
  ["edo", "glorious-vision-university", "Jude Ayobami Abe"],
];

for (const [state, chapter, person] of PORTRAITS) {
  const { page, problems, images } = await inspect(
    `/chapters/?state=${state}&chapter=${chapter}`,
    { selector: ".cm-profile" },
  );
  const name = await page.locator(".cm-profile__person").textContent();
  const img = images[0];
  check(`chapters: ${chapter} shows "${person}"`, name === person, name ?? "(none)");
  check(
    `chapters: ${chapter} portrait resolves under ${BASE_PATH} and decodes`,
    Boolean(img) && img.w > 0 && (img.src ?? "").startsWith(`${BASE_PATH}/chapters/`),
    img ? `src=${img.src} naturalWidth=${img.w}` : "(no img)",
  );
  check(`chapters: ${chapter} no failed requests`, problems.length === 0, problems.slice(0, 2).join(" | "));
  await page.close();
}

/* A chapter with no supplied president keeps its designed empty state. */
{
  const { page, images } = await inspect("/chapters/?state=akwa-ibom&chapter=university-of-uyo", {
    selector: ".cm-profile",
  });
  const text = (await page.locator(".cm-profile").textContent()) ?? "";
  check(
    "chapters: unsupplied president shows [OFFICIAL IMAGE] + [NEEDS CONTENT], no <img>",
    images.length === 0 &&
      text.includes("[NEEDS CONTENT]") &&
      (await page.locator(".cm-profile__frame-empty").count()) === 1,
  );
  await page.close();
}

/* ---- Every other image-bearing route ------------------------------------ */
for (const [label, url] of [
  ["/", "/"],
  ["/leadership", "/leadership/"],
  ["/about", "/about/"],
  ["/media", "/media/"],
  ["/publications", "/publications/"],
]) {
  const { page, problems, images } = await inspect(url);
  const broken = images.filter((i) => i.w === 0);
  const unprefixed = images.filter((i) => (i.src ?? "").startsWith("/") && !(i.src ?? "").startsWith(`${BASE_PATH}/`));
  check(`${label}: all ${images.length} image(s) decode`, broken.length === 0, broken.map((b) => b.src).join(", "));
  check(`${label}: no image src misses ${BASE_PATH}`, unprefixed.length === 0, unprefixed.map((b) => b.src).join(", "));
  check(`${label}: no failed requests / console errors`, problems.length === 0, problems.slice(0, 2).join(" | "));
  await page.close();
}

await browser.close();
server.close();

console.log(
  failures === 0 ? "\nExport check passed." : `\nExport check FAILED: ${failures} problem(s).`,
);
process.exitCode = failures === 0 ? 0 : 1;
