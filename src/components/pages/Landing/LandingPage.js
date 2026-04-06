import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HomeHero from "../Home/HomeHero";
import OurStory from "../../organisms/OurStory/OurStory";
import Team from "../Team/Team";
import Contact from "../Contact/Contact";
import GallerySection from "./GallerySection";
import FullBleedStatement from "./FullBleedStatement";
import SolidStatementBand from "./SolidStatementBand";
import LocationSection from "./LocationSection";
import SalonMotionSection from "./SalonMotionSection";
import { LANDING_SECTION_KEYS } from "../../../constants/landingSectionKeys";
import {
  DATOCMS_GRAPHQL_ENDPOINT,
  getDatocmsHeaders,
  getDatocmsTokenSourceLabel,
  hasDatocmsToken,
} from "../../../config/datocms";
import { LANDING_PAGE_QUERY } from "../../../constants/datocmsLandingQuery";
import lusterkoImg from "../../../assets/images/lusterko_z_logo.jpg";
import foteleImg from "../../../assets/images/fotele.jpg";

/** Wewnętrzny kod błędu — brak zmiennej środowiskowej z tokenem */
const CMS_ERR_NO_TOKEN = "cms_no_token";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  box-sizing: border-box;
  overflow-x: clip;
  padding-inline: max(0px, env(safe-area-inset-left, 0px))
    max(0px, env(safe-area-inset-right, 0px));
`;

const ErrorBanner = styled.div`
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
  padding: 1.25rem 1rem 0;
  text-align: center;
  font-family: var(--font-family-body);
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.65);
  box-sizing: border-box;
`;

export default function LandingPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hasDatocmsToken()) {
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.warn(
              "[DatoCMS] Brak tokenu — nie wysyłam zapytania (unikniesz 401 w sieci).\n" +
                "→ W katalogu głównym projektu utwórz plik .env (wzorzec: .env.example).\n" +
                "→ Dodaj linię: REACT_APP_DATOCMS_READONLY_TOKEN=<token> (lub REACT_APP_DATOCMS_TOKEN) z Dato → Project settings → API tokens.\n" +
                "→ Zapisz plik i zrestartuj serwer dev (npm start) — CRA wczytuje .env tylko przy starcie."
            );
          }
          setError(CMS_ERR_NO_TOKEN);
          setData(null);
          return;
        }

        if (process.env.NODE_ENV === "development") {
          const src = getDatocmsTokenSourceLabel();
          // eslint-disable-next-line no-console
          console.log("[DatoCMS] zapytanie landing — źródło tokenu:", src);
        }

        const response = await fetch(DATOCMS_GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: getDatocmsHeaders(),
          body: JSON.stringify({ query: LANDING_PAGE_QUERY }),
        });

        const json = await response.json();

        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.log("[DatoCMS] HTTP:", response.status, response.ok ? "OK" : "błąd");
        }

        if (response.status === 401) {
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.error(
              "[DatoCMS] 401 Unauthorized — token odrzucony lub wygasł. W .env ustaw REACT_APP_DATOCMS_READONLY_TOKEN (lub REACT_APP_DATOCMS_TOKEN), zrestartuj npm start."
            );
          }
          throw new Error("DatoCMS odrzuciło token (401).");
        }

        if (json.errors?.length) {
          console.error("DatoCMS (landing):", json.errors);
        }

        const gqlOk =
          response.ok && !json.errors?.length && json.data != null;
        const teams = json.data?.allTeams;
        const gallery = json.data?.gallery;
        const story = json.data?.ourStory ?? json.data?.ourstory;

        if (process.env.NODE_ENV === "development") {
          if (gqlOk) {
            // eslint-disable-next-line no-console
            console.log(
              "%c[DatoCMS] OK — dane pobrane (Content Delivery API, read-only token).",
              "color:#6ee7b7;font-weight:bold;"
            );
            // eslint-disable-next-line no-console
            console.log("[DatoCMS] podsumowanie:", {
              zrodloTokenu: getDatocmsTokenSourceLabel(),
              allTeams: Array.isArray(teams)
                ? `${teams.length} rekord(ów)`
                : teams == null
                  ? "brak pola"
                  : typeof teams,
              metaCount: json.data._allTeamsMeta?.count,
              pierwszyZespol: teams?.[0]?.name ?? null,
              ourStory: story ? "tak" : "brak",
              gallery: gallery ? "tak" : "brak",
              zdjecWGalerii: Array.isArray(gallery?.gallery)
                ? gallery.gallery.length
                : null,
            });
          } else if (json.data != null && json.errors?.length) {
            // eslint-disable-next-line no-console
            console.warn(
              "[DatoCMS] Odpowiedź częściowa — są błędy GraphQL (sprawdź nazwy modeli/pól w API Explorer):",
              json.errors
            );
          } else if (!gqlOk) {
            // eslint-disable-next-line no-console
            console.warn("[DatoCMS] Brak poprawnej paczki `data` lub błąd HTTP — zobacz logi powyżej.");
          }
        }

        if (!response.ok && !json.data) {
          throw new Error(json.errors?.[0]?.message || "Błąd zapytania");
        }
        setData(json.data ?? null);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error("[DatoCMS] wyjątek / brak odpowiedzi:", err.message);
        }
        setError(err.message || "Błąd zapytania");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ourstory = data?.ourStory ?? data?.ourstory;
  const header = ourstory?.header ?? "";
  const secondSentence =
    ourstory?.second_sentence ?? ourstory?.secondSentence ?? "";
  const videoBlock = ourstory?.video;
  const videoUrl = videoBlock?.url ?? videoBlock?.video?.url ?? "";
  const storyDescription =
    ourstory?.description ?? ourstory?.descriptionText ?? "";
  const storyFooter =
    ourstory?.footer ?? ourstory?.footerText ?? "";

  return (
    <Main>
      <HomeHero topId="top" sectionKey={LANDING_SECTION_KEYS.HERO} />
      {loading ? (
        <OurStory
          sectionId="o-nas"
          sectionKey={LANDING_SECTION_KEYS.OUR_STORY}
          kicker="SZNYT"
          loading
        />
      ) : (
        <OurStory
          sectionId="o-nas"
          sectionKey={LANDING_SECTION_KEYS.OUR_STORY}
          kicker="SZNYT"
          header={header}
          secondSentence={secondSentence}
          footer={storyFooter}
          loading={false}
        />
      )}
      {!loading && videoUrl && String(videoUrl).trim() && (
        <SalonMotionSection
          videoUrl={videoUrl}
          caption={storyDescription}
          sectionKey={LANDING_SECTION_KEYS.STORY_VIDEO}
        />
      )}
      <SolidStatementBand
        id="filozofia"
        sectionKey={LANDING_SECTION_KEYS.PHILOSOPHY}
        kicker="Filozofia"
        headline="Tu liczy się klimat i rzemiosło — nie puste hasła."
        sub="Od wejścia po ostatni kontur: przestrzeń, światło i rozmowa są u nas tak samo ważne jak precyzja cięcia."
        ariaLabelledBy="solid-statement-heading"
      />
      <FullBleedStatement
        id="lustro"
        sectionKey={LANDING_SECTION_KEYS.EXPERIENCE_MIRROR}
        imageSrc={lusterkoImg}
        kicker="Lustro"
        headline="Nie tylko strzyżenie — całe doświadczenie."
        sub="Lustro, światło, detal. Tak samo dbamy o atmosferę, jak o linię cięcia."
        ariaLabelledBy="fullbleed-lustro-heading"
        parallax
      />
      {error && (
        <ErrorBanner>
          {process.env.NODE_ENV === "development" && error === CMS_ERR_NO_TOKEN
            ? "Dev: brak tokenu CMS — w .env ustaw REACT_APP_DATOCMS_READONLY_TOKEN lub REACT_APP_DATOCMS_TOKEN (patrz .env.example), zrestartuj npm start."
            : "Nie udało się załadować treści z CMS. Pozostałe sekcje są dostępne."}
        </ErrorBanner>
      )}
      <GallerySection
        sectionKey={LANDING_SECTION_KEYS.GALLERY}
        galleryRecord={!loading ? data?.gallery : undefined}
      />
      <FullBleedStatement
        id="praga-polnoc"
        sectionKey={LANDING_SECTION_KEYS.PRAGUE}
        imageSrc={foteleImg}
        kicker="Praga Północ"
        headline="Miejsce, w którym siadasz i odpalasz."
        sub="Wygodne fotele, przestrzeń do oddychania — barber shop bez pośpiechu."
        ariaLabelledBy="fullbleed-fotele-heading"
        parallax
      />
      <Team
        sectionId="zespol"
        sectionKey={LANDING_SECTION_KEYS.TEAM}
        teamRecord={data?.allTeams}
        cmsLoading={loading}
      />
      <Contact sectionId="kontakt" sectionKey={LANDING_SECTION_KEYS.CONTACT} />
      <LocationSection sectionKey={LANDING_SECTION_KEYS.LOCATION} />
    </Main>
  );
}
