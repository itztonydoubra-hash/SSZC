# Upload chapter-president portraits here

This folder is the only place you need to use for a new chapter-president portrait. On every production build, the site automatically validates each upload, rotates it using its camera orientation, crops it to the profile's 4:5 frame, converts it to an optimised JPEG, and adds the president to the matching chapter profile.

## GitHub Add files workflow

1. Open the repository on GitHub.
2. Open `content` → `uploads` → `chapter-presidents`.
3. Choose **Add file** → **Upload files**.
4. Give the image this exact filename pattern:

   ```text
   <chapter-slug>__<president-name>.<extension>
   ```

   Example:

   ```text
   university-of-calabar__Adaeze Okafor.jpg
   ```

5. Commit the upload to `main`.

The next build/deployment processes the image. You do **not** need to edit
`content/data/chapters.ts`, the generated manifest, or `public/chapters/`.

## Rules

- The chapter slug must exactly match one of the recognised chapter slugs. Use lowercase letters, numbers, and hyphens.
- Use exactly one `__` separator. Everything after it, before the extension, becomes the president's displayed name exactly as written.
- Supported source extensions are `.jpg`, `.jpeg`, `.png`, `.webp`, and `.avif`.
- Upload only one portrait for each chapter. A second file for the same chapter makes the build fail clearly instead of silently choosing one.
- Use an official portrait and an officially supplied name. Do not add a role, tenure, social account, contact detail, or other information that has not been supplied and verified.
- If you need to replace a pending upload, remove the old file before adding the new file so that only one filename targets the chapter.

The generated JPEG is written to `public/chapters/`, and the generated record is
written to `content/data/chapter-presidents.generated.json` during each build.
They are build artifacts: the deployment host creates them from the uploaded
source image before exporting the site; you do not need to upload generated
files manually.
