import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import {
  readCookieConsent,
  writeCookieConsent,
} from "../../../constants/cookieConsentStorage";

const ACCENT = "rgba(183, 0, 255, 0.95)";
const ACCENT_SOFT = "rgba(183, 0, 255, 0.14)";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: max(0.75rem, env(safe-area-inset-bottom, 0px))
    max(0.75rem, env(safe-area-inset-right, 0px))
    max(0.75rem, env(safe-area-inset-bottom, 0px))
    max(0.75rem, env(safe-area-inset-left, 0px));

  @media (min-width: 640px) {
    align-items: center;
    padding: 1.5rem;
  }
`;

const Panel = styled.div`
  width: 100%;
  max-width: 36rem;
  max-height: min(88vh, 640px);
  overflow: auto;
  border-radius: 20px 20px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(
    165deg,
    rgba(18, 18, 26, 0.97) 0%,
    rgba(10, 10, 16, 0.98) 100%
  );
  box-shadow:
    0 -8px 48px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  padding: 1.35rem 1.25rem 1.5rem;

  @media (min-width: 640px) {
    border-radius: 22px;
    padding: 1.65rem 1.75rem 1.75rem;
    max-height: min(90vh, 560px);
  }
`;

const TopAccent = styled.div`
  height: 3px;
  border-radius: 999px;
  margin: -0.35rem 0 1rem;
  background: linear-gradient(
    90deg,
    transparent,
    ${ACCENT} 35%,
    rgba(255, 255, 255, 0.35) 100%
  );
  opacity: 0.85;

  @media (min-width: 640px) {
    margin-top: -0.5rem;
  }
`;

const Title = styled.h2`
  font-family: var(--font-family-display), "Syne", system-ui, sans-serif;
  font-size: clamp(1.15rem, 3.2vw, 1.35rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fff;
  margin: 0 0 0.65rem;
  line-height: 1.2;
`;

const Lead = styled.p`
  font-family: var(--font-family-body);
  font-size: clamp(0.84rem, 2vw, 0.92rem);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.68);
  margin: 0 0 1rem;
`;

const PrivacyLink = styled.a`
  color: rgba(255, 255, 255, 0.88);
  text-decoration: underline;
  text-decoration-color: ${ACCENT_SOFT};
  text-underline-offset: 3px;

  &:hover,
  &:focus-visible {
    color: ${ACCENT};
  }
`;

const ToggleDetails = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 1rem;
  padding: 0.35rem 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: var(--font-family-body);
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.04em;
  text-transform: uppercase;

  &:hover,
  &:focus-visible {
    color: rgba(255, 255, 255, 0.85);
  }

  &:focus-visible {
    outline: 2px solid ${ACCENT};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

const DetailsBlock = styled.div`
  margin-bottom: 1.1rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.28);
`;

const Category = styled.div`
  & + & {
    margin-top: 0.85rem;
    padding-top: 0.85rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
`;

const CategoryTitle = styled.div`
  font-family: var(--font-family-nav);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 0.35rem;
`;

const CategoryText = styled.p`
  font-family: var(--font-family-body);
  font-size: 0.8125rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.52);
  margin: 0;
`;

const Row = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  margin-top: 0.65rem;
  cursor: pointer;
  font-family: var(--font-family-body);
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.4;
`;

const Checkbox = styled.input`
  margin-top: 0.2rem;
  width: 1.05rem;
  height: 1.05rem;
  accent-color: #b700ff;
  flex-shrink: 0;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  @media (min-width: 480px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.65rem;
  }
`;

const Btn = styled.button`
  flex: 1 1 auto;
  min-height: 48px;
  padding: 0 1.15rem;
  border-radius: 999px;
  font-family: var(--font-family-nav);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease;

  &:focus-visible {
    outline: 2px solid ${ACCENT};
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

const BtnGhost = styled(Btn)`
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.92);

  &:hover:not(:disabled) {
    border-color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const BtnPrimary = styled(Btn)`
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(
    135deg,
    rgba(183, 0, 255, 0.42) 0%,
    rgba(100, 0, 160, 0.35) 100%
  );
  color: #fff;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);

  &:hover:not(:disabled) {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.42);
  }
`;

const BtnSave = styled(BtnGhost)`
  @media (min-width: 480px) {
    flex: 1 1 100%;
    order: 3;
  }
`;

const Footnote = styled.p`
  margin: 0.85rem 0 0;
  font-family: var(--font-family-body);
  font-size: 0.6875rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.38);
`;

function privacyHref() {
  const fromEnv = process.env.REACT_APP_SITE_URL?.trim().replace(/\/$/, "");
  const base =
    fromEnv ||
    (typeof window !== "undefined" ? window.location.origin : "") ||
    "";
  const custom = process.env.REACT_APP_PRIVACY_POLICY_URL?.trim();
  if (custom) return custom;
  return base ? `${base}/polityka-prywatnosci` : "/polityka-prywatnosci";
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const firstBtnRef = useRef(null);

  useEffect(() => {
    setOpen(!readCookieConsent());
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstBtnRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const acceptNecessary = useCallback(() => {
    writeCookieConsent({ necessary: true, analytics: false, marketing: false });
    close();
  }, [close]);

  const acceptAll = useCallback(() => {
    writeCookieConsent({ necessary: true, analytics: true, marketing: true });
    close();
  }, [close]);

  const saveCustom = useCallback(() => {
    writeCookieConsent({ necessary: true, analytics, marketing });
    close();
  }, [analytics, marketing, close]);

  if (!open) return null;

  const privacy = privacyHref();

  return (
    <Backdrop
      role="presentation"
      aria-hidden={false}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <TopAccent aria-hidden />
        <Title id="cookie-consent-title">Pliki cookie i dane</Title>
        <Lead id="cookie-consent-desc">
          Używamy plików cookie i podobnych technologii, aby strona działała
          poprawnie (np. zapamiętanie tej decyzji), a opcjonalnie — do
          anonimowych statystyk lub marketingu, jeśli wyrazisz zgodę. Szczegóły
          znajdziesz w{" "}
          <PrivacyLink href={privacy} target="_blank" rel="noopener noreferrer">
            polityce prywatności
          </PrivacyLink>
          . Możesz w każdej chwili zmienić ustawienia, czyszcząc dane strony w
          przeglądarce lub kontaktując się z nami.
        </Lead>

        <ToggleDetails
          type="button"
          aria-expanded={detailsOpen}
          onClick={() => setDetailsOpen((v) => !v)}
        >
          {detailsOpen ? "Ukryj kategorie" : "Kategorie i wybór"}
        </ToggleDetails>

        {detailsOpen && (
          <DetailsBlock>
            <Category>
              <CategoryTitle>Niezbędne</CategoryTitle>
              <CategoryText>
                Zawsze aktywne — np. zapis preferencji dotyczących cookies,
                bezpieczeństwo i podstawowe działanie serwisu. Zgodnie z prawem
                nie wymagają osobnej zgody.
              </CategoryText>
            </Category>
            <Category>
              <CategoryTitle>Analityczne (opcjonalne)</CategoryTitle>
              <CategoryText>
                Pomagają zrozumieć, jak korzystasz ze strony (zagregowane dane).
              </CategoryText>
              <Row>
                <Checkbox
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span>Zgadzam się na pliki cookie analityczne</span>
              </Row>
            </Category>
            <Category>
              <CategoryTitle>Marketingowe (opcjonalne)</CategoryTitle>
              <CategoryText>
                Personalizacja treści i pomiar skuteczności kampanii, jeśli
                kiedyś dodamy takie narzędzia.
              </CategoryText>
              <Row>
                <Checkbox
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                <span>Zgadzam się na pliki cookie marketingowe</span>
              </Row>
            </Category>
          </DetailsBlock>
        )}

        <ButtonRow>
          <BtnGhost
            ref={firstBtnRef}
            type="button"
            onClick={acceptNecessary}
          >
            Tylko niezbędne
          </BtnGhost>
          <BtnPrimary type="button" onClick={acceptAll}>
            Akceptuję wszystkie
          </BtnPrimary>
          {detailsOpen && (
            <BtnSave type="button" onClick={saveCustom}>
              Zapisz wybrane
            </BtnSave>
          )}
        </ButtonRow>

        <Footnote>
          Wybór jest dobrowolny. Odrzucenie opcjonalnych cookies nie blokuje
          korzystania ze strony. Zgodnie z wytycznymi RODO oraz dobrymi
          praktykami zarządzania prywatnością (w tym podejściem zgodnym z ISO/IEC
          27701 w zakresie komunikacji z użytkownikiem) informujemy przejrzyście
          i umożliwiamy odmowę lub ograniczenie zgody.
        </Footnote>
      </Panel>
    </Backdrop>
  );
}
