import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../../../assets/images/logo.png";

const HeroWrapper = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem 3rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    min-height: 70vh;
    padding: 4rem 1.5rem 3rem;
  }

  @media (min-width: 768px) {
    min-height: 75vh;
    padding: 5rem 2rem 4rem;
  }

  @media (min-width: 1024px) {
    min-height: 80vh;
    padding: 5rem 3rem 4rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 1rem;
  max-width: 560px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0 1.25rem;
  }

  @media (min-width: 768px) {
    max-width: 640px;
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    max-width: 680px;
  }
`;

const Overline = styled.span`
  display: inline-block;
  font-family: "Pirata One", cursive;
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: clamp(0.95rem, 2.2vw, 1.2rem);
    margin-bottom: 0.75rem;
  }
`;

const HeroLogo = styled.div`
  width: 100%;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;

  img {
    width: auto;
    max-width: min(45vw, 320px);
    height: auto;
    display: block;
    object-fit: contain;
    filter: drop-shadow(0 0 12px rgba(180, 0, 255, 0.7))
      drop-shadow(0 0 24px rgba(180, 0, 255, 0.4));
  }

  @media (min-width: 768px) {
    img {
      max-width: min(40vw, 380px);
    }
  }
`;

const Subtitle = styled.p`
  font-family: "Work Sans", sans-serif;
  font-size: clamp(0.875rem, 2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.5;
  margin-bottom: 1.25rem;
  font-weight: 400;
  padding: 0 0.25rem;

  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: clamp(0.95rem, 2.2vw, 1.15rem);
  }
`;

const CTA = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-family: "Ubuntu Mono", monospace;
  font-size: clamp(0.75rem, 1.6vw, 0.9rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;

  @media (min-width: 480px) {
    padding: 0.85rem 1.75rem;
    letter-spacing: 0.15em;
  }

  &:hover {
    background: #fff;
    color: #000;
    border-color: #fff;
  }
`;

const HomeHero = () => (
  <HeroWrapper>
    <HeroContent>
      <h1 className="visually-hidden">
        SZNYT Barbershop – fryzjer męski na Pradze Północ w Warszawie
      </h1>
      <Overline>Barbershop Praga Północ, Warszawa</Overline>
      <HeroLogo>
        <img
          src={logoImage}
          alt="SZNYT Barbershop – fryzjer męski Praga Północ, Warszawa"
        />
      </HeroLogo>
      <Subtitle>
        Luźna atmosfera, precyzyjne cięcia. Lokalny barber na Pradze Północ –
        zapraszamy mieszkańców Pragi i okolic. Styl i charakter w sercu Warszawy.
      </Subtitle>
      <CTA to="/contact">Rezerwacja</CTA>
    </HeroContent>
  </HeroWrapper>
);

export default HomeHero;
