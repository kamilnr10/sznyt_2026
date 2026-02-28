import React from "react";
import styled from "styled-components";
import Navigation from "../../organisms/Navigation/Navigation";
import salonImage from "../../../assets/images/salon.png";

const PageBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-width: 100%;
  min-height: 100%;
  z-index: -2;
  background-image: url(${salonImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;

  @media (min-width: 1024px) {
    background-attachment: fixed;
  }
`;

/* Przyciemnienie i rozmycie na całej stronie – pełny ekran */
const PageBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.55) 50%,
    rgba(0, 0, 0, 0.65) 100%
  );
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  pointer-events: none;
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTemplate = ({ children }) => {
  return (
    <>
      <PageBackground />
      <PageBackdrop />
      <Wrapper>
        <Navigation />
        {children}
      </Wrapper>
    </>
  );
};

export default MainTemplate;
