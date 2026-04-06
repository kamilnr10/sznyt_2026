import styled from "styled-components";
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollRevealProps, easeOut } from "../../atoms/ScrollReveal/ScrollReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Loading from "../../organisms/Loading/Loading";
import teamFallbackPhoto from "../../../assets/images/zespol.jpg";

const TeamSection = styled.section`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 2.5rem max(0.75rem, env(safe-area-inset-left, 0px)) 3.5rem
    max(0.75rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  scroll-margin-top: max(5.5rem, calc(72px + 1rem));

  @media (min-width: 810px) {
    scroll-margin-top: max(5.5rem, calc(80px + 1rem));
    padding-top: 3rem;
  }
`;

const AmbientLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const AmbientVoid = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse 75% 55% at 50% 100%,
      rgba(120, 0, 200, 0.22) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 45% 40% at 12% 18%,
      rgba(183, 0, 255, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 38% 38% at 90% 28%,
      rgba(80, 40, 160, 0.14) 0%,
      transparent 45%
    ),
    linear-gradient(180deg, rgba(3, 2, 6, 0.2) 0%, transparent 42%, rgba(3, 2, 6, 0.35) 100%);
  opacity: 0.95;
`;

const AmbientGrain = styled.div`
  position: absolute;
  inset: -15%;
  opacity: 0.055;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: teamGrainShift 0.5s steps(2) infinite;

  @keyframes teamGrainShift {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(-2%, 1%);
    }
    100% {
      transform: translate(1%, -1%);
    }
  }
`;

const DecorRingOuter = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 32%;
  width: min(115vmin, 780px);
  height: min(115vmin, 780px);
  margin-left: calc(min(115vmin, 780px) / -2);
  margin-top: calc(min(115vmin, 780px) / -2);
  border-radius: 50%;
  border: 1px solid rgba(183, 0, 255, 0.1);
`;

const DecorRingInner = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 32%;
  width: min(78vmin, 520px);
  height: min(78vmin, 520px);
  margin-left: calc(min(78vmin, 520px) / -2);
  margin-top: calc(min(78vmin, 520px) / -2);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const ScanLine = styled(motion.div)`
  position: absolute;
  left: -10%;
  right: -10%;
  top: 22%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(183, 0, 255, 0.06) 22%,
    rgba(255, 255, 255, 0.28) 50%,
    rgba(183, 0, 255, 0.06) 78%,
    transparent
  );
  box-shadow: 0 0 20px rgba(183, 0, 255, 0.25);
`;

const SectionInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &[data-loading="true"] {
    min-height: 12rem;
    justify-content: center;
  }
`;

const TitleRow = styled.h2`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-size: var(--font-size-heading-section);
  line-height: var(--line-heading-section);
  font-weight: var(--weight-heading-section);
  letter-spacing: 0.02em;
  margin: 0 0 1.5rem;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.02em;
`;

const TitleChar = styled(motion.span)`
  display: inline-block;
  text-shadow:
    0 0 28px rgba(183, 0, 255, 0.35),
    0 0 56px rgba(120, 0, 200, 0.15);
`;

const TeamContainer = styled(motion.div)`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  .team-swiper {
    width: 100%;
    padding-bottom: 2.75rem;
    overflow: visible;
  }

  .swiper-slide {
    width: 300px;
    height: auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    @media (min-width: 1200px) {
      width: 350px;
    }

    @media (min-width: 1600px) {
      width: 400px;
    }
  }

  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.35);
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: rgba(183, 0, 255, 0.9);
  }
`;

const MemberContainer = styled.div`
  position: relative;
  width: 300px;
  min-height: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 22px;
  overflow: hidden;
  background: linear-gradient(
    165deg,
    rgba(30, 30, 38, 0.96) 0%,
    rgba(10, 10, 14, 0.99) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);

  @media (min-width: 1200px) {
    width: 350px;
    min-height: 600px;
    border-radius: 24px;
  }

  @media (min-width: 1600px) {
    width: 400px;
    min-height: 750px;
    border-radius: 26px;
  }
`;

const ImageArea = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 260px;
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.22);

  a {
    position: absolute;
    inset: 0;
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }
`;

const FallbackCaption = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.4rem 0.55rem;
  font-family: var(--font-family-body);
  font-size: 0.62rem;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.82));
  pointer-events: none;
`;

const InfoContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  div {
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;

    &:first-of-type {
      flex: 1;
      justify-content: flex-start;
    }

    &:nth-of-type(2) {
      flex: 1;
      justify-content: center;
    }

    &:last-of-type {
      flex: 0 0 auto;
      justify-content: flex-end;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      color: rgba(255, 255, 255, 0.88);
      border-radius: 10px;
      transition:
        color 0.2s ease,
        background 0.2s ease;

      &:hover,
      &:focus-visible {
        color: rgba(183, 0, 255, 0.95);
        background: rgba(255, 255, 255, 0.06);
      }
    }
  }
`;

const EmptyState = styled.p`
  font-family: var(--font-family-body);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
  max-width: 28ch;
  margin: 0;
`;

const MemberBio = styled.p`
  margin: 0;
  padding: 0 1rem 1rem;
  font-family: var(--font-family-body);
  font-size: clamp(0.78rem, 2vw, 0.86rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.58);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 0.75rem;
`;

const TITLE_CHARS = [..."Zespół"];

function AnimatedTeamTitle() {
  const reduce = useReducedMotion();
  return (
    <TitleRow>
      {TITLE_CHARS.map((ch, i) => (
        <TitleChar
          key={`${ch}-${i}`}
          initial={
            reduce
              ? false
              : { opacity: 0, y: 36, rotateX: -42, filter: "blur(10px)" }
          }
          whileInView={
            reduce
              ? undefined
              : { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -10% 0px" }}
          transition={{
            delay: 0.05 + i * 0.055,
            duration: 0.62,
            ease: easeOut,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {ch}
        </TitleChar>
      ))}
    </TitleRow>
  );
}

function TeamSectionAmbience() {
  const reduce = useReducedMotion();
  return (
    <AmbientLayer>
      <AmbientVoid />
      <AmbientGrain />
      {!reduce ? (
        <>
          <DecorRingOuter
            initial={{ opacity: 0, scale: 0.62 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 360,
            }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 2.15, ease: [0.22, 1, 0.36, 1] }}
          />
          <DecorRingInner
            initial={{ opacity: 0, scale: 0.72 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: -200,
            }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 1.95, ease: [0.33, 1, 0.68, 1] }}
          />
          <ScanLine
            initial={{ opacity: 0, top: "22%" }}
            whileInView={{
              opacity: [0.35, 0.8, 0.35],
              top: ["22%", "66%", "22%"],
            }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 3.1,
              ease: "easeInOut",
              times: [0, 0.52, 1],
            }}
          />
        </>
      ) : null}
    </AmbientLayer>
  );
}

/** Rekord(y) z Dato: tablica `allTeams` lub pojedynczy obiekt (kompatybilność wstecz). */
function normalizeTeamResponse(teamPayload) {
  if (teamPayload == null) return [];
  if (Array.isArray(teamPayload)) return teamPayload.filter(Boolean);
  return [teamPayload];
}

const Team = ({
  sectionId = "zespol",
  sectionKey,
  teamRecord,
  cmsLoading,
}) => {
  const members = useMemo(
    () => normalizeTeamResponse(teamRecord),
    [teamRecord]
  );

  const swiperReveal = useScrollRevealProps({
    y: 28,
    amount: 0.15,
    margin: "0px 0px -12% 0px",
    delay: 0.12,
  });

  const slideCount = members.length;
  const enableLoop = slideCount >= 3;
  const enableAutoplay = slideCount > 1;

  const swiperKey = useMemo(
    () => members.map((m) => m.id).join("-") || "empty",
    [members]
  );

  if (cmsLoading) {
    return (
      <TeamSection id={sectionId} data-section-key={sectionKey}>
        <TeamSectionAmbience />
        <SectionInner data-loading="true">
          <Loading />
        </SectionInner>
      </TeamSection>
    );
  }

  if (slideCount === 0) {
    return (
      <TeamSection id={sectionId} data-section-key={sectionKey}>
        <TeamSectionAmbience />
        <SectionInner>
          <AnimatedTeamTitle />
          <EmptyState>
            Brak opublikowanych osób w modelu Team w DatoCMS albo błąd zapytania
            GraphQL — sprawdź REACT_APP_DATOCMS_READONLY_TOKEN / REACT_APP_DATOCMS_TOKEN i listę allTeams w
            zapytaniu landingu.
          </EmptyState>
        </SectionInner>
      </TeamSection>
    );
  }

  return (
    <TeamSection id={sectionId} data-section-key={sectionKey}>
      <TeamSectionAmbience />
      <SectionInner>
        <AnimatedTeamTitle />
        <TeamContainer {...swiperReveal}>
        <Swiper
          key={swiperKey}
          className="team-swiper"
          modules={[Autoplay, Pagination]}
          slidesPerView="auto"
          centeredSlides
          spaceBetween={20}
          speed={700}
          loop={enableLoop}
          loopAdditionalSlides={enableLoop ? 2 : 0}
          rewind={!enableLoop && enableAutoplay}
          watchSlidesProgress
          observer
          observeParents
          autoplay={
            enableAutoplay
              ? {
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          pagination={{ clickable: true, dynamicBullets: slideCount > 5 }}
        >
          {members.map((member, idx) => (
            <SwiperSlide key={member.id ?? `m-${idx}`}>
              <MemberCard member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
        </TeamContainer>
      </SectionInner>
    </TeamSection>
  );
};

function MemberCard({ member }) {
  const cmsRaw = member?.image?.url;
  const cmsUrl =
    typeof cmsRaw === "string" && cmsRaw.trim() !== "" ? cmsRaw.trim() : "";
  const imgUrl = cmsUrl || teamFallbackPhoto;
  const usedFallback = !cmsUrl;
  const booksyUrl = member?.booksy?.trim() || "#";
  const igUrl = member?.instagram?.trim() || "#";
  const bio =
    member?.description != null && String(member.description).trim();

  return (
    <MemberContainer>
      <ImageArea>
        <a href={booksyUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={imgUrl}
            alt={
              usedFallback
                ? `Zespół SZNYT Barbershop, ${member.name || "salon"} — ${member.job || "Praga Północ, Warszawa"}`
                : `${member.name || "Członek zespołu"} — ${member.job || ""}`
            }
          />
        </a>
        {usedFallback ? (
          <FallbackCaption>
            Zdjęcie z repozytorium (fallback) — w DatoCMS nie ma jeszcze
            przypisanego pliku.
          </FallbackCaption>
        ) : null}
      </ImageArea>
      <InfoContainer>
        <div>
          <p
            style={{
              fontWeight: 700,
              fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
              margin: 0,
              lineHeight: 1.25,
              fontFamily: "var(--font-family-body)",
            }}
          >
            {member.name}
          </p>
        </div>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.3,
              fontFamily: "var(--font-family-body)",
            }}
          >
            {member.job}
          </p>
        </div>
        <div>
          <a href={igUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon style={{ fontSize: "28px" }} icon={faInstagram} />
          </a>
        </div>
      </InfoContainer>
      {bio ? <MemberBio>{bio}</MemberBio> : null}
    </MemberContainer>
  );
}

export default Team;
