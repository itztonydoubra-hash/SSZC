/*
 * Contact content (design.md B5 colophon). PLACEHOLDER STATE.
 *
 * The official email, phone, address, map link and social URLs have NOT been
 * supplied, so those fields are OMITTED (undefined) — the colophon renders only
 * supplied channels and omits empty columns (design.md B5). We do NOT invent
 * contact details.
 *
 * `orgName` is the organisation's full legal name — a factual, publicly-known
 * identity of the association, used as the colophon's anchor (design.md B5 shows
 * this exact name as the [OFFICIAL NAME] slot). No closing statement is forced;
 * the name alone carries it until an approved statement is supplied.
 */
import type { Contact } from "../types";

export const contact: Contact = {
  orgName: "Law Students' Association of Nigeria, South South Zone",
  // closingStatement omitted — no slogan forced (design.md B5).
  // Verified contact line supplied by the client (site owner):
  phone: "09017467997",
  phoneName: "Effiong Valour",
  // email/address/mapUrl omitted — not yet supplied, never invented.
  socials: [], // official social URLs not yet supplied.
  // session omitted — not yet supplied.
};
