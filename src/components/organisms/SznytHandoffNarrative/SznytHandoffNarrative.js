import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  HOME_HERO_OVERLINE,
  HOME_HERO_HEADING,
  HOME_HERO_SUBTITLE,
  HOME_HERO_SUBTITLE_TEASER,
} from "../../../constants/homeHeroCopy";
import logoImage from "../../../assets/images/logo.png";

/** Wspólne layoutId — przejście intro → hero (Framer LayoutGroup) */
export const HANDOFF_LAYOUT_IDS = {
  overline: "sznyt-handoff-overline",
  heading: "sznyt-handoff-heading",
  logo: "sznyt-handoff-logo",
  lead: "sznyt-handoff-lead",
};

const IntroPack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: min(36rem, 92vw);
  padding: 0 0.75rem;
  pointer-events: none;
`;

const OverlineIntro = styled(motion.span)`
  display: block;
  font-family: var(--font-family-nav);
  font-size: clamp(0.52rem, 1.85vw, 0.72rem);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0.65rem;
  line-height: 1.45;
`;

const OverlineHero = styled(motion.span)`
  display: block;
  font-family: var(--font-family-nav);
  font-weight: 600;
  font-size: var(--font-size-kicker);
  letter-spacing: var(--font-letter-kicker);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 1rem;
`;

/** Intro: div (overlay aria-hidden) — prawdziwy H1 tylko na hero; ta sama skala co hero (layoutId) */
const TitleIntroHeading = styled(motion.div)`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-weight: 700;
  font-size: var(--font-size-heading-hero);
  line-height: var(--line-heading-hero);
  letter-spacing: 0.06em;
  color: #fafafa;
  text-shadow: 0 0 20px rgba(183, 0, 255, 0.32);
  margin: 0 0 0.65rem;
  text-wrap: balance;
`;

const TitleHeroHeading = styled(motion.h1)`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-weight: 700;
  font-size: var(--font-size-heading-hero);
  line-height: var(--line-heading-hero);
  letter-spacing: 0.06em;
  color: #fff;
  margin: 0 0 0.75rem;
  text-wrap: balance;
`;

const LogoIntro = styled(motion.div)`
  width: min(24vw, 128px);
  margin: 0 auto 0.5rem;
  filter: drop-shadow(0 0 18px rgba(183, 0, 255, 0.38));

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const LogoHero = styled(motion.div)`
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 0.25rem;
  display: flex;
  justify-content: center;

  img {
    width: auto;
    max-width: min(78vw, 280px);
    height: auto;
    display: block;
    object-fit: contain;
    filter: drop-shadow(0 1px 10px rgba(0, 0, 0, 0.45))
      drop-shadow(0 0 14px rgba(183, 0, 255, 0.16));
  }

  @media (min-width: 380px) {
    img {
      max-width: min(70vw, 300px);
      filter: drop-shadow(0 1px 12px rgba(0, 0, 0, 0.4))
        drop-shadow(0 0 16px rgba(183, 0, 255, 0.22));
    }
  }

  @media (min-width: 480px) {
    img {
      filter: drop-shadow(0 0 10px rgba(180, 0, 255, 0.45))
        drop-shadow(0 0 20px rgba(180, 0, 255, 0.28));
    }
  }

  @media (min-width: 768px) {
    img {
      max-width: min(52vw, 360px);
      filter: drop-shadow(0 0 12px rgba(180, 0, 255, 0.65))
        drop-shadow(0 0 24px rgba(180, 0, 255, 0.38));
    }
  }

  @media (min-width: 1024px) {
    img {
      max-width: min(44vw, 400px);
      filter: drop-shadow(0 0 12px rgba(180, 0, 255, 0.7))
        drop-shadow(0 0 24px rgba(180, 0, 255, 0.4));
    }
  }
`;

const LeadShell = styled(motion.div)`
  width: 100%;
  max-width: min(100%, 36rem);
  margin: 0 auto;
`;

const LeadIntro = styled(motion.p)`
  font-family: var(--font-family-body);
  font-size: clamp(0.68rem, 2.2vw, 0.82rem);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.58);
  margin: 0;
  padding: 0 0.35rem;
  text-wrap: pretty;
`;

const LeadHero = styled(motion.p)`
  font-family: var(--font-family-body);
  font-size: var(--font-size-body-lead);
  color: rgba(255, 255, 255, 0.92);
  line-height: var(--line-body);
  margin: 0 0 1.35rem;
  font-weight: 400;
  padding: 0;
  text-wrap: pretty;

  @media (min-width: 768px) {
    margin-bottom: 1.6rem;
  }
`;

/**
 * @param {"intro" | "hero"} mode
 */
export default function SznytHandoffNarrative({ mode }) {
  const isIntro = mode === "intro";

  const overlineEl = isIntro ? (
    <OverlineIntro layoutId={HANDOFF_LAYOUT_IDS.overline}>
      {HOME_HERO_OVERLINE}
    </OverlineIntro>
  ) : (
    <OverlineHero layoutId={HANDOFF_LAYOUT_IDS.overline}>
      {HOME_HERO_OVERLINE}
    </OverlineHero>
  );

  const headingEl = isIntro ? (
    <TitleIntroHeading layoutId={HANDOFF_LAYOUT_IDS.heading}>
      {HOME_HERO_HEADING}
    </TitleIntroHeading>
  ) : (
    <TitleHeroHeading layoutId={HANDOFF_LAYOUT_IDS.heading}>
      {HOME_HERO_HEADING}
    </TitleHeroHeading>
  );

  const logoEl = isIntro ? (
    <LogoIntro layoutId={HANDOFF_LAYOUT_IDS.logo}>
      <img src={logoImage} alt="" decoding="async" />
    </LogoIntro>
  ) : (
    <LogoHero layoutId={HANDOFF_LAYOUT_IDS.logo}>
      <img
        src={logoImage}
        alt="Logo SZNYT Barbershop — fryzjer męski Praga Północ, Warszawa"
      />
    </LogoHero>
  );

  const leadEl = (
    <LeadShell layoutId={HANDOFF_LAYOUT_IDS.lead} layout>
      <AnimatePresence mode="wait">
        {isIntro ? (
          <LeadIntro
            key="teaser"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {HOME_HERO_SUBTITLE_TEASER}
          </LeadIntro>
        ) : (
          <LeadHero
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            {HOME_HERO_SUBTITLE}
          </LeadHero>
        )}
      </AnimatePresence>
    </LeadShell>
  );

  if (isIntro) {
    return (
      <IntroPack>
        {overlineEl}
        {headingEl}
        {logoEl}
        {leadEl}
      </IntroPack>
    );
  }

  return (
    <>
      {overlineEl}
      {headingEl}
      {logoEl}
      {leadEl}
    </>
  );
}
