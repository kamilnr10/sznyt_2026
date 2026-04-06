import React, { useRef, useMemo } from "react";
import styled from "styled-components";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { easeOut } from "../../atoms/ScrollReveal/ScrollReveal";
import { mergeLandingBento } from "../../../helpers/mergeLandingGallery";
import fotelImg from "../../../assets/images/fotel.jpg";
import salon1Img from "../../../assets/images/salon_1.jpg";
import roslinaImg from "../../../assets/images/salon_roslina.jpg";
import foteleImg from "../../../assets/images/fotele.jpg";
import brzosiuImg from "../../../assets/images/brzosiu_mordzia.jpg";
import rafalImg from "../../../assets/images/rafal_mordzia.jpg";

const SCROLL_MARGIN = "max(5.5rem, calc(72px + 1rem))";

const Section = styled.section`
  width: 100%;
  max-width: min(100%, 72rem);
  margin: 0 auto;
  padding: 3rem max(1.25rem, env(safe-area-inset-left, 0px)) 3.5rem
    max(1.25rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;
  scroll-margin-top: ${SCROLL_MARGIN};

  @media (min-width: 810px) {
    scroll-margin-top: max(5.5rem, calc(80px + 1rem));
    padding-top: 3.5rem;
    padding-bottom: 4rem;
  }
`;

const RevealRoot = styled(motion.div)`
  width: 100%;
`;

const HeaderBlock = styled.div`
  margin-bottom: 2rem;
  max-width: 40rem;

  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
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
  margin-bottom: 0.65rem;
`;

const Title = styled.h2`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-size: var(--font-size-heading-section);
  line-height: var(--line-heading-section);
  font-weight: var(--weight-heading-section);
  letter-spacing: 0.02em;
  color: #fff;
  margin: 0 0 0.65rem;
`;

const Lead = styled.p`
  font-family: var(--font-family-body);
  font-size: var(--font-size-body-lead);
  line-height: var(--line-body);
  color: rgba(255, 255, 255, 0.62);
  margin: 0;
  max-width: 38ch;
`;

/* Bento: pierwszy duży kafel — jak siatka na thegrind.nl */
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, minmax(130px, 16vw));
    gap: 0.65rem;
  }
`;

const Cell = styled(motion.figure)`
  margin: 0;
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.35);
  aspect-ratio: 1;
  min-height: 140px;

  @media (min-width: 640px) {
    aspect-ratio: auto;
    min-height: 0;
    grid-column: ${(p) => p.$col || "auto"};
    grid-row: ${(p) => p.$row || "auto"};
  }

  &:hover .gallery-cell-img {
    transform: scale(1.04);
  }

  figcaption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    padding: 0.65rem 0.75rem;
    font-family: var(--font-family-body), "Work Sans", sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  }
`;

const CellMediaRoot = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const ParallaxShift = styled(motion.div)`
  position: absolute;
  left: 0;
  width: 100%;
  height: 118%;
  top: -9%;
  will-change: transform;
`;

const GalleryCellImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
`;

function GalleryCellMedia({ item, index }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : ["8%", "-8%"]
  );

  const loading = index < 2 ? "eager" : "lazy";

  const slotAttrs = {
    "data-gallery-slot": item.gallerySlot,
    "data-cms-context": "landing-bento",
    ...(item.fileHint && { "data-asset-file-hint": item.fileHint }),
    ...(item.fromCms && { "data-cms-remote": "true" }),
  };

  if (!item.parallax) {
    return (
      <CellMediaRoot>
        <GalleryCellImg
          className="gallery-cell-img"
          src={item.src}
          alt={item.alt}
          loading={loading}
          {...slotAttrs}
        />
      </CellMediaRoot>
    );
  }

  return (
    <CellMediaRoot ref={ref}>
      <ParallaxShift style={{ y }}>
        <GalleryCellImg
          className="gallery-cell-img"
          src={item.src}
          alt={item.alt}
          loading={loading}
          {...slotAttrs}
        />
      </ParallaxShift>
    </CellMediaRoot>
  );
}

/*
 * Układ 4×3 (thegrind-style bento):
 * [ duży 2×3 ] [ fotel 2×1 ]
 * [          ] [ rośl. ][ salon_1 ]
 * [          ] [ brzos ][ rafal ]
 */
const BENTO_ITEMS = [
  {
    src: foteleImg,
    alt: "Fotele barberskie w salonie SZNYT",
    cap: "Salon",
    col: "1 / 3",
    row: "1 / 4",
    parallax: true,
    gallerySlot: "landing.bento.hero-fotele",
    fileHint: "fotele.jpg",
  },
  {
    src: fotelImg,
    alt: "Stanowisko fryzjerskie",
    cap: "Stanowisko",
    col: "3 / 5",
    row: "1 / 2",
    parallax: true,
    gallerySlot: "landing.bento.stanowisko-fotel",
    fileHint: "fotel.jpg",
  },
  {
    src: roslinaImg,
    alt: "Wnętrze salonu z rośliną",
    cap: "Klimat",
    col: "3 / 4",
    row: "2 / 3",
    parallax: true,
    gallerySlot: "landing.bento.roslina",
    fileHint: "salon_roslina.jpg",
  },
  {
    src: salon1Img,
    alt: "Wnętrze barbershopu SZNYT",
    cap: "Przestrzeń",
    col: "4 / 5",
    row: "2 / 3",
    parallax: true,
    gallerySlot: "landing.bento.salon-1",
    fileHint: "salon_1.jpg",
  },
  {
    src: brzosiuImg,
    alt: "Zespół SZNYT przy pracy",
    cap: "Zespół",
    col: "3 / 4",
    row: "3 / 4",
    gallerySlot: "landing.bento.zespol-brzosiu",
    fileHint: "brzosiu_mordzia.jpg",
  },
  {
    src: rafalImg,
    alt: "Barber SZNYT",
    cap: "Detale",
    col: "4 / 5",
    row: "3 / 4",
    gallerySlot: "landing.bento.zespol-rafal",
    fileHint: "rafal_mordzia.jpg",
  },
];

export default function GallerySection({ sectionKey, galleryRecord }) {
  const reduce = useReducedMotion();
  const items = useMemo(
    () => mergeLandingBento(BENTO_ITEMS, galleryRecord),
    [galleryRecord]
  );

  const rootVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.13,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.52, ease: easeOut },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.48,
        ease: easeOut,
        staggerChildren: reduce ? 0 : 0.065,
        delayChildren: reduce ? 0 : 0.04,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: reduce ? 0 : 0.44, ease: easeOut },
    },
  };

  return (
    <Section
      id="galeria"
      data-section-key={sectionKey}
      aria-labelledby="galeria-heading"
    >
      <RevealRoot
        variants={rootVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.14, margin: "0px 0px -8% 0px" }}
      >
        <motion.div variants={headerVariants}>
          <HeaderBlock>
            <Kicker>Galeria</Kicker>
            <Title id="galeria-heading">Miejsce i ludzie</Title>
            <Lead>
              Kilka kadrów z salonu na Pradze — wnętrze, fotele i ekipa. Tak
              wygląda SZNYT na co dzień.
            </Lead>
          </HeaderBlock>
        </motion.div>
        <Grid variants={gridVariants}>
          {items.map((item, i) => (
            <Cell
              key={i}
              $col={item.col}
              $row={item.row}
              variants={cellVariants}
              data-gallery-slot={item.gallerySlot}
              data-cms-context="landing-bento"
            >
              <GalleryCellMedia item={item} index={i} />
              <figcaption>{item.cap}</figcaption>
            </Cell>
          ))}
        </Grid>
      </RevealRoot>
    </Section>
  );
}
