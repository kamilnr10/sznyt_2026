import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
  min-height: min(58vh, 520px);
  height: auto;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  scroll-margin-top: ${SCROLL_TOP};
  overflow: ${({ $parallax }) => ($parallax ? "hidden" : "visible")};

  @media (min-width: 810px) {
    scroll-margin-top: max(5.5rem, calc(80px + 1rem));
    min-height: min(62vh, 580px);
  }
`;

const Bg = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url(${(p) => p.$src});
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
`;

/* Większa warstwa — miejsce na przesuw przy paralaksie bez „dziur” */
const ParallaxBg = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 135%;
  top: -17.5%;
  background-image: url(${(p) => p.$src});
  background-size: cover;
  background-position: center;
  will-change: transform;
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.35) 45%,
    rgba(0, 0, 0, 0.55) 100%
  );
`;

const Inner = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: min(100%, 72rem);
  margin: 0 auto;
  padding: 2.75rem max(1.25rem, env(safe-area-inset-left, 0px))
    2.5rem max(1.25rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 3.5rem max(2rem, env(safe-area-inset-left, 0px)) 3rem
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
  color: rgba(255, 255, 255, 0.5);
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
  max-width: 18ch;
  text-wrap: balance;
`;

const Sub = styled.p`
  margin: 1.15rem 0 0;
  max-width: 38ch;
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  line-height: var(--line-body);
  color: rgba(255, 255, 255, 0.72);
`;

/**
 * Pełna szerokość ze zdjęciem — jak thegrind.nl.
 * @param {boolean} [parallax] — przesuw tła względem scrolla (wyłączone przy prefers-reduced-motion)
 */
export default function FullBleedStatement({
  imageSrc,
  kicker,
  headline,
  sub,
  id,
  ariaLabelledBy,
  parallax = false,
  sectionKey,
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const outerReveal = useScrollRevealProps({ y: 40, amount: 0.28 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    parallax && !reduce ? ["12%", "-12%"] : [0, 0]
  );

  const innerVariants = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.55,
        ease: easeOut,
        delay: reduce ? 0 : 0.12,
      },
    },
  };

  const useParallax = Boolean(parallax && !reduce);

  return (
    <Outer
      ref={sectionRef}
      id={id}
      data-section-key={sectionKey}
      aria-labelledby={ariaLabelledBy}
      $parallax={useParallax}
      {...outerReveal}
    >
      {useParallax ? (
        <ParallaxBg
          $src={imageSrc}
          aria-hidden
          style={{ y: parallaxY }}
        />
      ) : (
        <Bg
          $src={imageSrc}
          aria-hidden
          initial={reduce ? false : { scale: 1.12 }}
          whileInView={{ scale: 1.02 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduce ? 0 : 1.05, ease: easeOut }}
        />
      )}
      <Scrim aria-hidden />
      <Inner
        variants={innerVariants}
        initial={reduce ? false : "hidden"}
        {...(reduce
          ? { animate: "show" }
          : {
              whileInView: "show",
              viewport: { once: true, amount: 0.3 },
            })}
      >
        {kicker && <Kicker>{kicker}</Kicker>}
        <Headline id={ariaLabelledBy}>{headline}</Headline>
        {sub && <Sub>{sub}</Sub>}
      </Inner>
    </Outer>
  );
}
