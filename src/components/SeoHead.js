import { useEffect } from "react";
import { SEO_SITE_FACTS } from "../constants/seoSiteFacts";
import { getSeoFaqItems } from "../constants/seoFaqContent";
import { buildFaqJsonLd } from "../constants/seoFaqJsonLd";

/**
 * Canonical, Open Graph, JSON-LD: HairSalon + FAQPage (SEO + spójność z widocznym FAQ).
 */
export default function SeoHead() {
  useEffect(() => {
    const fromEnv = process.env.REACT_APP_SITE_URL?.trim().replace(/\/$/, "");
    const base =
      fromEnv ||
      (typeof window !== "undefined" ? window.location.origin : "") ||
      "";

    if (!base) return;

    const pageUrl = `${base}/`;

    const setMetaProperty = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setMetaName = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    setMetaProperty("og:url", pageUrl);
    setMetaProperty("og:image", `${base}/logo512.png`);

    const metaDescription =
      "SZNYT Barbershop — barbershop i fryzjer męski na Pradze Północ w Warszawie, ul. Wrzesińska 6. Strzyżenie męskie, broda, styl. Rezerwacja Booksy. Szukasz barbershopu lub fryzjera na Pradze?";

    setMetaName("description", metaDescription);
    setMetaProperty("og:description", metaDescription);

    const prev = document.getElementById("seo-ld-json-graph");
    if (prev) prev.remove();

    const longDesc = `${SEO_SITE_FACTS.brand} — ${SEO_SITE_FACTS.legalType} w ${SEO_SITE_FACTS.districtFull}, ${SEO_SITE_FACTS.streetAddress}. Strzyżenie męskie, broda, styl. Rezerwacja przez Booksy. Polecany barbershop Praga Północ i fryzjer męski Warszawa.`;

    const faqItems = getSeoFaqItems(base);

    const hairSalon = {
      "@type": "HairSalon",
      "@id": `${pageUrl}#business`,
      name: SEO_SITE_FACTS.brand,
      alternateName: "SZNYT",
      slogan: "Precyzja i klimat — barbershop na Pradze Północ w Warszawie",
      description: longDesc,
      url: pageUrl,
      image: `${base}/logo512.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: SEO_SITE_FACTS.streetAddress,
        addressLocality: SEO_SITE_FACTS.city,
        addressRegion: "woj. mazowieckie",
        addressCountry: "PL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SEO_SITE_FACTS.geo.latitude,
        longitude: SEO_SITE_FACTS.geo.longitude,
      },
      areaServed: [
        { "@type": "City", name: "Warszawa" },
        {
          "@type": "AdministrativeArea",
          name: SEO_SITE_FACTS.district,
        },
      ],
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "15:00",
        },
      ],
      sameAs: [SEO_SITE_FACTS.instagramUrl, SEO_SITE_FACTS.facebookUrl],
      knowsAbout: [
        "strzyżenie męskie",
        "barbershop Warszawa",
        "fryzjer męski Praga Północ",
        "broda i kontury",
        "stylizacja męska",
      ],
    };

    const graph = {
      "@context": "https://schema.org",
      "@graph": [hairSalon, buildFaqJsonLd(faqItems, pageUrl)],
    };

    const script = document.createElement("script");
    script.id = "seo-ld-json-graph";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(graph);
    document.head.appendChild(script);
  }, []);

  return null;
}
