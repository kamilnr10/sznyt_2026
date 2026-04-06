import React, { useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useScrollRevealProps } from "../../atoms/ScrollReveal/ScrollReveal";
import storyImage from "../../../assets/images/fotel.jpg";
import {
  ABOUT_FALLBACK_HEADING,
  ABOUT_FALLBACK_PARAGRAPHS,
  isInvalidAboutText,
} from "../../../constants/aboutFallbackCopy";

const Section = styled(motion.section)`
  width: 100%;
  max-width: min(100%, 72rem);
  padding: 3rem max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem
    max(1.25rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  scroll-margin-top: max(5.5rem, calc(72px + 1rem));

  @media (min-width: 480px) {
    padding-top: 3.25rem;
    padding-bottom: 4rem;
    padding-inline: max(1.5rem, env(safe-area-inset-left, 0px))
      max(1.5rem, env(safe-area-inset-right, 0px));
  }

  @media (min-width: 810px) {
    scroll-margin-top: max(5.5rem, calc(80px + 1rem));
    margin: 0 auto;
    padding: 3.5rem max(2rem, env(safe-area-inset-left, 0px)) 4rem
      max(2rem, env(safe-area-inset-right, 0px));
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  align-items: center;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: 3rem;
  }
`;

const Copy = styled.div`
  order: 1;

  @media (min-width: 900px) {
    order: 0;
  }
`;

const Kicker = styled.span`
  display: block;
  font-family: var(--font-family-body);
  font-size: var(--font-size-kicker);
  font-weight: 600;
  letter-spacing: var(--font-letter-kicker);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 0.85rem;
`;

const Heading = styled.h2`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-size: var(--font-size-heading-section);
  line-height: var(--line-heading-section);
  font-weight: var(--weight-heading-section);
  letter-spacing: 0.02em;
  color: #fff;
  margin: 0 0 1.25rem;
  text-wrap: balance;

  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Text = styled.p`
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  line-height: var(--line-body);
  color: rgba(255, 255, 255, 0.78);
  margin: 0;
  max-width: 52ch;
  text-align: left;
  text-wrap: pretty;
`;

const BodyStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 52ch;
`;

const VisualColumn = styled.div`
  order: 0;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;

  @media (min-width: 900px) {
    order: 1;
    gap: 1.35rem;
  }
`;

const Visual = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  aspect-ratio: 4 / 5;

  @media (min-width: 900px) {
    border-radius: 24px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      145deg,
      rgba(183, 0, 255, 0.08) 0%,
      transparent 45%
    );
    pointer-events: none;
  }
`;

const ParallaxInner = styled(motion.div)`
  position: absolute;
  left: 0;
  width: 100%;
  height: 122%;
  top: -11%;
  will-change: transform;
`;

const StoryImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function StoryVisual({ src, alt }) {
  const reduce = useReducedMotion();
  const visualRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : ["11%", "-11%"]
  );

  return (
    <Visual ref={visualRef}>
      <ParallaxInner style={{ y }}>
        <StoryImg src={src} alt={alt} loading="lazy" />
      </ParallaxInner>
    </Visual>
  );
}

const OurStory = ({
  header,
  secondSentence,
  footer,
  loading,
  sectionId = "o-nas",
  sectionKey,
  kicker = "SZNYT",
}) => {
  const reveal = useScrollRevealProps({ y: 32, amount: 0.2 });

  if (loading) {
    return (
      <Section
        id={sectionId}
        data-section-key={sectionKey}
        aria-busy="true"
        aria-labelledby="o-nas-heading"
        {...reveal}
      >
        <Grid>
          <Copy>
            <Kicker>{kicker}</Kicker>
            <Heading id="o-nas-heading">O nas</Heading>
            <Text>Ładowanie…</Text>
          </Copy>
          <VisualColumn>
            <StoryVisual src={storyImage} alt="" />
          </VisualColumn>
        </Grid>
      </Section>
    );
  }

  const rawHeader = header && String(header).trim();
  const rawSecond = secondSentence && String(secondSentence).trim();
  const useFallbackHeading =
    !rawHeader || isInvalidAboutText(rawHeader);
  const useFallbackBody =
    !rawSecond || isInvalidAboutText(rawSecond);
  const displayHeading = useFallbackHeading
    ? ABOUT_FALLBACK_HEADING
    : rawHeader;
  const showCmsNote = Boolean(
    rawSecond && isInvalidAboutText(rawSecond)
  );

  return (
    <Section
      id={sectionId}
      data-section-key={sectionKey}
      aria-labelledby="o-nas-heading"
      {...reveal}
    >
      <Grid>
        <Copy>
          <Kicker>{kicker}</Kicker>
          <Heading id="o-nas-heading">{displayHeading}</Heading>
          {useFallbackBody ? (
            <BodyStack>
              {ABOUT_FALLBACK_PARAGRAPHS.map((block, i) => (
                <Text key={i}>{block}</Text>
              ))}
            </BodyStack>
          ) : (
            <Text>{rawSecond}</Text>
          )}
          {showCmsNote && (
            <Text
              style={{
                marginTop: "1rem",
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Treść z CMS została zastąpiona (wykryto niepasujący fragment).
              Uzupełnij pole opisu po polsku w DatoCMS.
            </Text>
          )}
          {footer && String(footer).trim() && !isInvalidAboutText(footer) && (
            <Text style={{ marginTop: "1.15rem" }}>{String(footer).trim()}</Text>
          )}
        </Copy>
        <VisualColumn>
          <StoryVisual
            src={storyImage}
            alt="Stanowisko fryzjerskie w salonie SZNYT Barbershop, Praga Północ, Warszawa"
          />
        </VisualColumn>
      </Grid>
    </Section>
  );
};

export default OurStory;
