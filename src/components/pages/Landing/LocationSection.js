import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useScrollRevealProps } from "../../atoms/ScrollReveal/ScrollReveal";

const SCROLL_MARGIN = "max(5.5rem, calc(72px + 1rem))";

/** Współrzędne zgodne z centrum osadzonej mapy (place marker) */
const SZNYT_LAT = 52.24998854739966;
const SZNYT_LNG = 21.034546678984693;

const MAPS_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${SZNYT_LAT}%2C${SZNYT_LNG}`;
/** Oficjalny embed Google Maps (znacznik miejsca SZNYT) */
const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1779.2172388934118!2d21.034546678984693!3d52.24998854739966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecdd8291db21f%3A0xfd0693c86a1ef0d8!2sSznyt%20Barber%20Shop%20Fryzjer%20M%C4%99ski%20Praga%20P%C3%B3%C5%82noc!5e1!3m2!1spl!2spl!4v1775472635292!5m2!1spl!2spl";

const Section = styled(motion.section)`
  width: 100%;
  max-width: min(100%, 42rem);
  margin: 0 auto;
  padding: 2.5rem max(1.25rem, env(safe-area-inset-left, 0px)) 4rem
    max(1.25rem, env(safe-area-inset-right, 0px));
  box-sizing: border-box;
  scroll-margin-top: ${SCROLL_MARGIN};

  @media (min-width: 810px) {
    scroll-margin-top: max(5.5rem, calc(80px + 1rem));
  }
`;

const Title = styled.h2`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-size: var(--font-size-heading-section);
  line-height: var(--line-heading-section);
  font-weight: var(--weight-heading-section);
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.94);
  margin: 0 0 1.25rem;
  text-align: center;
`;

const Address = styled.p`
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  line-height: var(--line-body);
  color: rgba(255, 255, 255, 0.88);
  text-align: center;
  margin: 0 0 1.5rem;
`;

const HoursTable = styled.table`
  width: 100%;
  max-width: 22rem;
  margin: 0 auto 1.75rem;
  border-collapse: collapse;
  font-family: var(--font-family-body);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);

  th {
    font-weight: 600;
    padding: 0 0 0.65rem;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  td {
    padding: 0.4rem 0.35rem;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  td:first-of-type {
    text-align: left;
    color: rgba(255, 255, 255, 0.65);
  }
`;

const MapBlock = styled.div`
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
`;

const MapFrameWrap = styled.div`
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  aspect-ratio: 16 / 11;
  min-height: 200px;
  max-height: min(52vh, 440px);
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
`;

const MapFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1rem;
  text-align: center;
`;

const MapOpenLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  font-family: var(--font-family-body);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.82);
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(183, 0, 255, 0.4);
    color: #fff;
    background: rgba(183, 0, 255, 0.12);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(183, 0, 255, 0.5);
    outline-offset: 3px;
  }
`;

const MapCoords = styled.p`
  margin: 0;
  font-family: var(--font-family-body);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.38);
`;

export default function LocationSection({ sectionKey }) {
  const reveal = useScrollRevealProps({ y: 24, amount: 0.18 });

  return (
    <Section
      id="lokalizacja"
      data-section-key={sectionKey}
      aria-labelledby="lokalizacja-heading"
      {...reveal}
    >
      <Title id="lokalizacja-heading">Lokalizacja</Title>
      <Address>
        ul. Wrzesińska 6
        <br />
        Praga Północ, Warszawa
      </Address>
      <HoursTable>
        <thead>
          <tr>
            <th colSpan={3}>Godziny otwarcia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pon – Pt</td>
            <td>9:00–13:00</td>
            <td>13:30–18:00</td>
          </tr>
          <tr>
            <td>Sobota</td>
            <td>9:00–15:00</td>
            <td>—</td>
          </tr>
        </tbody>
      </HoursTable>
      <MapBlock>
        <MapFrameWrap>
          <iframe
            title="Mapa — SZNYT Barbershop, ul. Wrzesińska 6, Warszawa"
            src={MAPS_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </MapFrameWrap>
        <MapFooter>
          <MapOpenLink
            href={MAPS_OPEN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Otwórz w Google Maps
          </MapOpenLink>
          <MapCoords>
            {SZNYT_LAT.toFixed(6)}, {SZNYT_LNG.toFixed(6)}
          </MapCoords>
        </MapFooter>
      </MapBlock>
    </Section>
  );
}
