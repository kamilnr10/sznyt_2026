import React from "react";
import styled from "styled-components";

const HeaderText = styled.h1`
  margin: 0 auto;
  text-align: center;
`;

export const Header = ({ children }) => {
  return <HeaderText>{children}</HeaderText>;
};
