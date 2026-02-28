import React from "react";
import styled, { keyframes } from "styled-components";

const pathTriangleAnimation = keyframes`
    33% {
        stroke-dashoffset: 74;
    }
    66% {
        stroke-dashoffset: 147;
    }
    100% {
        stroke-dashoffset: 221;
    }
`;

const dotTriangleAnimation = keyframes`
    33% {
        transform: translate(0, 0);
    }
    66% {
        transform: translate(10px, -18px);
    }
    100% {
        transform: translate(-10px, -18px);
    }
`;

const pathRectAnimation = keyframes`
    25% {
        stroke-dashoffset: 64;
    }
    50% {
        stroke-dashoffset: 128;
    }
    75% {
        stroke-dashoffset: 192;
    }
    100% {
        stroke-dashoffset: 256;
    }
`;

const dotRectAnimation = keyframes`
    25% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(18px, -18px);
    }
    75% {
        transform: translate(0, -36px);
    }
    100% {
        transform: translate(-18px, -18px);
    }
`;

const pathCircleAnimation = keyframes`
    25% {
        stroke-dashoffset: 125;
    }
    50% {
        stroke-dashoffset: 175;
    }
    75% {
        stroke-dashoffset: 225;
    }
    100% {
        stroke-dashoffset: 275;
    }
`;

const LoaderWrapper = styled.div`
  --path: #bc14ff;
  --dot: #fefefe;
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: relative;
  /* top: 50%;
  left: 50%; */

  &:before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    position: absolute;
    display: block;
    background: var(--dot);
    top: 37px;
    left: 19px;
    transform: translate(-18px, -18px);
    animation: ${dotRectAnimation} var(--duration)
      cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;

    rect,
    polygon,
    circle {
      fill: none;
      stroke: var(--path);
      stroke-width: 10px;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    polygon {
      stroke-dasharray: 145 (221 - 145) 145 (221 - 145);
      stroke-dashoffset: 0;
      animation: ${pathTriangleAnimation} var(--duration)
        cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }

    rect {
      stroke-dasharray: calc(256 / 4 * 3) calc(256 / 4) calc(256 / 4 * 3)
        calc(256 / 4);
      stroke-dashoffset: 0;
      animation: ${pathRectAnimation} 3s cubic-bezier(0.785, 0.135, 0.15, 0.86)
        infinite;
    }

    circle {
      stroke-dasharray: calc(200 / 4 * 3) calc(200 / 4) calc(200 / 4 * 3)
        calc(200 / 4);
      stroke-dashoffset: 75;
      animation: ${pathCircleAnimation} var(--duration)
        cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
  }

  &.triangle {
    width: 48px;
    &:before {
      left: 21px;
      transform: translate(-10px, -18px);
      animation: ${dotTriangleAnimation} var(--duration)
        cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }
  }
`;

const Loading = () => {
  return (
    <LoaderWrapper className="loader">
      <svg viewBox="0 0 80 80">
        <circle id="test" cx="40" cy="40" r="32"></circle>
      </svg>
    </LoaderWrapper>
  );
};

export default Loading;
