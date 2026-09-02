/*
 * ChapterProfile — one chapter's record: the institution, its state, and its
 * LAWSAN President.
 *
 * DATA INTEGRITY (the reason this component looks the way it does): no chapter
 * president's name, portrait, social account, contact detail or tenure has been
 * verified yet. None of it is invented, guessed from the web, or filled with a
 * stock/AI/stand-in photograph. Instead the record shows its DESIGNED,
 * INTENTIONAL empty state — "[NEEDS CONTENT]" for the person and
 * "[OFFICIAL IMAGE]" for the portrait frame. These are deliberate content
 * states, not errors, and they are typeset as such.
 *
 * The moment real values land in the `president` field, THIS SAME component
 * renders the portrait (next/image via MaskImage), the name, the official role,
 * the tenure, the socials and the contact line. No redesign is required.
 */
import type { Chapter } from "@/content/types";
import { realOr } from "@/lib/content-display";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { MaskImage } from "@/components/chrome/MaskImage";

/** Awaiting verified content. Deliberate, designed, never an error state. */
const NEEDS_CONTENT = "[NEEDS CONTENT]";
const OFFICIAL_IMAGE = "[OFFICIAL IMAGE]";

/** The generic institutional label — not a claim about any individual. */
const PRESIDENT_LABEL = "Chapter President";

export function ChapterProfile({
  chapter,
  stateName,
}: {
  chapter: Chapter | undefined;
  stateName: string | undefined;
}) {
  if (!chapter) {
    return (
      <div className="cm-profile">
        <p className="cm-profile__label type-label">Chapter record</p>
        <p className="cm-mark type-display-m">{NEEDS_CONTENT}</p>
      </div>
    );
  }

  const president = chapter.president;
  const name = realOr(president?.name);
  const role = realOr(president?.role);
  const tenure = realOr(president?.tenure);
  const portrait = president?.portrait;
  const hasPortrait = Boolean(portrait && realOr(portrait.src));
  const socials = president?.socials?.filter((s) => realOr(s.url)) ?? [];
  const email = realOr(president?.contact?.email);
  const phone = realOr(president?.contact?.phone);
  const location = realOr(chapter.location);

  return (
    <div className="cm-profile" key={chapter.slug}>
      <div className="cm-profile__body">
        <p className="cm-profile__label type-label">Chapter</p>
        <DisplayHeading as="h3" size="m" reveal={false} className="cm-profile__name">
          {chapter.institution}
        </DisplayHeading>
        <p className="cm-profile__meta type-body-s">
          {stateName}
          {location ? ` · ${location}` : ""}
        </p>

        <p className="cm-profile__label type-label">{PRESIDENT_LABEL}</p>

        {/* The portrait frame is ALWAYS present, directly under the President
            label it belongs to, so the record is compositionally complete
            whether or not the official photograph has been supplied. */}
        <div className="cm-profile__frame">
          {hasPortrait && portrait ? (
            <MaskImage
              src={portrait.src}
              alt={portrait.alt}
              ratio={portrait.ratio || "4 / 5"}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 26vw"
            />
          ) : (
            <div className="cm-profile__frame-empty">
              <span className="cm-mark type-label-s">{OFFICIAL_IMAGE}</span>
            </div>
          )}
        </div>

        {name ? (
          <>
            <p className="cm-profile__person type-display-m">{name}</p>
            {role && <p className="cm-profile__meta type-body-s">{role}</p>}
            {tenure && <p className="cm-profile__meta type-body-s tnum">{tenure}</p>}
          </>
        ) : (
          <p className="cm-mark type-display-m">{NEEDS_CONTENT}</p>
        )}

        {(socials.length > 0 || email || phone) && (
          <ul className="cm-profile__links">
            {socials.map((s) => (
              <li key={s.url}>
                <a className="type-label" href={s.url} rel="noopener noreferrer" target="_blank">
                  {s.platform}
                </a>
              </li>
            ))}
            {email && (
              <li>
                <a className="type-label" href={`mailto:${email}`}>
                  Email
                </a>
              </li>
            )}
            {phone && (
              <li>
                <a className="type-label" href={`tel:${phone.replace(/\s+/g, "")}`}>
                  {phone}
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
