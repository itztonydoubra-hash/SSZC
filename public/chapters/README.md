# public/chapters — official chapter-president portraits

Client-supplied official portraits, referenced from `content/data/chapters.ts`.
**Do not substitute stock, AI-generated or unrelated photographs.** A chapter with
no portrait here shows the designed `[OFFICIAL IMAGE]` frame instead — that is the
intended state, not a bug.

| File | President | Chapter |
|---|---|---|
| `edem-divine-agbor.jpg` | Edem Divine Agbor, SAL | Arthur Jarvis University (Cross River) |
| `elijah-christian-fonikimi.jpg` | Elijah Christian Fonikimi | Hensard University (Bayelsa) |
| `plaku-jessica-pere-ere.jpg` | Plaku Jessica Pere-ere, SAL | Michael and Cecilia Ibru University (Delta) |
| `omorhienrhien-princess-abieyuwa.jpg` | Omorhienrhien Princess Abieyuwa | Edo State University, Iyamho (Edo) |
| `jude-ayobami-abe.jpg` | Jude Ayobami Abe | Glorious Vision University (Edo) |

## Preparation applied

Every file is an **editorial 4:5 portrait crop** (matching the Leadership
register's 4:5 and the empty frame's aspect ratio), downscaled to at most
1000×1250, saved as an optimised progressive JPEG at quality 82, with **all EXIF
metadata stripped** (the originals carried camera timestamps).

Crop boxes below are `x, y, w, h` in the ORIGINAL pixels, chosen per photograph
so the head keeps headroom and the frame reaches the torso/hands. Re-crop from
the originals in the client's Drive folder if any framing needs revising.

| File | Original | Crop box | Output |
|---|---|---|---|
| `edem-divine-agbor.jpg` | 1024×1280 | none (already 4:5) | 1000×1250 |
| `elijah-christian-fonikimi.jpg` | 552×536 | 106, 0, 428, 535 | 428×535 |
| `jude-ayobami-abe.jpg` | 810×1080 | 80, 30, 700, 875 | 700×875 |
| `omorhienrhien-princess-abieyuwa.jpg` | 1986×2560 | 260, 120, 1500, 1875 | 1000×1250 |
| `plaku-jessica-pere-ere.jpg` | 3024×4032 | 470, 1100, 1840, 2300 | 1000×1250 |

`elijah-christian-fonikimi.jpg` is **low resolution** (the supplied original is
552×536 and slightly soft). It is used at its native size rather than upscaled —
a higher-resolution original would improve it.

## Adding the remaining presidents

Add the portrait here, then set `president` on that chapter in
`content/data/chapters.ts`:

```ts
president: {
  name: "…",                       // exactly as supplied
  portrait: {
    src: "/chapters/<file>.jpg",
    alt: "…, LAWSAN chapter president, <Institution>",
    ratio: "4 / 5",
  },
},
```

`role`, `tenure`, `socials` and `contact` are optional and render automatically
once supplied — no design change is needed. Never fill them in from guesswork.
