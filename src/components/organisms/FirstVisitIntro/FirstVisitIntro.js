import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { readCookieConsent } from "../../../constants/cookieConsentStorage";
import { useHeroIntroSync } from "../../../context/HeroIntroSyncContext";
import SznytHandoffNarrative from "../SznytHandoffNarrative/SznytHandoffNarrative";

const DecorRoot = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1250;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  overflow: hidden;
`;

const VoidBg = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse 80% 60% at 50% 100%,
      rgba(120, 0, 200, 0.35) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 50% 45% at 15% 20%,
      rgba(183, 0, 255, 0.18) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 40% 40% at 88% 30%,
      rgba(80, 40, 160, 0.2) 0%,
      transparent 45%
    ),
    #030206;
`;

const Grain = styled.div`
  position: absolute;
  inset: -20%;
  opacity: 0.07;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grainShift 0.5s steps(2) infinite;

  @keyframes grainShift {
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

const Ring = styled(motion.div)`
  position: absolute;
  width: min(140vmin, 900px);
  height: min(140vmin, 900px);
  border-radius: 50%;
  border: 1px solid rgba(183, 0, 255, 0.12);
  pointer-events: none;
`;

const RingInner = styled(motion.div)`
  position: absolute;
  width: min(95vmin, 620px);
  height: min(95vmin, 620px);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  pointer-events: none;
`;

const ScanBeam = styled(motion.div)`
  position: absolute;
  left: -20%;
  right: -20%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(183, 0, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.45) 50%,
    rgba(183, 0, 255, 0.05) 80%,
    transparent
  );
  box-shadow:
    0 0 24px rgba(183, 0, 255, 0.5),
    0 0 48px rgba(255, 255, 255, 0.15);
  pointer-events: none;
`;

/** Litery + progress — wyśrodkowane w pionie; narracja osobno niżej */
const OverlayStack = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1260;
  pointer-events: none;
  padding: 1.25rem;
  padding-top: max(1.25rem, env(safe-area-inset-top, 0px));
`;

const IntroLettersProgressZone = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-52%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;

const IntroNarrativeZone = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: max(7vh, 4.5rem);
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.75rem;
`;

const LettersRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(0.15rem, 2vw, 0.55rem);
  margin-bottom: 1rem;
`;

const Letter = styled(motion.span)`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(2.4rem, 14vw, 5.5rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: #fafafa;
  text-shadow:
    0 0 40px rgba(183, 0, 255, 0.55),
    0 0 80px rgba(120, 0, 200, 0.25),
    2px 0 0 rgba(255, 0, 180, 0.12),
    -2px 0 0 rgba(0, 220, 255, 0.1);
`;

const ProgressTrack = styled(motion.div)`
  width: min(260px, 78vw);
  max-width: 100%;
  height: 3px;
  margin: 0 auto;
  flex-shrink: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
  overflow: hidden;
  box-shadow: 0 0 20px rgba(183, 0, 255, 0.12);
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  width: 100%;
  border-radius: inherit;
  transform-origin: left center;
  background: linear-gradient(
    90deg,
    rgba(183, 0, 255, 0.2),
    rgba(255, 255, 255, 0.65),
    rgba(183, 0, 255, 0.45)
  );
  box-shadow: 0 0 12px rgba(183, 0, 255, 0.6);
`;

const LETTERS = ["S", "Z", "N", "Y", "T"];

const letterVariants = {
  hidden: {
    y: 48,
    opacity: 0,
    rotateX: -55,
    filter: "blur(12px)",
  },
  show: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function FirstVisitIntro({ onExitComplete }) {
  const reduce = useReducedMotion();
  const { narrativeInHero, beginHandoff } = useHeroIntroSync();
  const [consentOk, setConsentOk] = useState(() => !!readCookieConsent());
  const [run, setRun] = useState(false);
  const [lettersVisible, setLettersVisible] = useState(false);
  /** Warstwa UI intro z AnimatePresence — znikanie po przeniesieniu napisów */
  const [introOverlayMounted, setIntroOverlayMounted] = useState(false);

  useEffect(() => {
    if (consentOk) return;
    const onConsent = () => setConsentOk(true);
    window.addEventListener("sznyt:cookie-consent", onConsent);
    return () => window.removeEventListener("sznyt:cookie-consent", onConsent);
  }, [consentOk]);

  useEffect(() => {
    if (!consentOk || reduce) return;
    setRun(true);
  }, [consentOk, reduce]);

  useEffect(() => {
    if (run) {
      setLettersVisible(true);
      setIntroOverlayMounted(true);
    }
  }, [run]);

  const closeDecor = useCallback(() => setRun(false), []);

  useEffect(() => {
    if (!run) return;
    const t = window.setTimeout(() => {
      beginHandoff();
      window.setTimeout(() => closeDecor(), 200);
      window.setTimeout(() => setLettersVisible(false), 640);
      window.setTimeout(() => setIntroOverlayMounted(false), 720);
    }, 4600);
    return () => window.clearTimeout(t);
  }, [run, beginHandoff, closeDecor]);

  const handleDecorExitComplete = useCallback(() => {
    onExitComplete?.();
  }, [onExitComplete]);

  const showOverlay =
    consentOk && !reduce && (run || lettersVisible || introOverlayMounted);

  return (
    <>
      <AnimatePresence onExitComplete={handleDecorExitComplete}>
        {run && (
          <DecorRoot
            key="sznyt-intro-decor"
            role="presentation"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(22px) saturate(1.2)",
              transition: { duration: 1.05, ease: [0.32, 0, 0.14, 1] },
            }}
          >
            <VoidBg />
            <Grain />
            <Ring
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 360,
                transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
              }}
            />
            <RingInner
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: -180,
                transition: { duration: 2.2, ease: [0.33, 1, 0.68, 1] },
              }}
            />
            <ScanBeam
              initial={{ top: "12%" }}
              animate={{
                top: ["12%", "88%", "12%"],
                transition: {
                  duration: 2.8,
                  ease: "easeInOut",
                  times: [0, 0.55, 1],
                },
              }}
            />
          </DecorRoot>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOverlay ? (
          <OverlayStack
            key="sznyt-intro-overlay"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.97,
              filter: "blur(18px)",
              transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {(run || lettersVisible) && (
              <IntroLettersProgressZone>
                <motion.div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                  animate={{
                    opacity: run || lettersVisible ? 1 : 0,
                    y: run || lettersVisible ? 0 : -18,
                    filter:
                      run || lettersVisible ? "blur(0px)" : "blur(10px)",
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LettersRow
                    initial="hidden"
                    animate="show"
                    style={{ perspective: 800 }}
                  >
                    {LETTERS.map((ch, i) => (
                      <Letter
                        key={`${ch}-${i}`}
                        custom={i}
                        variants={letterVariants}
                        initial="hidden"
                        animate="show"
                        style={{
                          display: "inline-block",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {ch}
                      </Letter>
                    ))}
                  </LettersRow>
                  {run ? (
                    <ProgressTrack
                      initial={{ opacity: 0, y: 6 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.48, duration: 0.45 },
                      }}
                    >
                      <ProgressFill
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: 1,
                          transition: {
                            delay: 0.62,
                            duration: 2.35,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }}
                      />
                    </ProgressTrack>
                  ) : null}
                </motion.div>
              </IntroLettersProgressZone>
            )}
            {run && !narrativeInHero ? (
              <IntroNarrativeZone>
                <SznytHandoffNarrative mode="intro" />
              </IntroNarrativeZone>
            ) : null}
          </OverlayStack>
        ) : null}
      </AnimatePresence>
    </>
  );
}
