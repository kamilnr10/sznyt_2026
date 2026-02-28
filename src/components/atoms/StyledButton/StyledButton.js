import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 10%;
  min-width: 150px;
  border-radius: 2.7777777778vw;
  padding: 1.5333333333vw;
  margin: 4.8333333333vw;
  background-color: transparent;
  border: 2px solid white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  tranisition: all 0.3s;

  @media (min-width: 400px) {
    margin: 8.8333333333vw;
  }

  @media (min-width: 1200px) {
    padding: 1.0333333333vw;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #b700ff;
    transform: translateY(100%);
    transition: transform 0.3s;
    z-index: -1;
  }

  &:hover {
    /* background-color: #241ff3; */

    &::after {
      transform: translateY(0%);
    }
  }

  span {
    /* z-index: 10; */
  }
`;

export const Button = ({ children }) => {
  return (
    <StyledButton>
      <span>{children}</span>
    </StyledButton>
  );
};
