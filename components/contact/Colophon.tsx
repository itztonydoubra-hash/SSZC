/*
 * Colophon (design.md B5, D5 approved) — the institutional closing plate that
 * also serves as the site footer. The contact channels ARE the invitation
 * (larger type, email most weighted); no CTA/slogan. Final nav = the menu
 * grouping. Renders only supplied channels; omits empty columns. One name
 * line-rise is the only motion. Reads getContact() + NAV_GROUPS.
 */
import { getContact, NAV_GROUPS } from "@/content";
import { Container } from "@/components/layout/Grid";
import { DisplayHeading } from "@/components/chrome/DisplayHeading";
import { BackToTop } from "./BackToTop";

export function Colophon() {
  const c = getContact();
  const hasContact = c.email || c.phone;
  const hasSocial = c.socials.length > 0;
  const hasOffice = c.address || c.mapUrl;
  const year = new Date().getFullYear();

  return (
    <section className="surface-ink" data-surface="ink" aria-labelledby="colophon-title">
      <Container>
        <div className="col-plate">
          <div>
            {c.closingStatement ? (
              <DisplayHeading as="h2" id="colophon-title" size="xxl" className="col-name">
                {c.closingStatement}
              </DisplayHeading>
            ) : (
              <DisplayHeading as="h2" id="colophon-title" size="xl" className="col-name">
                {c.orgName}
              </DisplayHeading>
            )}

            <hr className="col-rule" />

            <div className="col-records">
              <div>
                <p className="col-records__head type-label">Contact</p>
                {hasContact ? (
                  <>
                    {c.email && (
                      <a className="col-line col-line--email type-body-l" href={`mailto:${c.email}`}>{c.email}</a>
                    )}
                    {c.phone && <a className="col-line type-body-m" href={`tel:${c.phone.replace(/\s+/g, "")}`}>{c.phone}</a>}
                  </>
                ) : (
                  <p className="type-body-m" style={{ color: "var(--stone)" }}>Official email and phone to be published.</p>
                )}
              </div>

              {/* ELSEWHERE column omitted entirely when no socials supplied. */}
              {hasSocial && (
                <div>
                  <p className="col-records__head type-label">Elsewhere</p>
                  {c.socials.map((s) => (
                    <a key={s.url} className="col-line type-body-l" href={s.url} target="_blank" rel="noreferrer noopener">
                      {s.platform} <span aria-hidden>↗</span>
                    </a>
                  ))}
                </div>
              )}

              <div>
                <p className="col-records__head type-label">Office</p>
                {hasOffice ? (
                  <>
                    {c.address && <span className="col-line type-body-m">{c.address}</span>}
                    {c.mapUrl && (
                      <a className="col-line type-body-m" href={c.mapUrl} target="_blank" rel="noreferrer noopener">
                        View map <span aria-hidden>↗</span>
                      </a>
                    )}
                  </>
                ) : (
                  <p className="type-body-m" style={{ color: "var(--stone)" }}>Office address to be published.</p>
                )}
              </div>
            </div>

            {/* Final navigation — the site's contents as a way back in. */}
            <nav aria-label="Site sections">
              <ul className="col-nav type-label">
                {NAV_GROUPS.flatMap((g) => g.items).map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-substrip type-label-s">
            <span>© {year} LAWSAN South South</span>
            {c.session && <span>{c.session}</span>}
            <BackToTop />
          </div>
        </div>
      </Container>
    </section>
  );
}
