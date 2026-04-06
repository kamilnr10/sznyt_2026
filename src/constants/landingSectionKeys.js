/**
 * Unikalne klucze sekcji landingu — mapowanie na modele DatoCMS, testy, analityka.
 * Na stronie: atrybut data-section-key na korzeniu każdej sekcji.
 *
 * Widoczne kickery (etykiety nad nagłówkami), obecnie w UI:
 * hero — (brak małej etykiety)
 * our-story — SZNYT
 * philosophy — Filozofia
 * experience-mirror — Lustro
 * gallery — Galeria
 * prague-north — Praga Północ
 * story-video — Salon w ruchu (wideo z CMS)
 * team — (nagłówek Zespół)
 * contact — Kontakt
 * location — Lokalizacja
 * faq — FAQ w dolnej zwijanej belce (FaqDockBar), spójne z JSON-LD
 */
export const LANDING_SECTION_KEYS = {
  HERO: "hero",
  /** Blok „O nas” + zdjęcie (treść z CMS ourstory) */
  OUR_STORY: "our-story",
  /** Pas na czystym tle — filozofia */
  PHILOSOPHY: "philosophy",
  /** Full-bleed z lustrem */
  EXPERIENCE_MIRROR: "experience-mirror",
  GALLERY: "gallery",
  /** Full-bleed z fotelami / Praga */
  PRAGUE: "prague-north",
  /** Wideo z rekordu ourstory (DatoCMS) */
  STORY_VIDEO: "story-video",
  TEAM: "team",
  CONTACT: "contact",
  LOCATION: "location",
  FAQ: "faq",
};
