/*
 * ============================================================================
 * CHAPTER PRESIDENT UPLOAD PROCESSOR
 * ============================================================================
 * GitHub upload convention (the only manual step):
 *
 *   content/uploads/chapter-presidents/<chapter-slug>__<president-name>.<ext>
 *
 * Example:
 *   content/uploads/chapter-presidents/university-of-calabar__Adaeze Okafor.jpg
 *
 * The part BEFORE `__` must be one of the 22 chapter slugs in
 * content/data/chapters.ts. The part AFTER `__` is displayed as the president's
 * name exactly as written (before the file extension). The build then:
 *
 *   1. validates the chapter slug and filename;
 *   2. rotates according to camera metadata, crops to the site's 4:5 editorial
 *      portrait frame, downsizes to at most 1000×1250, strips metadata and
 *      writes an optimised progressive JPEG to public/chapters/;
 *   3. writes the name + factual alt + image path to the generated content
 *      manifest consumed by content/data/chapters.ts;
 *   4. lets the normal Next static build copy the result into out/.
 *
 * No component imports this file or the uploads folder. This is a build-time
 * content-ingestion seam, not a second UI data source. The generated manifest
 * is the only thing the content data module consumes.
 * ============================================================================
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const UPLOAD_DIR = process.env.CHAPTER_PRESIDENT_UPLOAD_DIR
  ? path.resolve(process.env.CHAPTER_PRESIDENT_UPLOAD_DIR)
  : path.join(ROOT, "content", "uploads", "chapter-presidents");
const OUTPUT_DIR = process.env.CHAPTER_PRESIDENT_OUTPUT_DIR
  ? path.resolve(process.env.CHAPTER_PRESIDENT_OUTPUT_DIR)
  : path.join(ROOT, "public", "chapters");
const MANIFEST_PATH = process.env.CHAPTER_PRESIDENT_MANIFEST_PATH
  ? path.resolve(process.env.CHAPTER_PRESIDENT_MANIFEST_PATH)
  : path.join(ROOT, "content", "data", "chapter-presidents.generated.json");
const CHAPTER_DATA_PATH = path.join(ROOT, "content", "data", "chapters.ts");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const IGNORED_FILES = new Set(["README.md"]);
const OUTPUT_WIDTH = 1000;
const OUTPUT_HEIGHT = 1250;

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function chapterDirectory(source) {
  const entries = [
    ...source.matchAll(
      /institution:\s*"([^"]+)"[\s\S]{0,180}?slug:\s*"([a-z0-9]+(?:-[a-z0-9]+)*)"/g,
    ),
  ].map((match) => ({ institution: match[1], slug: match[2] }));

  const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  if (bySlug.size !== 22) {
    throw new Error(
      `Could not safely read all 22 chapter slugs from ${CHAPTER_DATA_PATH}; found ${bySlug.size}. Refusing to process uploads.`,
    );
  }
  return bySlug;
}

function outputSlug(name) {
  return (
    name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "president"
  );
}

function parseUpload(fileName, chapters) {
  if (IGNORED_FILES.has(fileName)) return null;

  const ext = path.extname(fileName).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(ext)) {
    throw new Error(
      `Unsupported file "${fileName}" in the chapter-president upload folder. Use README.md or a .jpg, .jpeg, .png, .webp, or .avif image.`,
    );
  }

  const base = path.basename(fileName, ext);
  const separators = [...base.matchAll(/__/g)].map((match) => match.index);
  if (separators.length !== 1) {
    throw new Error(
      `Invalid chapter-president filename "${fileName}". Use <chapter-slug>__<president-name>.<jpg|jpeg|png|webp|avif>.`,
    );
  }

  const separator = separators[0];
  const chapterSlug = base.slice(0, separator);
  const presidentName = base.slice(separator + 2);
  const chapter = chapters.get(chapterSlug);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(chapterSlug) || !chapter) {
    throw new Error(
      `Unknown or invalid chapter slug "${chapterSlug}" in "${fileName}". Valid slugs: ${[...chapters.keys()].join(", ")}`,
    );
  }
  if (
    !presidentName ||
    presidentName !== presidentName.trim() ||
    /[\u0000-\u001f\u007f]/.test(presidentName)
  ) {
    throw new Error(
      `Missing or malformed president name in "${fileName}". Put the exact displayed name after the __ separator.`,
    );
  }

  return { fileName, ext, chapterSlug, presidentName, chapter };
}

function orientedDimensions(metadata) {
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  if (!width || !height) {
    throw new Error("Image has no readable pixel dimensions.");
  }

  // EXIF orientations 5–8 rotate the pixel rectangle by 90 degrees.
  return metadata.orientation && metadata.orientation >= 5 && metadata.orientation <= 8
    ? { width: height, height: width }
    : { width, height };
}

function outputDimensions({ width, height }) {
  // Pick a 4:5 crop that fits inside the source, then choose the largest exact
  // 4:5 integer size that stays within the 1000×1250 output ceiling. The
  // resize itself can therefore never enlarge a small supplied portrait.
  const cropWidth = Math.min(width, Math.floor((height * 4) / 5));
  const maxWidth = Math.min(OUTPUT_WIDTH, cropWidth);
  const outputWidth = Math.max(4, maxWidth - (maxWidth % 4));
  const outputHeight = Math.min(OUTPUT_HEIGHT, (outputWidth / 4) * 5);
  return { width: outputWidth, height: outputHeight };
}

const chapterSource = await fs.readFile(CHAPTER_DATA_PATH, "utf8");
const chapters = chapterDirectory(chapterSource);
const records = JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
if (!records || Array.isArray(records) || typeof records !== "object") {
  throw new Error(`Chapter-president manifest is not an object: ${MANIFEST_PATH}`);
}
for (const slug of Object.keys(records)) {
  if (!chapters.has(slug)) {
    throw new Error(`Chapter-president manifest contains unknown chapter slug: ${slug}`);
  }
}

await fs.mkdir(UPLOAD_DIR, { recursive: true });
const entries = await fs.readdir(UPLOAD_DIR, { withFileTypes: true });
const fileNames = entries
  .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
  .map((entry) => entry.name);
const uploads = fileNames.map((name) => parseUpload(name, chapters)).filter(Boolean);
const seen = new Set();

for (const upload of uploads) {
  if (seen.has(upload.chapterSlug)) {
    throw new Error(
      `More than one upload targets ${upload.chapterSlug}. Keep one file per chapter in the upload folder.`,
    );
  }
  seen.add(upload.chapterSlug);
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
const obsoleteAssets = [];

/* Generated records are derived from files in the upload folder. If a processed
 * upload is intentionally deleted, withdraw its generated record and derivative;
 * the five hand-curated seed portraits remain because their files are not auto-
 * generated. This keeps the generated manifest reproducible from the folder. */
for (const [slug, record] of Object.entries(records)) {
  if (record?.portrait?.src?.startsWith("/chapters/auto-") && !seen.has(slug)) {
    obsoleteAssets.push(path.join(OUTPUT_DIR, path.basename(record.portrait.src)));
    delete records[slug];
  }
}


if (uploads.length === 0) {
  console.log("Chapter president processor: no new uploads; existing records preserved.");
} else {
  console.log(`Chapter president processor: ${uploads.length} upload(s) found.`);
}

for (const upload of uploads) {
  const input = path.join(UPLOAD_DIR, upload.fileName);
  const outName = `auto-${upload.chapterSlug}--${outputSlug(upload.presidentName)}.jpg`;
  const output = path.join(OUTPUT_DIR, outName);
  const previous = records[upload.chapterSlug]?.portrait?.src;
  const sourceMetadata = await sharp(input).metadata();
  const dimensions = outputDimensions(orientedDimensions(sourceMetadata));
  const stagedOutput = path.join(OUTPUT_DIR, `.${outName}.${process.pid}.tmp`);

  try {
    await sharp(input)
      .rotate()
      .resize({
        width: dimensions.width,
        height: dimensions.height,
        fit: "cover",
        position: "attention",
      })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(stagedOutput);
    await fs.rename(stagedOutput, output);
  } catch (error) {
    await fs.rm(stagedOutput, { force: true });
    throw error;
  }

  // Remove a prior generated derivative only after the replacement has been
  // written successfully. Hand-curated files are never deleted by this script.
  if (previous?.startsWith("/chapters/auto-") && previous !== `/chapters/${outName}`) {
    obsoleteAssets.push(path.join(OUTPUT_DIR, path.basename(previous)));
  }

  records[upload.chapterSlug] = {
    ...(records[upload.chapterSlug] ?? {}),
    name: upload.presidentName,
    portrait: {
      src: `/chapters/${outName}`,
      alt: `${upload.presidentName}, LAWSAN chapter president, ${upload.chapter.institution}`,
      ratio: "4 / 5",
    },
  };

  const metadata = await sharp(output).metadata();
  console.log(
    `  ${upload.chapterSlug}: ${upload.presidentName} → ${outName} (${metadata.width}×${metadata.height})`,
  );
}

/* Validate every manifest portrait before Next reads the content. This catches
 * a deleted/renamed uploaded derivative as a clear build error, not a broken
 * image in the browser. */
for (const [slug, record] of Object.entries(records)) {
  if (!record?.portrait?.src) {
    throw new Error(`President record for ${slug} has no portrait src.`);
  }
  if (!/^\/chapters\/[a-z0-9][a-z0-9-]*\.jpe?g$/.test(record.portrait.src)) {
    throw new Error(`President portrait for ${slug} must be a safe /chapters/*.jpg path.`);
  }
  const asset = path.join(OUTPUT_DIR, path.basename(record.portrait.src));
  if (!(await exists(asset))) {
    throw new Error(`President portrait for ${slug} is missing: ${asset}`);
  }
}

const stagedManifest = `${MANIFEST_PATH}.${process.pid}.tmp`;
try {
  await fs.writeFile(stagedManifest, `${JSON.stringify(records, null, 2)}\n`, "utf8");
  await fs.rename(stagedManifest, MANIFEST_PATH);
} catch (error) {
  await fs.rm(stagedManifest, { force: true });
  throw error;
}
for (const asset of obsoleteAssets) await fs.rm(asset, { force: true });
console.log(`Chapter president manifest written: ${path.relative(ROOT, MANIFEST_PATH)}`);
