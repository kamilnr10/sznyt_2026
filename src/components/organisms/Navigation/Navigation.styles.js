import styled from "styled-components";

const BAR_HEIGHT = 72;
const BAR_HEIGHT_DESKTOP = 80;

/** Główny pasek – zawsze na wierzchu (z-index 1000), fixed */
export const Bar = styled.header`
  position: fixed;
  top: ${({ $visible }) => ($visible ? 0 : -BAR_HEIGHT)}px;
  left: 0;
  right: 0;
  height: ${BAR_HEIGHT}px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  transition: top 0.35s ease-out;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media (min-width: 480px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 810px) {
    height: ${BAR_HEIGHT_DESKTOP}px;
    top: ${({ $visible }) => ($visible ? 0 : -BAR_HEIGHT_DESKTOP)}px;
    padding: 0 2rem;
  }
`;

export const HomeLink = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  font-family: "Pirata One", cursive;
  font-size: 1.35rem;
  letter-spacing: 0.02em;
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(180, 0, 255, 0.95);
  }

  @media (min-width: 810px) {
    font-size: 1.5rem;
  }
`;

export const BarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HamburgerButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const HamburgerIcon = styled.span`
  position: relative;
  display: block;
  width: 22px;
  height: 14px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.9);
    transition: transform 0.3s ease, top 0.3s ease, bottom 0.3s ease;
  }

  &::before {
    top: 0;
    transform: ${({ $open }) => ($open ? "translateY(6px) rotate(45deg)" : "none")};
  }

  &::after {
    bottom: 0;
    transform: ${({ $open }) => ($open ? "translateY(-6px) rotate(-45deg)" : "none")};
  }
`;

/** Pełnoekranowy overlay – pod paskiem (z-index 999), zamykany kliknięciem */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem 2rem;
  box-sizing: border-box;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
`;

export const MenuContent = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li span {
    font-family: "Ubuntu Mono", monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    margin-bottom: 0.15rem;
  }

  li a {
    font-family: "Alfa Slab One", sans-serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  li a:hover {
    color: rgba(180, 0, 255, 0.95);
  }
`;

export const MenuIcons = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  justify-content: center;

  a {
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.2s ease;
  }

  a:hover {
    color: rgba(180, 0, 255, 0.95);
  }
`;
