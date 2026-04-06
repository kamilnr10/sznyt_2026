import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { easeOut, useScrollRevealProps } from "../../atoms/ScrollReveal/ScrollReveal";
import SznytLetterVideo from "../../organisms/VideoSection/SznytLetterVideo";
import { LANDING_SECTION_KEYS } from "../../../constants/landingSectionKeys";

const SCROLL_TOP = "max(5.5rem, calc(72px + 1rem))";

/* Pełna szerokość jak FullBleedStatement — wychodzi poza wąski main */
const Outer = styled(motion.section)`
  position: relative;
  width: 100vw;
  max-width: 100%;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  align-self: stretch;
  box-sizing: border-box;
  scroll-margin-top: ${SCROLL_TOP};
  overflow: hidden;
  padding: clamp(2.75rem, 7vw, 4.5rem) 0 clamp(3rem, 8vw, 5rem);

  @media (min-width: 810px) {
    scroll-margin-top: max(5.5rem, calc(80px + 1rem));
  }
`;

const Ambient = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse 80% 50% at 50% 0%,
      rgba(183, 0, 255, 0.14) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 60% 40% at 100% 50%,
      rgba(183, 0, 255, 0.06) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 50% 45% at 0% 80%,
      rgba(0, 0, 0, 0.5) 0%,
      transparent 45%
    ),
    linear-gradient(180deg, #050508 0%, #0a0a10 38%, #060608 100%);
`;

const Noise = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.04;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: min(100%, 88rem);
  margin: 0 auto;
  padding: 0 max(1.25rem, env(safe-area-inset-left, 0px)) 0
    max(1.25rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding-inline: max(2rem, env(safe-area-inset-left, 0px))
      max(2rem, env(safe-area-inset-right, 0px));
  }
`;

const Kicker = styled.span`
  display: block;
  text-align: center;
  font-family: var(--font-family-body);
  font-size: var(--font-size-kicker);
  font-weight: 600;
  letter-spacing: var(--font-letter-kicker);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.42);
  margin-bottom: 1rem;
`;

const CinemaFrame = styled(motion.div)`
  position: relative;
  border-radius: clamp(14px, 2vw, 22px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 0 0 1px rgba(183, 0, 255, 0.12),
    0 32px 80px rgba(0, 0, 0, 0.55),
    0 0 120px rgba(183, 0, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  background: #000;
  min-height: min(48vh, 420px);
  aspect-ratio: 21 / 9;

  @media (max-width: 900px) {
    aspect-ratio: 16 / 10;
    min-height: min(42vh, 380px);
  }

  @media (max-width: 520px) {
    aspect-ratio: 4 / 5;
    min-height: min(52vh, 440px);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    border-radius: inherit;
    box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.45);
  }
`;

const ParallaxLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 112%;
  top: -6%;
  will-change: transform;
`;

const Caption = styled.p`
  margin: 1.25rem auto 0;
  max-width: 48ch;
  text-align: center;
  font-family: var(--font-family-body);
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.52);
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 70% 65% at 50% 50%,
    transparent 35%,
    rgba(0, 0, 0, 0.35) 100%
  );
`;

/**
 * Pełnoszerokowa sekcja „kinowa”: gradient + szum, rama ze światłem marki,
 * napis SZNYT z wideo w literach — jak na efektowych landingach (full-bleed, nie z boku).
 */
export default function SalonMotionSection({
  videoUrl,
  caption,
  sectionKey = LANDING_SECTION_KEYS.STORY_VIDEO,
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(wrapRef, { amount: 0.28, margin: "-8% 0px" });
  const reveal = useScrollRevealProps({ y: 40, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : ["4%", "-4%"]
  );

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduce) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView, reduce]);

  const hasCaption = caption && String(caption).trim();
  const src = videoUrl && String(videoUrl).trim() ? videoUrl : "";

  if (!src) return null;

  return (
    <Outer
      ref={wrapRef}
      id="film-salonu"
      data-section-key={sectionKey}
      aria-label="Film z salonu SZNYT Barbershop"
      {...reveal}
    >
      <Ambient />
      <Noise />
      <Inner>
        <Kicker>Salon w ruchu</Kicker>
        <CinemaFrame
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: easeOut }}
        >
          <ParallaxLayer style={{ y: parallaxY }}>
            <SznytLetterVideo
              videoRef={videoRef}
              src={src}
              maskFontSize={0.4}
              muted
              loop
              playsInline
              controls={reduce}
              preload="metadata"
              aria-label="Film z wnętrza salonu SZNYT — odtwarzany w napisie SZNYT"
            />
          </ParallaxLayer>
          <Vignette />
        </CinemaFrame>
        {hasCaption && <Caption>{caption}</Caption>}
      </Inner>
    </Outer>
  );
}
