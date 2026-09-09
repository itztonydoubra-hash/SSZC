# public/chapters — generated chapter-president portraits

These are the optimised JPEG derivatives used by chapter profiles. The five
initial files were client-supplied official portraits. New files are generated
at build time by `scripts/process-chapter-presidents.mjs` from uploads in
`content/uploads/chapter-presidents/`.
**Do not substitute stock, AI-generated or unrelated photographs.** A chapter
with no portrait shows the designed `[OFFICIAL IMAGE]` frame instead — that is
the intended state, not a bug.

| File | President | Chapter |
|---|---|---|
| `edem-divine-agbor.jpg` | Edem Divine Agbor, SAL | Arthur Jarvis University (Cross River) |
| `elijah-christian-fonikimi.jpg` | Elijah Christian Fonikimi | Hensard University (Bayelsa) |
| `plaku-jessica-pere-ere.jpg` | Plaku Jessica Pere-ere, SAL | Michael and Cecilia Ibru University (Delta) |
| `omorhienrhien-princess-abieyuwa.jpg` | Omorhienrhien Princess Abieyuwa | Edo State University, Iyamho (Edo) |
| `jude-ayobami-abe.jpg` | Jude Ayobami Abe | Glorious Vision University (Edo) |

## Preparation applied

Every generated file is an **editorial 4:5 portrait crop**, downscaled to at
most 1000×1250, saved as an optimised progressive JPEG at quality 82, and
written without EXIF metadata. The processor rotates according to the source
camera orientation before cropping.

The original five files were manually framed from the supplied portraits. The
processor uses a centre-of-attention crop for future uploads and does not
upscale small originals.

## Adding the remaining presidents

Follow the plain-language instructions in
`content/uploads/chapter-presidents/README.md`, or use GitHub's **Add file** →
**Upload files** flow in that folder. Do not edit `content/data/chapters.ts`,
the generated manifest, or this directory by hand for a new upload. The build
will create the derivative and the matching chapter record automatically.
