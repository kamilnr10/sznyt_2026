import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/globalStyles";
import Navigation from "./components/organisms/Navigation/Navigation";
import MainTemplate from "./components/organisms/MainTemplate/MainTemplate";
import TickerSection from "./components/organisms/TickerSection/TickerSection";
import OurStory from "./components/organisms/OurStory/OurStory";
import Reviews from "./components/organisms/Reviews/Reviews";
import VideoSection from "./components/organisms/VideoSection/VideoSection";
import Team from "./components/pages/Team/Team";
import Contact from "./components/pages/Contact/Contact";
import FindUs from "./components/pages/FindUs/FindUs";
import Galleries from "./components/pages/Galleries/Galleries";
import OurWorks from "./components/pages/OurWorks/OurWorks";
import Home from "./components/pages/Home/Home";
import Loading from "./components/organisms/Loading/Loading";

function App() {
  return (
    <div className="App">
      <GlobalStyle />

      <MainTemplate>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Galleries />} />
          <Route path="/gallery/:id" element={<OurWorks />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/findus" element={<FindUs />} /> */}
        </Routes>
      </MainTemplate>
    </div>
  );
}

export default App;
