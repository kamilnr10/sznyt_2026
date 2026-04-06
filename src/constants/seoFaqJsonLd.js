/**
 * FAQPage — JSON-LD (spójne z widoczną sekcją FAQ na landingu).
 */
export function buildFaqJsonLd(items, siteUrl) {
  const base = siteUrl.replace(/\/$/, "");

  return {
    "@type": "FAQPage",
    "@id": `${base}/#faq`,
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}
