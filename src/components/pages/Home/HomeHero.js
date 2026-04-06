import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "../../atoms/ScrollReveal/ScrollReveal";
import { HOME_HERO_CTA_LABEL } from "../../../constants/homeHeroCopy";
import { useHeroIntroSync } from "../../../context/HeroIntroSyncContext";
import SznytHandoffNarrative from "../../organisms/SznytHandoffNarrative/SznytHandoffNarrative";
import heroBgImage from "../../../assets/images/salon_panorama.jpg";

const BOOKSY_URL =
  "https://booksy.com/pl-pl/138044_sznyt-barbershop_barber-shop_3_warszawa";

const NAV_BAR_MOBILE = 72;
const NAV_BAR_DESKTOP = 80;

const HeroBackdrop = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url(${heroBgImage});
  background-size: cover;
  background-position: center 35%;
  transform: scale(1.03);
`;

const HeroScrim = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.55) 45%,
    rgba(0, 0, 0, 0.82) 100%
  );
`;

const HeroRevealBloom = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(
    ellipse 92% 72% at 50% 40%,
    rgba(175, 90, 255, 0.5) 0%,
    rgba(120, 40, 200, 0.22) 38%,
    transparent 68%
  );
  mix-blend-mode: screen;
`;

const HeroGrain = styled.div`
  position: absolute;
  inset: -14%;
  z-index: 2;
  opacity: 0.05;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: heroGrainShift 0.5s steps(2) infinite;

  @keyframes heroGrainShift {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(-1.5%, 0.8%);
    }
    100% {
      transform: translate(0.8%, -0.8%);
    }
  }
`;

const HeroDecorRingOuter = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 44%;
  width: min(125vmin, 760px);
  height: min(125vmin, 760px);
  margin-left: calc(min(125vmin, 760px) / -2);
  margin-top: calc(min(125vmin, 760px) / -2);
  border-radius: 50%;
  border: 1px solid rgba(183, 0, 255, 0.1);
  pointer-events: none;
  z-index: 2;
`;

const HeroDecorRingInner = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 44%;
  width: min(88vmin, 520px);
  height: min(88vmin, 520px);
  margin-left: calc(min(88vmin, 520px) / -2);
  margin-top: calc(min(88vmin, 520px) / -2);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  pointer-events: none;
  z-index: 2;
`;

const HeroScanHint = styled(motion.div)`
  position: absolute;
  left: -15%;
  right: -15%;
  top: 38%;
  height: 1px;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(183, 0, 255, 0.05) 22%,
    rgba(255, 255, 255, 0.22) 50%,
    rgba(183, 0, 255, 0.05) 78%,
    transparent
  );
  opacity: 0.65;
`;

const HeroWrapper = styled.section`
  position: relative;
  scroll-margin-top: 0;
  overflow: hidden;
  min-height: 72dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: max(
    1.25rem,
    calc(${NAV_BAR_MOBILE}px + 0.75rem + env(safe-area-inset-top, 0px))
  );
  padding-right: max(1rem, env(safe-area-inset-right, 0px));
  padding-bottom: max(2.5rem, env(safe-area-inset-bottom, 0px));
  padding-left: max(1rem, env(safe-area-inset-left, 0px));
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    min-height: 76dvh;
    padding-top: max(
      1.5rem,
      calc(${NAV_BAR_MOBILE}px + 1rem + env(safe-area-inset-top, 0px))
    );
    padding-right: max(1.25rem, env(safe-area-inset-right, 0px));
    padding-bottom: max(2.75rem, env(safe-area-inset-bottom, 0px));
    padding-left: max(1.25rem, env(safe-area-inset-left, 0px));
  }

  @media (min-width: 768px) {
    min-height: 82dvh;
    padding-top: max(
      2rem,
      calc(${NAV_BAR_MOBILE}px + 1.25rem + env(safe-area-inset-top, 0px))
    );
    padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
    padding-bottom: max(3rem, env(safe-area-inset-bottom, 0px));
    padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
  }

  @media (min-width: 810px) {
    padding-top: max(
      2.25rem,
      calc(${NAV_BAR_DESKTOP}px + 1rem + env(safe-area-inset-top, 0px))
    );
  }

  @media (min-width: 1024px) {
    min-height: 88dvh;
    padding-top: max(
      2.5rem,
      calc(${NAV_BAR_DESKTOP}px + 1.25rem + env(safe-area-inset-top, 0px))
    );
    padding-right: max(2rem, env(safe-area-inset-right, 0px));
    padding-bottom: max(3.5rem, env(safe-area-inset-bottom, 0px));
    padding-left: max(2rem, env(safe-area-inset-left, 0px));
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 0;
  max-width: min(100%, 36rem);
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (min-width: 480px) {
    max-width: min(100%, 38rem);
  }

  @media (min-width: 768px) {
    max-width: min(100%, 42rem);
  }

  @media (min-width: 1024px) {
    max-width: min(100%, 44rem);
  }
`;

const CTA = styled(motion.a)`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.8rem 1.5rem;
  font-family: var(--font-family-nav);
  font-size: clamp(0.88rem, 2.4vw, 1rem);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #fff;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.9);
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.2s ease;

  @media (max-width: 479px) {
    width: 100%;
    max-width: 18rem;
    margin-inline: auto;
  }

  @media (min-width: 480px) {
    min-height: 50px;
    padding: 0.85rem 1.85rem;
    letter-spacing: 0.16em;
  }

  &:hover {
    background: #fff;
    color: #000;
    border-color: #fff;
  }

  &:focus-visible {
    outline: 2px solid rgba(183, 0, 255, 0.85);
    outline-offset: 3px;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const HomeHero = ({ topId, sectionKey }) => {
  const reduce = useReducedMotion();
  const { introDone, narrativeInHero, initialIntroBlocking } = useHeroIntroSync();
  const [playHeroBloom, setPlayHeroBloom] = useState(false);

  useEffect(() => {
    if (introDone && initialIntroBlocking) setPlayHeroBloom(true);
  }, [introDone, initialIntroBlocking]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : introDone ? 0.38 : 0,
      },
    },
  };

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 20,
      filter: reduce ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.55, ease: easeOut },
    },
  };

  const backdropAnimate =
    introDone || reduce
      ? {
          scale: 1.03,
          opacity: 1,
          filter: "brightness(1) saturate(1.02)",
        }
      : {
          scale: 1.1,
          opacity: 0.74,
          filter: "brightness(0.72) saturate(1.08)",
        };

  return (
    <HeroWrapper id={topId} data-section-key={sectionKey}>
      <HeroBackdrop
        aria-hidden
        initial={false}
        animate={backdropAnimate}
        transition={{
          duration: reduce ? 0 : introDone ? 1.28 : 0,
          ease: [0.18, 0.82, 0.22, 1],
        }}
      />
      <HeroScrim
        aria-hidden
        initial={false}
        animate={
          introDone || reduce
            ? { opacity: 1 }
            : { opacity: 0.88 }
        }
        transition={{
          duration: reduce ? 0 : introDone ? 0.95 : 0,
          ease: easeOut,
        }}
      />
      {!reduce && playHeroBloom ? (
        <HeroRevealBloom
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.85, 0.18, 0],
          }}
          transition={{
            duration: 1.35,
            times: [0, 0.14, 0.42, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ) : null}
      <HeroGrain aria-hidden />
      {!reduce && introDone ? (
        <>
          <HeroDecorRingOuter
            aria-hidden
            initial={{ opacity: 0, scale: 0.75, rotate: -40 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 120,
            }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <HeroDecorRingInner
            aria-hidden
            initial={{ opacity: 0, scale: 0.82, rotate: 24 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: -80,
            }}
            transition={{ duration: 2.1, ease: [0.33, 1, 0.68, 1] }}
          />
          <HeroScanHint
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
          />
        </>
      ) : null}
      <HeroContent
        variants={containerVariants}
        initial="hidden"
        animate={introDone ? "show" : "hidden"}
      >
        {narrativeInHero ? <SznytHandoffNarrative mode="hero" /> : null}
        <CTA
          variants={ctaVariants}
          href={BOOKSY_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={reduce ? undefined : { scale: 1.02 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          {HOME_HERO_CTA_LABEL}
        </CTA>
      </HeroContent>
    </HeroWrapper>
  );
};

export default HomeHero;
