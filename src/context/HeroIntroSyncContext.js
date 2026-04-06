import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import { readCookieConsent } from "../constants/cookieConsentStorage";

const HeroIntroSyncContext = createContext(null);

/**
 * introDone — odblokowanie tła hero i CTA.
 * narrativeInHero — wspólne napisy z layoutId renderowane w HomeHero (false = warstwa intro).
 * beginHandoff — przed zamknięciem dekoracji: przeniesienie napisów (shared layout).
 */
export function HeroIntroSyncProvider({ children }) {
  const reduce = useReducedMotion();
  const consentAtLoad = readCookieConsent();
  const introPlannedAtLoad = consentAtLoad && !reduce;

  const [introDone, setIntroDone] = useState(!introPlannedAtLoad);
  const [narrativeInHero, setNarrativeInHero] = useState(!introPlannedAtLoad);
  /** Stałe w tej sesji: czy na starcie czekaliśmy na intro (efekt „bloom” przy odblokowaniu). */
  const initialIntroBlocking = introPlannedAtLoad;
  const beginHandoff = useCallback(() => {
    setIntroDone(true);
    setNarrativeInHero(true);
  }, []);

  const notifyIntroExit = useCallback(() => {}, []);

  const value = useMemo(
    () => ({
      introDone,
      narrativeInHero,
      initialIntroBlocking,
      beginHandoff,
      notifyIntroExit,
    }),
    [
      introDone,
      narrativeInHero,
      initialIntroBlocking,
      beginHandoff,
      notifyIntroExit,
    ]
  );

  return (
    <HeroIntroSyncContext.Provider value={value}>
      {children}
    </HeroIntroSyncContext.Provider>
  );
}

export function useHeroIntroSync() {
  const ctx = useContext(HeroIntroSyncContext);
  if (!ctx) {
    throw new Error("useHeroIntroSync musi być w HeroIntroSyncProvider");
  }
  return ctx;
}
