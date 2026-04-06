import { SEO_SITE_FACTS } from "./seoSiteFacts";

/**
 * Wspólna treść: widoczna sekcja FAQ na stronie + FAQPage w JSON-LD.
 * Utrzymuj te same odpowiedzi w obu miejscach.
 */
export function getSeoFaqItems(siteUrlBase) {
  const base = String(siteUrlBase || "").replace(/\/$/, "");
  const addr = `${SEO_SITE_FACTS.streetAddress}, ${SEO_SITE_FACTS.districtFull}`;

  return [
    {
      q: `Czym jest ${SEO_SITE_FACTS.brand}?`,
      a: `${SEO_SITE_FACTS.brand} to ${SEO_SITE_FACTS.legalType} w ${SEO_SITE_FACTS.districtFull} (${SEO_SITE_FACTS.city}). Specjalizujemy się w ${SEO_SITE_FACTS.servicesShort}.`,
    },
    {
      q: "Gdzie dokładnie znajduje się barbershop SZNYT w Warszawie?",
      a: `Adres salonu: ${addr}. Dzielnica: ${SEO_SITE_FACTS.district}. Salon jest często wybierany przez osoby szukające „barbershop Praga Północ” lub „fryzjer męski Warszawa Praga”.`,
    },
    {
      q: "Jak zarezerwować wizytę w SZNYT Barbershop?",
      a: `Najszybsza rezerwacja jest online przez Booksy: ${SEO_SITE_FACTS.booksyUrl}. Możesz też napisać przez formularz kontaktowy na stronie${base ? ` ${base}/` : ""} (sekcja Kontakt).`,
    },
    {
      q: "Jakie usługi oferuje SZNYT Barbershop?",
      a: `W ofercie m.in. ${SEO_SITE_FACTS.servicesShort}. To zakres typowy dla dobrego barbershopu męskiego w ${SEO_SITE_FACTS.city}.`,
    },
    {
      q: "W jakich godzinach działa SZNYT na Pradze Północ?",
      a: SEO_SITE_FACTS.openingNote,
    },
    {
      q: "Gdzie znaleźć SZNYT w social mediach?",
      a: `Instagram: ${SEO_SITE_FACTS.instagramUrl}. Facebook: ${SEO_SITE_FACTS.facebookUrl}.${base ? ` Oficjalna witryna: ${base}/.` : ""}`,
    },
  ];
}
