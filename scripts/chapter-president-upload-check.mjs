/*
 * Build-time verification for the filename-driven chapter-president upload
 * seam. It uses isolated temporary directories and a synthetic image only; no
 * repository upload, output, or manifest is touched.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const PROCESSOR = path.join(ROOT, "scripts", "process-chapter-presidents.mjs");
const TEMP_CHAPTER = "university-of-calabar";
const VALID_FILE = `${TEMP_CHAPTER}__Adaeze Okafor.jpg`;
const VALID_OUTPUT = "auto-university-of-calabar--adaeze-okafor.jpg";
const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "chapter-president-check-"));
const uploadDir = path.join(tempRoot, "uploads");
const outputDir = path.join(tempRoot, "output");
const manifestPath = path.join(tempRoot, "manifest.json");

async function runProcessor() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [PROCESSOR], {
      cwd: ROOT,
      env: {
        ...process.env,
        CHAPTER_PRESIDENT_UPLOAD_DIR: uploadDir,
        CHAPTER_PRESIDENT_OUTPUT_DIR: outputDir,
        CHAPTER_PRESIDENT_MANIFEST_PATH: manifestPath,
      },
    });
    let output = "";
    child.stdout.on("data", (chunk) => (output += chunk));
    child.stderr.on("data", (chunk) => (output += chunk));
    child.on("close", (code) => resolve({ code, output }));
  });
}

async function writeFixture(fileName, buffer) {
  await fs.writeFile(path.join(uploadDir, fileName), buffer);
}

async function removeFiles(fileNames) {
  await Promise.all(
    fileNames.map((fileName) => fs.rm(path.join(uploadDir, fileName), { force: true })),
  );
}

const fixture = await sharp({
  create: {
    width: 1600,
    height: 900,
    channels: 3,
    background: { r: 35, g: 54, b: 47 },
  },
})
  .withMetadata({ orientation: 6 })
  .jpeg()
  .toBuffer();

const temporaryFiles = [
  VALID_FILE,
  "university-of-calabar-Adaeze.jpg",
  "not-a-real-chapter__Adaeze.jpg",
  "university-of-calabar__Adaeze One.jpg",
  "university-of-calabar__Adaeze Two.jpg",
];

try {
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(manifestPath, "{}\n", "utf8");

  await writeFixture(VALID_FILE, fixture);
  const valid = await runProcessor();
  assert.equal(valid.code, 0, valid.output);

  const outputMetadata = await sharp(path.join(outputDir, VALID_OUTPUT)).metadata();
  const generatedRecords = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const generated = generatedRecords[TEMP_CHAPTER];
  assert.equal(outputMetadata.format, "jpeg");
  assert.equal(outputMetadata.width, 900);
  assert.equal(outputMetadata.height, 1125);
  assert.equal(outputMetadata.width / outputMetadata.height, 4 / 5);
  assert.equal(outputMetadata.width <= 1000 && outputMetadata.height <= 1250, true);
  assert.equal(outputMetadata.exif, undefined);
  assert.equal(outputMetadata.orientation, undefined);
  assert.equal(generated.name, "Adaeze Okafor");
  assert.equal(generated.portrait.src, `/chapters/${VALID_OUTPUT}`);
  assert.equal(
    generated.portrait.alt,
    "Adaeze Okafor, LAWSAN chapter president, University of Calabar",
  );
  assert.equal(generated.portrait.ratio, "4 / 5");
  console.log("✓ valid upload is converted, cropped, stripped, and manifested");

  await removeFiles([VALID_FILE]);
  await writeFixture("university-of-calabar-Adaeze.jpg", fixture);
  const malformed = await runProcessor();
  assert.notEqual(malformed.code, 0);
  assert.match(malformed.output, /Invalid chapter-president filename/);
  console.log("✓ malformed filename is rejected");

  await removeFiles(["university-of-calabar-Adaeze.jpg"]);
  await writeFixture("not-a-real-chapter__Adaeze.jpg", fixture);
  const unknown = await runProcessor();
  assert.notEqual(unknown.code, 0);
  assert.match(unknown.output, /Unknown or invalid chapter slug/);
  console.log("✓ unknown chapter slug is rejected");

  await removeFiles(["not-a-real-chapter__Adaeze.jpg"]);
  await writeFixture("university-of-calabar__Adaeze One.jpg", fixture);
  await writeFixture("university-of-calabar__Adaeze Two.jpg", fixture);
  const duplicate = await runProcessor();
  assert.notEqual(duplicate.code, 0);
  assert.match(duplicate.output, /More than one upload targets university-of-calabar/);
  console.log("✓ duplicate chapter uploads are rejected");
} finally {
  await fs.rm(tempRoot, { recursive: true, force: true });
}

console.log("\nChapter-president upload check passed.");
