import Ticker from "framer-motion-ticker";
import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-animated-slider";
import "react-animated-slider/build/vertical.css";
import adziu from "../../../assets/adziu.png";
import brzosiu from "../../../assets/brzosiu.png";
import rafal from "../../../assets/rafal.png";

const slides = [adziu, brzosiu, rafal];

const TickerContainer = styled.div`
  width: 100%;
  height: 100vh - 80px;
  margin: 80px auto 0;

  @media (min-width: 810px) {
    grid-area: 1 / 1 / 4 / 2;
  }

  @media (min-width: 1200px) {
    /* grid-area: 60% / 1 / 4 / 2; */
  }

  .slider {
    height: 80vh;
    @media (min-width: 810px) {
      height: 100%;
    }

    @media (min-width: 1200px) {
      height: 100%;
      width: 80%;
      margin: 0 auto;
    }
  }

  div {
    /* border: 2px solid green; */
    /* -webkit-box-shadow: inset 0px -12px 18px 0px rgba(0, 0, 255, 1);
    -moz-box-shadow: inset 0px -12px 18px 0px rgba(0, 0, 255, 1);
    box-shadow: inset 0px -12px 18px 0px rgba(0, 0, 255, 1); */
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
    margin: 0;
    height: 100%;
    width: 100%;
  }
`;

const TickerSection = () => {
  return (
    <TickerContainer>
      <Slider
        direction="vertical"
        autoplay={100}
        nextButton
        previousButton
        touchDisabled="true"
      >
        {slides.map((item, index) => (
          <ImgContainer key={index}>
            <img src={item} alt="review" />
          </ImgContainer>
        ))}
      </Slider>
    </TickerContainer>
  );
};

export default TickerSection;
