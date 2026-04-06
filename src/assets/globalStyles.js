import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
  /* Króje — styl zbliżony do czytelnych, „editorial” landingów (np. thegrind.nl): Syne + DM Sans + Outfit w UI */
  --font-family-display: "Syne", system-ui, sans-serif;
  --font-family-body: "DM Sans", "Work Sans", system-ui, sans-serif;
  --font-family-nav: "Outfit", "Plus Jakarta Sans", system-ui, sans-serif;
  --font-family-nav-wordmark: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-family-monospace: "Roboto Mono", ui-monospace, monospace;

  /* Kicker / overline — jeden rozmiar w sekcjach */
  --font-size-kicker: clamp(0.64rem, 1.4vw, 0.72rem);
  --font-letter-kicker: 0.2em;

  /* Nagłówki sekcji (h2) — ta sama skala wszędzie poza hero */
  --font-size-heading-section: clamp(1.85rem, 4.35vw, 2.65rem);
  --line-heading-section: 1.08;
  --weight-heading-section: 700;

  /* Hero: ten sam rząd wielkości co overline (kicker), lekko mocniejsza hierarchia */
  --font-size-heading-hero: clamp(0.72rem, 2.15vw, 0.92rem);
  --line-heading-hero: 1.3;

  /* Tekst podstawowy — spójny body */
  --font-size-body: clamp(0.94rem, 2.05vw, 1.06rem);
  --line-body: 1.65;
  --font-size-body-lead: clamp(0.96rem, 2.15vw, 1.08rem);

  /* Legacy aliases (komponenty mogą stopniowo migrować) */
  --font-size-1: var(--font-size-heading-section);
  --font-size-body-legacy: var(--font-size-body);

  --heading-h1-margin-bottom: 0.55em;
  --heading-h2-margin-top: 1.65rem;
  --heading-h2-margin-bottom: 0.5em;
  --heading-stack-gap: 0.7rem;
}

*,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: calc(15px + 0.390625vw);
  scroll-behavior: smooth;
  font-family: var(--font-family-body);
  color: #fff;
}

body {
  background: #000000;
  box-sizing: border-box;
  overflow-x: clip;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: darkgrey;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #b700ff;
  }
}

  h1 {
    font-family: var(--font-family-display);
    color: #fff;
    font-size: var(--font-size-heading-section);
    line-height: var(--line-heading-section);
    font-weight: var(--weight-heading-section);
    letter-spacing: 0.02em;
    margin: 0 0 var(--heading-h1-margin-bottom);
    text-wrap: balance;
  }

  h2 {
    font-family: var(--font-family-display);
    color: rgba(255, 255, 255, 0.94);
    font-size: var(--font-size-heading-section);
    line-height: var(--line-heading-section);
    font-weight: var(--weight-heading-section);
    letter-spacing: 0.02em;
    margin: var(--heading-h2-margin-top) 0 var(--heading-h2-margin-bottom);
    text-wrap: balance;
  }

  h2:first-child {
    margin-top: 0;
  }

  h1 + h2 {
    margin-top: var(--heading-stack-gap);
  }

  h1 + p,
  h2 + p {
    margin-top: 0;
  }

  p {
    font-family: var(--font-family-body);
    font-size: var(--font-size-body);
    line-height: var(--line-body);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default GlobalStyle;
