import React from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import {
  easeOut,
  useScrollRevealProps,
} from "../../atoms/ScrollReveal/ScrollReveal";

const SCROLL_TOP = "max(5.5rem, calc(72px + 1rem))";

const Outer = styled(motion.section)`
  position: relative;
  width: 100vw;
  max-width: 100%;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  min-height: min(48vh, 440px);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  scroll-margin-top: ${SCROLL_TOP};
  overflow: hidden;
  background: linear-gradient(
    168deg,
    #08080d 0%,
    #0e0e16 38%,
    #0a0810 72%,
    #06060a 100%
  );

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(
        ellipse 90% 70% at 15% 0%,
        rgba(183, 0, 255, 0.11),
        transparent 52%
      ),
      radial-gradient(
        circle at 88% 100%,
        rgba(255, 255, 255, 0.04),
        transparent 42%
      );
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.45;
    background-image: repeating-linear-gradient(
      -12deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.012) 2px,
      rgba(255, 255, 255, 0.012) 3px
    );
  }

  @media (min-width: 810px) {
    scroll-margin-top: max(5.5rem, calc(80px + 1rem));
    min-height: min(52vh, 480px);
  }
`;

const Inner = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: min(100%, 72rem);
  margin: 0 auto;
  padding: 2.5rem max(1.25rem, env(safe-area-inset-left, 0px))
    2.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 3rem max(2rem, env(safe-area-inset-left, 0px)) 3rem
      max(2rem, env(safe-area-inset-right, 0px));
  }
`;

const Kicker = styled.span`
  display: block;
  font-family: var(--font-family-body);
  font-size: var(--font-size-kicker);
  font-weight: 600;
  letter-spacing: var(--font-letter-kicker);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.42);
  margin-bottom: 0.85rem;
`;

const Headline = styled.h2`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-size: var(--font-size-heading-section);
  line-height: var(--line-heading-section);
  font-weight: var(--weight-heading-section);
  letter-spacing: 0.02em;
  color: #fff;
  margin: 0;
  max-width: 20ch;
  text-wrap: balance;
`;

const Sub = styled.p`
  margin: 1.1rem 0 0;
  max-width: 38ch;
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  line-height: var(--line-body);
  color: rgba(255, 255, 255, 0.66);
`;

/**
 * Pełna szerokość bez zdjęcia — gradient / „płaskie” tło w rytmie jak thegrind.nl
 */
export default function SolidStatementBand({
  kicker,
  headline,
  sub,
  id,
  ariaLabelledBy,
  sectionKey,
}) {
  const reduce = useReducedMotion();
  const outerReveal = useScrollRevealProps({ y: 32, amount: 0.22 });

  const innerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.52,
        ease: easeOut,
        delay: reduce ? 0 : 0.08,
      },
    },
  };

  return (
    <Outer
      id={id}
      data-section-key={sectionKey}
      aria-labelledby={ariaLabelledBy}
      {...outerReveal}
    >
      <Inner
        variants={innerVariants}
        initial={reduce ? false : "hidden"}
        {...(reduce
          ? { animate: "show" }
          : {
              whileInView: "show",
              viewport: { once: true, amount: 0.35 },
            })}
      >
        {kicker && <Kicker>{kicker}</Kicker>}
        <Headline id={ariaLabelledBy || undefined}>{headline}</Headline>
        {sub && <Sub>{sub}</Sub>}
      </Inner>
    </Outer>
  );
}
