import React, { useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { getSeoFaqItems } from "../../../constants/seoFaqContent";
import { LANDING_SECTION_KEYS } from "../../../constants/landingSectionKeys";

const Bar = styled.summary`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 52px;
  padding: 0.65rem max(1rem, env(safe-area-inset-right, 0px))
    calc(0.65rem + env(safe-area-inset-bottom, 0px))
    max(1rem, env(safe-area-inset-left, 0px));
  cursor: pointer;
  font-family: var(--font-family-nav);
  font-size: clamp(0.72rem, 2vw, 0.82rem);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.92);
  background: linear-gradient(
    180deg,
    rgba(14, 14, 22, 0.94) 0%,
    rgba(8, 8, 14, 0.98) 100%
  );
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: "▲";
    font-size: 0.65rem;
    opacity: 0.55;
    transition: transform 0.25s ease;
  }

  &:focus-visible {
    outline: 2px solid rgba(183, 0, 255, 0.85);
    outline-offset: -2px;
  }
`;

const Dock = styled.details`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 900;
  margin: 0;
  border: none;
  box-sizing: border-box;

  &[open] ${Bar}::after {
    transform: rotate(180deg);
  }
`;

const BarLead = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  text-align: left;
  min-width: 0;
`;

const BarTitle = styled.span`
  color: #fff;
`;

const BarHint = styled.span`
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.42);
`;

const Panel = styled.div`
  max-height: min(72vh, 520px);
  overflow: auto;
  padding: 1rem max(1rem, env(safe-area-inset-right, 0px)) 1.25rem
    max(1rem, env(safe-area-inset-left, 0px));
  background: rgba(6, 6, 10, 0.97);
  border-top: 1px solid rgba(183, 0, 255, 0.15);
  -webkit-overflow-scrolling: touch;
`;

const PanelTitle = styled.h2`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-size: clamp(1.05rem, 3vw, 1.35rem);
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem;
  line-height: 1.2;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FaqArticle = styled.article`
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Question = styled.h3`
  font-family: var(--font-family-nav);
  font-size: clamp(0.84rem, 2vw, 0.95rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.92);
  margin: 0 0 0.4rem;
  line-height: 1.35;
`;

const Answer = styled.p`
  font-family: var(--font-family-body);
  font-size: clamp(0.88rem, 2.1vw, 0.98rem);
  line-height: var(--line-body);
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  text-wrap: pretty;

  a {
    color: rgba(183, 0, 255, 0.95);
    text-decoration: underline;
    text-underline-offset: 3px;
    word-break: break-word;
  }
`;

function linkifyAnswer(text) {
  const url = /(https?:\/\/[^\s]+)/g;
  const parts = String(text).split(url);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export default function FaqDockBar() {
  const dockRef = useRef(null);
  const base =
    process.env.REACT_APP_SITE_URL?.trim().replace(/\/$/, "") ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const items = useMemo(() => getSeoFaqItems(base), [base]);

  useEffect(() => {
    const open = () => {
      const el = dockRef.current;
      if (!el) return;
      el.open = true;
      requestAnimationFrame(() => {
        el.querySelector("summary")?.scrollIntoView({ block: "nearest" });
      });
    };

    window.addEventListener("sznyt:open-faq", open);
    return () => window.removeEventListener("sznyt:open-faq", open);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#faq") return;
    requestAnimationFrame(() => {
      const el = dockRef.current;
      if (el) el.open = true;
    });
  }, []);

  return (
    <Dock
      ref={dockRef}
      id="faq"
      data-section-key={LANDING_SECTION_KEYS.FAQ}
    >
      <Bar>
        <BarLead>
          <BarTitle>FAQ — SZNYT Barbershop</BarTitle>
          <BarHint>Praga Północ · Warszawa · kliknij, by rozwinąć</BarHint>
        </BarLead>
      </Bar>
      <Panel id="faq-panel" aria-labelledby="faq-dock-heading">
        <PanelTitle id="faq-dock-heading">
          Najczęstsze pytania (SEO i pomoc dla gości)
        </PanelTitle>
        <Stack>
          {items.map(({ q, a }) => (
            <FaqArticle key={q}>
              <Question>{q}</Question>
              <Answer>{linkifyAnswer(a)}</Answer>
            </FaqArticle>
          ))}
        </Stack>
      </Panel>
    </Dock>
  );
}
