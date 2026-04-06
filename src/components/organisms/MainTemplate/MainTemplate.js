import React from "react";
import styled from "styled-components";
import Navigation from "../../organisms/Navigation/Navigation";
import CookieConsent from "../CookieConsent/CookieConsent";
import FaqDockBar from "../FaqDockBar/FaqDockBar";
/* JPG zamiast starego PNG; inny kadr niż hero (panorama) i niż „O nas” (roślina) — mniej powtórzeń, lepsza jakość */
import salonAmbientImage from "../../../assets/images/salon_1.jpg";

const PageBackground = styled.div`
  position: fixed;
  inset: 0;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  z-index: -2;
  background-color: #060608;
  background-image: url(${salonAmbientImage});
  background-size: cover;
  background-position: center 38%;
  background-repeat: no-repeat;
  background-attachment: scroll;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    /* Lekko studiuje kontrast i nasycenie — mniej „szarej” papki na dużym tle */
    background: rgba(6, 6, 10, 0.18);
    mix-blend-mode: multiply;
  }

  @media (min-width: 1024px) {
    background-attachment: fixed;
  }
`;

/* Warstwa nad zdjęciem: winieta + akcent marki + czytelność treści */
const PageBackdrop = styled.div`
  position: fixed;
  inset: 0;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse 120% 90% at 50% 108%,
      rgba(0, 0, 0, 0.55) 0%,
      transparent 52%
    ),
    radial-gradient(
      ellipse 70% 55% at 92% 8%,
      rgba(183, 0, 255, 0.1) 0%,
      transparent 48%
    ),
    radial-gradient(
      ellipse 60% 50% at 5% 15%,
      rgba(0, 0, 0, 0.35) 0%,
      transparent 45%
    ),
    linear-gradient(
      185deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.62) 42%,
      rgba(0, 0, 0, 0.76) 100%
    );
  -webkit-backdrop-filter: blur(2.5px) saturate(1.05);
  backdrop-filter: blur(2.5px) saturate(1.05);
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: clip;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainLandmark = styled.main`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  /* Miejsce na dolną belkę FAQ (zwiniętą) — treść nie chowa się pod paskiem */
  padding-bottom: calc(3.35rem + env(safe-area-inset-bottom, 0px));
`;

const MainTemplate = ({ children }) => {
  return (
    <>
      <PageBackground />
      <PageBackdrop />
      <Wrapper>
        <Navigation />
        <MainLandmark id="main-content">{children}</MainLandmark>
      </Wrapper>
      <FaqDockBar />
      <CookieConsent />
    </>
  );
};

export default MainTemplate;
