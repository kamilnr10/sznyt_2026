import { SEO_SITE_FACTS } from "./seoSiteFacts";

/** Wzorce typowego „śmieciowego” tekstu z CMS (np. zły wklejony szkic). */
const INVALID_ABOUT_PATTERNS = [
  /seven\s+levels/i,
  /personal\s+finance/i,
  /for\s+most\s+people/i,
  /lorem\s+ipsum/i,
  /\bLorem\b.*\bipsum\b/i,
];

export function isInvalidAboutText(text) {
  if (text == null) return true;
  const s = String(text).trim();
  if (s.length < 12) return true;
  return INVALID_ABOUT_PATTERNS.some((re) => re.test(s));
}

/** Nagłówek sekcji „O nas”, gdy CMS pusty lub odrzucony. */
export const ABOUT_FALLBACK_HEADING =
  "Barbershop na Pradze Północ — fryzjer męski w Warszawie";

/**
 * Akapity pod H2 (czytelne dla ludzi i robotów).
 * Zawierają frazy typu: barbershop Warszawa, Praga Północ, strzyżenie męskie.
 */
export const ABOUT_FALLBACK_PARAGRAPHS = [
  `${SEO_SITE_FACTS.brand} to ${SEO_SITE_FACTS.legalType} w ${SEO_SITE_FACTS.districtFull}, przy ${SEO_SITE_FACTS.streetAddress}. Stawiamy na rzemiosło, spokojną atmosferę i cięcia dopasowane do Twojej głowy oraz brody — bez pośpiechu i bez „fabrycznego” podejścia.`,
  `Szukasz ${SEO_SITE_FACTS.district} dobrego fryzjera męskiego lub barbershopu w ${SEO_SITE_FACTS.city}? U nas zrobisz m.in. ${SEO_SITE_FACTS.servicesShort}. Rezerwacja online przez Booksy jest najszybszym sposobem na termin.`,
  `Działamy na ${SEO_SITE_FACTS.district}, ale gościmy też klientów z całej ${SEO_SITE_FACTS.city} i okolic. Aktualności i klimat salonu znajdziesz na Instagramie @sznytbarbershop — tam też bywają ogłoszenia o grafiku.`,
];
