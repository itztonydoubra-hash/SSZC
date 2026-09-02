# Content Source Record (Phase 17 — real content recovery)

Verification log for populated facts. Not for public display — for maintenance
and audit. Instagram (the primary source) could not be programmatically accessed
by the automated tooling; items depending solely on Instagram are recorded as
"requires confirmation" and left as intentional empty states (never fabricated).

## Populated — verified

| Domain | Item | Fact | Source | Confidence |
|---|---|---|---|---|
| Leadership | Zonal Director | **Effiong Valour Daniel, COL** — South South Zonal Director, Directorate of Programs, Policies and Projects (DOPPP), LAWSAN | Client (site owner) — authoritative; corroborated by interview below | High (client-confirmed) |
| Leadership | Zonal Director — corroboration | "Valour Effiong, a 400-level Law student at Arthur Jarvis University, Calabar"; held Cross River State Directorate roles incl. **Director of Policies, Programmes and Projects, LAWSAN, Cross River state** (progression consistent with a zonal DOPPP role) | Eunoia Youth / The Impact Insights interview, Nov 2025 — https://eunoiayouth.substack.com/p/the-voice-of-change-an-interview | High |
| Leadership | Zonal Director — portrait | Official portrait supplied by client | Client-supplied (chat) | High — **file must be placed at `public/leadership/effiong-valour-daniel.jpg`** |
| Chapters | States + recognised chapters | **6 states, 22 chapters** — Cross River (2), Akwa Ibom (2), Rivers (2), Bayelsa (3), Delta (7), Edo (6) | Client (site owner) — authoritative | High (client-confirmed) |
| Chapters | Chapter presidents — **5 of 22** | Arthur Jarvis University — **Edem Divine Agbor, SAL**; Hensard University — **Elijah Christian Fonikimi**; Michael and Cecilia Ibru University — **Plaku Jessica Pere-ere, SAL**; Edo State University, Iyamho — **Omorhienrhien Princess Abieyuwa**; Glorious Vision University — **Jude Ayobami Abe** | Client-supplied Google Drive folder of official portraits; each file named with the president's name and their chapter | High (client-supplied) |
| Chapters | Chapter-president portraits | Official portraits for the five presidents above, placed in `public/chapters/` | Client-supplied (Drive) | High — preparation + crop boxes recorded in `public/chapters/README.md` |
| About | The Zone — full narrative copy | Statement, history, purpose, values, vision, mission, role within LAWSAN, scope and coda — as published on `/about` | Client (site owner) — approved copy, transcribed verbatim | High (client-supplied) |
| About | Supporting photograph | Outreach photograph — schoolchildren holding exercise books outside a school building | Client-supplied (chat) | High for the file; **what it documents is UNCONFIRMED** — no event/place/date attached, no caption set |

### Chapters — editorial normalisations applied (confirm with client)

The supplied list was transcribed verbatim except for three consistency fixes.
None adds or removes an institution; all 22 supplied chapters are present.

1. **"Port Harcourt" → "Rivers State".** The client's third grouping was headed
   "Port Harcourt", which is a city, not a state; the other five groupings are
   states. Both institutions under it (Rivers State University, University of
   Port Harcourt) are in Rivers State, and the South South zone is defined by its
   six states. **If LAWSAN's own name for this chapter grouping is genuinely
   "Port Harcourt", revert this.**
2. **"Akwa Ibom" → "Akwa Ibom State"**, for consistency with the other five.
3. **Title case on "of"/"and"** in institution names — "University Of Calabar" →
   "University of Calabar", "Michael And Cecilia Ibru University" → "Michael and
   Cecilia Ibru University", etc. This is the institutions' own standard form.

### Chapter presidents — names transcribed from the supplied file names

The five portraits arrived named with the president's name and their chapter. The
names were transcribed verbatim except for these presentational normalisations:

- **Honorific dropped.** `H.E EDEM, DIVINE AGBOR SAL` → **Edem Divine Agbor, SAL**
  ("H.E" is an honorific, not part of the name; the post-nominal `SAL` is kept
  after a comma, matching the existing `Effiong Valour Daniel, COL` treatment).
- **Title case.** `OMORHIENRHIEN PRINCESS ABIEYUWA` → **Omorhienrhien Princess
  Abieyuwa** (the file was all-caps; every other name on the site is title case).
- **Double spaces collapsed** in `Jude  Ayobami Abe` and `Plaku Jessica Pere-ere`.

**Supplied but NOT yet displayed — needs a client decision:** the Michael and
Cecilia Ibru University file names the chapter's faculty, *Edward Sido Faculty of
Law*. No other chapter supplied a faculty name, so it is recorded here rather than
shown for one chapter out of 22. Confirm whether faculty names should be
displayed for all chapters (they would need supplying for the rest).

`role`, `tenure`, `socials` and `contact` are unset for all five — none was
supplied, and none may be inferred. The other **17** chapters have no `president`
at all and show `CHAPTER PRESIDENT / [NEEDS CONTENT]` with an `[OFFICIAL IMAGE]`
frame; `location` is set only for Edo State University (*Iyamho*, supplied with
the portrait). See decisions.md **D6** and **D7**.

4. **Chapter total: 22, not 25.** A later brief for the Chapters rebuild stated
   "25 chapters", but its own per-state lists and per-state totals enumerate the
   same **22** institutions recorded here (2 + 2 + 2 + 3 + 7 + 6 = 22). The
   enumerated institutions were kept; three institutions were **not** invented to
   reach 25. Every count in the UI is derived from these records. **Confirm the
   intended total with the client.**

Note: the interview names his *institution* (Arthur Jarvis University, Calabar)
and prior *state-level* roles. These are personal/state facts, not the zone's
organisational history, so they are NOT used to populate About/Archive as
current zonal content.

## Requires client confirmation — NOT published (kept as empty states)

| Domain | Lead | Why not published |
|---|---|---|
| Leadership | Agbaso Perpetual — Deputy Zonal Director | No publicly-verifiable corroboration found; Instagram not accessible. Needs official confirmation. |
| Leadership | Ifiemi-Ikpaikpai Tari Excel — Director of Editorials and Writing | Same as above. |
| Events | South South Zonal Convention 2026 (Cross River, Sept 2026) | Exact date/venue conflicting across promo material per brief; only official flyer/programme can confirm. Not verifiable via accessible sources. |
| Events | South South Moot Competition 2026 | Dates/results/participants unverifiable via accessible sources. |
| Events/Projects | Operation SDG 4 / Children's Day outreach (≈ May 2026) | Details only on Instagram; not independently verifiable. |
| Publications | Call for Submissions; 2026 editorial pieces | Exact title/deadline/authors only on the original post. |
| Contact | email / office / socials | No official email, address or social handles supplied. (Phone **09017467997**, Effiong Valour — client-supplied, published.) |
| Chapters | Chapter presidents — the other **17** | 5 of 22 supplied (see the table above). The remaining 17 have no name and no portrait; each shows the designed `[NEEDS CONTENT]` / `[OFFICIAL IMAGE]` state. |
| Chapters | Presidents' role wording, tenure, socials, contact | Not supplied for ANY president, including the five with portraits. Fields exist in the schema and render automatically once supplied. |
| Impact | any statistic | No confirmed official figure found — Impact remains statistic-free by design. |
| Media | 2026 photographs | On Instagram; usage rights unclear; not rehosted. |

## Rejected as not-current / not-South-South
- Unrelated "Daniel Etim Effiong" (actor) — different person, discarded.
- UN "South-South cooperation" SDG results — different meaning of "South South", discarded.
- Cross River State politics results — unrelated, discarded.
