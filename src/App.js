import React from "react";
import { LayoutGroup } from "framer-motion";
import GlobalStyle from "./assets/globalStyles";
import MainTemplate from "./components/organisms/MainTemplate/MainTemplate";
import FirstVisitIntro from "./components/organisms/FirstVisitIntro/FirstVisitIntro";
import LandingPage from "./components/pages/Landing/LandingPage";
import SeoHead from "./components/SeoHead";
import { HeroIntroSyncProvider, useHeroIntroSync } from "./context/HeroIntroSyncContext";

function IntroBridge() {
  const { notifyIntroExit } = useHeroIntroSync();
  return <FirstVisitIntro onExitComplete={notifyIntroExit} />;
}

function App() {
  return (
    <HeroIntroSyncProvider>
      <LayoutGroup id="sznyt-handoff-root">
        <div className="App">
          <GlobalStyle />
          <SeoHead />

          <MainTemplate>
            <LandingPage />
          </MainTemplate>
          <IntroBridge />
        </div>
      </LayoutGroup>
    </HeroIntroSyncProvider>
  );
}

export default App;
