/*
 * ============================================================================
 * CHAPTERS PAGE VERIFICATION
 * ============================================================================
 * Guards the two things this page must never get wrong:
 *
 *   1. CONTENT INTEGRITY — exactly the six supplied states and the supplied
 *      institutions, each appearing exactly once, no extras, all counts derived,
 *      and NO invented president name / portrait / social / contact / tenure.
 *   2. THE EXPERIENCE — the map renders, every state is selectable by keyboard,
 *      every chapter renders once, chapter selection works, the empty states
 *      show, deep links resolve, no horizontal overflow at 375/768/1440, no
 *      console errors, axe is clean in interacted states, and reduced motion
 *      runs no animation.
 *
 * Run:  node scripts/chapters-check.mjs        (needs a production build first)
 * Exits non-zero on any failure.
 * ============================================================================
 */
import { spawn } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const ROOT = "/projects/sandbox/SSZC";
const PORT = 3215;
const base = `http://127.0.0.1:${PORT}`;

/* The supplied institutions, transcribed from the client's list. This is the
 * reference the data file is checked against — not a second source of truth for
 * the app (the app reads content/ via getChapters()). */
const SUPPLIED = {
  "Cross River State": ["Arthur Jarvis University", "University of Calabar"],
  "Akwa Ibom State": ["University of Uyo", "Topfaith University"],
  "Rivers State": ["Rivers State University", "University of Port Harcourt"],
  "Bayelsa State": [
    "Niger Delta University",
    "Federal University, Otuoke",
    "Hensard University",
  ],
  "Delta State": [
    "Delta State University",
    "University of Delta",
    "Novena University",
    "Edwin Clark University",
    "Michael and Cecilia Ibru University",
    "Western Delta University",
    "Admiralty University",
  ],
  "Edo State": [
    "University of Benin",
    "Igbinedion University",
    "Edo State University",
    "Ambrose Alli University",
    "Glorious Vision University",
    "Benson Idahosa University",
  ],
};

let failures = 0;
function check(name, ok, detail) {
  if (!ok) failures++;
  console.log(`${ok ? "✓" : "✖"} ${name}${detail ? ` — ${detail}` : ""}`);
}

/* ==========================================================================
 * 1. CONTENT INTEGRITY (static analysis of the data + component layer)
 * ========================================================================== */

const dataSrc = await readFile(`${ROOT}/content/data/chapters.ts`, "utf8");

const stateBlocks = [...dataSrc.matchAll(/state:\s*"([^"]+)",\s*\n\s*slug:\s*"([^"]+)"/g)];
check("data: 6 states", stateBlocks.length === 6, `found ${stateBlocks.length}`);

const institutions = [...dataSrc.matchAll(/institution:\s*"([^"]+)"/g)].map((m) => m[1]);
const expectedAll = Object.values(SUPPLIED).flat();
check(
  `data: ${expectedAll.length} chapters`,
  institutions.length === expectedAll.length,
  `found ${institutions.length}`,
);

for (const inst of expectedAll) {
  const n = institutions.filter((i) => i === inst).length;
  if (n !== 1) check(`data: "${inst}" appears exactly once`, false, `appears ${n}×`);
}
check(
  "data: every supplied institution appears exactly once",
  expectedAll.every((inst) => institutions.filter((i) => i === inst).length === 1),
);
const extras = institutions.filter((i) => !expectedAll.includes(i));
check("data: no additional institution", extras.length === 0, extras.join(", "));

/* Per-state counts, read from the data file's own structure. */
for (const [stateName, list] of Object.entries(SUPPLIED)) {
  const block = dataSrc.split(`state: "${stateName}"`)[1]?.split("},\n    {")[0] ?? "";
  const got = [...block.matchAll(/institution:\s*"([^"]+)"/g)].map((m) => m[1]);
  const same = got.length === list.length && list.every((i) => got.includes(i));
  check(`data: ${stateName} = ${list.length}`, same, `found ${got.length}`);
}

/* The supplied "Port Harcourt" heading is a city; it must be recorded as Rivers
 * State. Only STATE declarations are inspected (the city legitimately appears in
 * "University of Port Harcourt" and in the file's provenance note). */
const declaredStates = stateBlocks.map((m) => m[1]);
check(
  'data: no "Port Harcourt State" invented — recorded as Rivers State',
  !declaredStates.some((s) => /Port Harcourt/.test(s)) && declaredStates.includes("Rivers State"),
  declaredStates.join(", "),
);

/* Presidents: only the supplied ones may exist, each with a name AND a portrait
 * file that is actually present. Nothing beyond what was supplied may appear. */
const SUPPLIED_PRESIDENTS = {
  "arthur-jarvis-university": ["Edem Divine Agbor, SAL", "edem-divine-agbor.jpg"],
  "hensard-university": ["Elijah Christian Fonikimi", "elijah-christian-fonikimi.jpg"],
  "michael-and-cecilia-ibru-university": ["Plaku Jessica Pere-ere, SAL", "plaku-jessica-pere-ere.jpg"],
  "edo-state-university": ["Omorhienrhien Princess Abieyuwa", "omorhienrhien-princess-abieyuwa.jpg"],
  "glorious-vision-university": ["Jude Ayobami Abe", "jude-ayobami-abe.jpg"],
};
const presidentBlocks = [...dataSrc.matchAll(/president:\s*\{/g)];
check(
  `data: exactly ${Object.keys(SUPPLIED_PRESIDENTS).length} presidents populated`,
  presidentBlocks.length === Object.keys(SUPPLIED_PRESIDENTS).length,
  `found ${presidentBlocks.length}`,
);

const portraitDir = await readdir(`${ROOT}/public/chapters`);
for (const [slug, [name, file]] of Object.entries(SUPPLIED_PRESIDENTS)) {
  const block = dataSrc.split(`slug: "${slug}"`)[1]?.slice(0, 600) ?? "";
  check(
    `data: ${slug} president is "${name}" with ${file}`,
    block.includes(`name: "${name}"`) && block.includes(`src: "/chapters/${file}"`),
  );
  check(`asset: public/chapters/${file} exists`, portraitDir.includes(file));
}

/* Names must not be invented for anyone else, and no unsupplied detail may be
 * filled in for the presidents that DO exist. */
const declaredNames = [...dataSrc.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
const expectedNames = Object.values(SUPPLIED_PRESIDENTS).map(([n]) => n);
check(
  "data: no president name invented",
  declaredNames.length === expectedNames.length &&
    declaredNames.every((n) => expectedNames.includes(n)),
  declaredNames.join(" | "),
);
check(
  "data: no tenure / socials / execs / contact invented",
  !/tenure:/.test(dataSrc) &&
    !/socials:/.test(dataSrc) &&
    !/execs:/.test(dataSrc) &&
    !/contact:/.test(dataSrc),
);
/* Every portrait file in public/chapters must be referenced — no stray or
 * unrelated photograph may sit in the published folder. */
const strayAssets = portraitDir.filter(
  (f) => /\.(jpe?g|png|webp|avif)$/i.test(f) && !dataSrc.includes(`/chapters/${f}`),
);
check("asset: no unreferenced portrait in public/chapters", strayAssets.length === 0, strayAssets.join(", "));

/* CMS-ready seam: components read the data-access layer, never the data files. */
const offenders = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      await walk(full);
    } else if (/\.tsx?$/.test(entry.name)) {
      const src = await readFile(full, "utf8");
      if (/from\s+["'](@\/content\/data\/|\.\.?\/(\.\.\/)*content\/data\/)/.test(src)) {
        offenders.push(full.replace(`${ROOT}/`, ""));
      }
    }
  }
}
for (const dir of ["components", "app", "lib"]) await walk(`${ROOT}/${dir}`);
check("architecture: no component imports content/data/*", offenders.length === 0, offenders.join(", "));

/* The old organisational graph must be gone, not merely unused. */
const componentFiles = await readdir(`${ROOT}/components/chapters`);
check(
  "cleanup: old OrgNetwork/OrgList removed",
  !componentFiles.includes("OrgNetwork.tsx") && !componentFiles.includes("OrgList.tsx"),
  componentFiles.join(", "),
);
const chaptersCss = await readFile(`${ROOT}/styles/chapters.css`, "utf8");
check("cleanup: old .cn-* graph styles removed", !/\.cn-/.test(chaptersCss));

/* ==========================================================================
 * 2. THE EXPERIENCE (against the built site)
 * ========================================================================== */

const server = spawn(
  "node",
  ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)],
  { cwd: ROOT, stdio: "ignore" },
);
async function waitFor(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("server did not start");
}

try {
  await waitFor(`${base}/`);
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const consoleErrors = [];

  async function open({ width, height, reduced = false, url = "/chapters" }) {
    const ctx = await browser.newContext({
      viewport: { width, height },
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => consoleErrors.push(e.message));
    await page.goto(`${base}${url}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    return { ctx, page };
  }

  /* ---- desktop: drawing, selection, counts, keyboard ---------------------- */
  {
    const { ctx, page } = await open({ width: 1440, height: 1000 });

    check("map: national outline drawn", (await page.locator(".cm-outline").count()) === 1);
    check(
      "map: context states drawn (not interactive)",
      (await page.locator(".cm-context path").count()) >= 30,
    );
    check(
      "map: exactly 6 South South shapes",
      (await page.locator(".cm-state").count()) === 6,
    );
    check(
      "map: exactly 6 call-out routes",
      (await page.locator(".cm-route").count()) === 6,
    );
    check(
      "map: svg is presentational",
      (await page.locator(".cm-svg").getAttribute("aria-hidden")) === "true",
    );
    check(
      "register: 6 accessible state buttons",
      (await page.locator(".cm-rail__btn").count()) === 6,
    );

    // Initial selection = Bayelsa (composition default only).
    check(
      "initial: Bayelsa selected",
      (await page.locator(".cm-state__name").textContent()) === "Bayelsa State",
    );

    /* Every state selectable BY KEYBOARD ALONE, with the right derived count,
     * the right chapters, and the URL updated in place. */
    const seen = [];
    for (const [stateName, list] of Object.entries(SUPPLIED)) {
      const btn = page.locator(".cm-rail__btn", { hasText: stateName }).first();
      await btn.focus();
      await page.keyboard.press("Enter");
      await page.waitForTimeout(250);

      const heading = await page.locator(".cm-state__name").textContent();
      const count = await page.locator(".cm-state__count").textContent();
      const rows = await page.locator(".cm-ledger__name").allTextContents();
      const pressed = await btn.getAttribute("aria-pressed");
      const url = new URL(page.url());

      check(`keyboard: Enter selects ${stateName}`, heading === stateName, heading ?? "");
      check(
        `count: ${stateName} shows ${list.length} (derived)`,
        count === `${list.length} LAWSAN ${list.length === 1 ? "chapter" : "chapters"}`,
        count ?? "",
      );
      check(
        `ledger: ${stateName} lists its ${list.length} chapters in order`,
        rows.length === list.length && rows.every((r, i) => r === list[i]),
        rows.join(" | "),
      );
      check(`aria: ${stateName} button is aria-pressed`, pressed === "true");
      check(
        `url: ${stateName} deep-link written`,
        url.searchParams.get("state") !== null && url.pathname.endsWith("/chapters"),
        url.search,
      );
      seen.push(...rows);
    }

    check(
      `ledger: all ${expectedAll.length} chapters appear exactly once across the 6 states`,
      seen.length === expectedAll.length &&
        expectedAll.every((i) => seen.filter((s) => s === i).length === 1),
      `${seen.length} rendered`,
    );

    /* Chapter selection, by keyboard, and the president empty states. */
    await page.locator(".cm-rail__btn", { hasText: "Delta State" }).first().focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(250);
    const target = page.locator(".cm-ledger__row", { hasText: "Novena University" });
    await target.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    check(
      "keyboard: Enter selects a chapter",
      (await page.locator(".cm-profile__name").textContent()) === "Novena University",
    );
    check("aria: selected chapter is aria-current", (await target.getAttribute("aria-current")) === "true");
    check(
      "url: chapter deep-link written",
      new URL(page.url()).searchParams.get("chapter") === "novena-university",
    );
    check(
      "empty state: CHAPTER PRESIDENT / [NEEDS CONTENT] for an unsupplied president",
      (await page.locator(".cm-profile").textContent())?.includes("[NEEDS CONTENT]") === true,
    );
    check(
      "empty state: [OFFICIAL IMAGE] frame (no broken image)",
      (await page.locator(".cm-profile__frame-empty").count()) === 1 &&
        (await page.locator(".cm-profile img").count()) === 0,
    );

    /* Every supplied president renders: the name, and a portrait that actually
     * decoded (naturalWidth > 0 — a broken image would report 0). */
    for (const [slug, [name, file]] of Object.entries(SUPPLIED_PRESIDENTS)) {
      const stateSlug = Object.entries({
        "arthur-jarvis-university": "cross-river",
        "hensard-university": "bayelsa",
        "michael-and-cecilia-ibru-university": "delta",
        "edo-state-university": "edo",
        "glorious-vision-university": "edo",
      }).find(([s]) => s === slug)?.[1];
      await page.goto(`${base}/chapters?state=${stateSlug}&chapter=${slug}`, {
        waitUntil: "networkidle",
      });
      await page.waitForTimeout(700);
      const shown = await page.locator(".cm-profile__person").textContent();
      const img = await page.evaluate(() => {
        const el = document.querySelector(".cm-profile img");
        return el ? { src: el.getAttribute("src"), w: el.naturalWidth, alt: el.alt } : null;
      });
      check(`president: ${slug} shows "${name}"`, shown === name, shown ?? "(none)");
      check(
        `portrait: ${slug} renders ${file} and it loaded`,
        img !== null && img.w > 0 && decodeURIComponent(img.src ?? "").includes(file),
        img ? `src=${img.src} naturalWidth=${img.w}` : "(no img)",
      );
      check(
        `portrait: ${slug} has factual alt naming the person and institution`,
        (img?.alt ?? "").startsWith(name.replace(/,\s*SAL$/, "")) &&
          (img?.alt ?? "").includes("chapter president"),
        img?.alt ?? "",
      );
      check(
        `president: ${slug} shows no placeholder alongside real content`,
        !((await page.locator(".cm-profile").textContent()) ?? "").includes("[NEEDS CONTENT]"),
      );
    }

    /* The 17 chapters with no supplied president must ALL still show the empty
     * state — no portrait may leak from another chapter. */
    let emptyProfiles = 0;
    let realProfiles = 0;
    for (const [stateName] of Object.entries(SUPPLIED)) {
      const stateSlug = { "Cross River State": "cross-river", "Akwa Ibom State": "akwa-ibom", "Rivers State": "rivers", "Bayelsa State": "bayelsa", "Delta State": "delta", "Edo State": "edo" }[stateName];
      await page.goto(`${base}/chapters?state=${stateSlug}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(400);
      const chapterButtons = await page.locator(".cm-ledger__row").count();
      for (let i = 0; i < chapterButtons; i++) {
        await page.locator(".cm-ledger__row").nth(i).click();
        await page.waitForTimeout(180);
        const hasImg = (await page.locator(".cm-profile img").count()) > 0;
        const hasFrame = (await page.locator(".cm-profile__frame-empty").count()) > 0;
        if (hasImg && !hasFrame) realProfiles++;
        else if (!hasImg && hasFrame) emptyProfiles++;
      }
    }
    check(
      "profiles: 5 portraits + 17 designed empty frames, never both",
      realProfiles === 5 && emptyProfiles === 17,
      `real=${realProfiles} empty=${emptyProfiles}`,
    );

    await page.goto(`${base}/chapters?state=delta&chapter=novena-university`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(400);

    /* No keyboard trap: from inside the ledger, focus keeps moving forward. */
    const rowCount = await page.locator(".cm-ledger__row").count();
    await page.locator(".cm-ledger__row").nth(rowCount - 1).focus();
    const before = await page.evaluate(() => document.activeElement?.textContent ?? "");
    for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
    const after = await page.evaluate(() => document.activeElement?.textContent ?? "");
    check("keyboard: no trap (focus advances out of the ledger)", before !== after);

    /* axe on INTERACTED states (the default sweep only sees first paint) — both
     * with the designed empty record and with a real portrait rendered. */
    const axeEmpty = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    check(
      "axe: 0 violations with a state + chapter selected (empty president)",
      axeEmpty.violations.length === 0,
      axeEmpty.violations.map((v) => v.id).join(", "),
    );

    await page.goto(`${base}/chapters?state=delta&chapter=michael-and-cecilia-ibru-university`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(700);
    const axePortrait = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    check(
      "axe: 0 violations with a president portrait rendered",
      axePortrait.violations.length === 0,
      axePortrait.violations.map((v) => v.id).join(", "),
    );

    await ctx.close();
  }

  /* ---- deep link resolves on load ---------------------------------------- */
  {
    const { ctx, page } = await open({ width: 1440, height: 1000, url: "/chapters?state=edo" });
    check(
      "deep link: ?state=edo selects Edo State",
      (await page.locator(".cm-state__name").textContent()) === "Edo State",
    );
    const { ctx: c2, page: p2 } = await open({
      width: 1440,
      height: 1000,
      url: "/chapters?state=rivers&chapter=university-of-port-harcourt",
    });
    check(
      "deep link: ?chapter= selects the chapter",
      (await p2.locator(".cm-profile__name").textContent()) === "University of Port Harcourt",
    );
    await ctx.close();
    await c2.close();
  }

  /* ---- responsive: no horizontal overflow, map still large --------------- */
  for (const [label, width, height] of [
    ["375px", 375, 812],
    ["768px", 768, 1024],
    ["1440px", 1440, 1000],
  ]) {
    const { ctx, page } = await open({ width, height });
    const box = await page.evaluate(() => {
      const canvas = document.querySelector(".cm-canvas");
      const r = canvas?.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        w: Math.round(r?.width ?? 0),
        h: Math.round(r?.height ?? 0),
      };
    });
    check(`${label}: horizontal overflow = 0px`, box.overflow <= 0, `${box.overflow}px`);
    check(
      `${label}: map fills the available width (${box.w}x${box.h})`,
      box.w >= Math.min(width, 1248) * 0.85 && box.h > 200,
    );
    // The register is reachable in both compositions.
    check(`${label}: 6 state buttons present`, (await page.locator(".cm-rail__btn").count()) === 6);
    await ctx.close();
  }

  /* ---- reduced motion: nothing animates, everything is legible ----------- */
  {
    const { ctx, page } = await open({ width: 1440, height: 1000, reduced: true });
    await page.locator(".cm-rail__btn", { hasText: "Edo State" }).first().click();
    await page.waitForTimeout(200);
    const motion = await page.evaluate(() => {
      const route = document.querySelector('.cm-route[data-active="true"]');
      const body = document.querySelector(".cm-profile__body");
      const cs = (el) => (el ? getComputedStyle(el) : null);
      const r = cs(route);
      const b = cs(body);
      const names = [...document.querySelectorAll(".cm-ledger__name")];
      return {
        routeAnimation: r?.animationName ?? "none",
        routeDash: r?.strokeDasharray ?? "none",
        bodyAnimation: b?.animationName ?? "none",
        bodyOpacity: b?.opacity ?? "1",
        hiddenNames: names.filter((n) => getComputedStyle(n).opacity !== "1").length,
        namesTotal: names.length,
      };
    });
    check("reduced motion: route is not drawn (no animation)", motion.routeAnimation === "none", motion.routeAnimation);
    check("reduced motion: route dash removed", motion.routeDash === "none", motion.routeDash);
    check("reduced motion: record does not fade in", motion.bodyAnimation === "none", motion.bodyAnimation);
    check("reduced motion: record fully visible", motion.bodyOpacity === "1");
    check(
      "reduced motion: every chapter name is immediately visible",
      motion.namesTotal === 6 && motion.hiddenNames === 0,
      `${motion.hiddenNames}/${motion.namesTotal} hidden`,
    );
    await ctx.close();
  }

  check("runtime: no console errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

  await browser.close();
} finally {
  server.kill("SIGTERM");
}

console.log(
  failures === 0
    ? "\nChapters check passed."
    : `\nChapters check FAILED: ${failures} problem(s).`,
);
process.exitCode = failures === 0 ? 0 : 1;
