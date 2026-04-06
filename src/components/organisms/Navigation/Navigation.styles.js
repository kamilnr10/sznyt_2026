import styled from "styled-components";

const BAR_HEIGHT = 72;
const BAR_HEIGHT_DESKTOP = 80;
const ACCENT_COLOR = "rgba(183, 0, 255, 0.95)";

export const Bar = styled.header`
  position: fixed;
  top: ${({ $visible }) => ($visible ? 0 : -BAR_HEIGHT)}px;
  left: 0;
  right: 0;
  height: ${BAR_HEIGHT}px;
  z-index: 1000;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.65rem;
  padding: 0 0.85rem;
  transition:
    top 0.35s ease-out,
    background 0.45s ease,
    border-color 0.35s ease,
    box-shadow 0.45s ease;
  /* Wyraźnie lżej niż wcześniej — widać treść strony przez szkło */
  background: ${({ $elevated }) =>
    $elevated
      ? `linear-gradient(
      180deg,
      rgba(6, 6, 12, 0.38) 0%,
      rgba(6, 6, 12, 0.22) 100%
    )`
      : `linear-gradient(
      180deg,
      rgba(8, 8, 14, 0.26) 0%,
      rgba(8, 8, 14, 0.12) 100%
    )`};
  backdrop-filter: blur(16px) saturate(155%);
  -webkit-backdrop-filter: blur(16px) saturate(155%);
  border-bottom: 1px solid
    ${({ $elevated }) =>
      $elevated ? "rgba(255, 255, 255, 0.07)" : "rgba(255, 255, 255, 0.05)"};
  box-shadow: ${({ $elevated }) =>
    $elevated ? `0 6px 28px rgba(0, 0, 0, 0.14)` : `none`};

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(183, 0, 255, 0.12),
      rgba(255, 255, 255, 0.12),
      rgba(183, 0, 255, 0.12),
      rgba(255, 255, 255, 0)
    );
    opacity: 0.85;
  }

  @media (min-width: 480px) {
    padding: 0 1.1rem;
    gap: 0.85rem;
  }

  @media (min-width: 810px) {
    height: ${BAR_HEIGHT_DESKTOP}px;
    top: ${({ $visible }) => ($visible ? 0 : -BAR_HEIGHT_DESKTOP)}px;
    padding: 0 1.5rem;
    gap: 1.25rem;
  }

  @media (min-width: 960px) {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  /* <960px: tylko logo + prawa grupa — grupa ma być przy prawej krawędzi */
  @media (max-width: 959px) {
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: 0.5rem;
  }
`;

export const BrandLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
  min-width: 0;

  @media (min-width: 960px) {
    justify-content: center;
  }
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.22s ease,
    filter 0.28s ease;

  &:hover,
  &:focus-visible {
    transform: scale(1.04);
    opacity: 0.94;
    filter: drop-shadow(0 0 12px rgba(183, 0, 255, 0.35));
  }

  &:focus-visible {
    outline: 2px solid rgba(183, 0, 255, 0.5);
    outline-offset: 3px;
    border-radius: 10px;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const NavLogo = styled.img`
  display: block;
  height: 38px;
  width: auto;
  max-width: min(46vw, 168px);
  object-fit: contain;

  @media (min-width: 480px) {
    height: 42px;
    max-width: 188px;
  }

  @media (min-width: 810px) {
    height: 48px;
    max-width: 210px;
  }
`;

/* Desktop: linki w rzędzie. Poniżej 960px: menu w panelu hamburgera */
export const NavScroll = styled.nav`
  display: none;
  min-width: 0;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 6%,
    #000 94%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 6%,
    #000 94%,
    transparent
  );

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 960px) {
    display: flex;
  }

  @media (min-width: 1100px) {
    mask-image: none;
    -webkit-mask-image: none;
    justify-content: center;
  }
`;

export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.88);
  cursor: pointer;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;

  &:hover,
  &:focus-visible {
    color: #fff;
    border-color: rgba(183, 0, 255, 0.35);
    background: rgba(183, 0, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid rgba(183, 0, 255, 0.45);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.96);
  }

  @media (min-width: 960px) {
    display: none;
  }
`;

export const MobileDrawer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1001;
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};

  @media (min-width: 960px) {
    display: none;
  }
`;

export const MobileBackdrop = styled.button`
  position: absolute;
  inset: 0;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgba(2, 2, 8, 0.62);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export const MobilePanel = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: ${BAR_HEIGHT}px;
  bottom: 0;
  padding: 1.25rem max(1rem, env(safe-area-inset-right, 0px))
    max(1.25rem, env(safe-area-inset-bottom, 0px))
    max(1rem, env(safe-area-inset-left, 0px));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(
    185deg,
    rgba(10, 8, 18, 0.97) 0%,
    rgba(4, 4, 10, 0.99) 100%
  );
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.35);

  @media (min-width: 810px) {
    top: ${BAR_HEIGHT_DESKTOP}px;
  }
`;

export const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 22rem;
`;

export const MobileNavItem = styled.li`
  margin: 0;
`;

export const MobileNavAnchor = styled.a`
  display: block;
  padding: 0.85rem 1rem;
  font-family: var(--font-family-body);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  border-radius: 12px;
  border: 1px solid transparent;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.08);
  }

  &:focus-visible {
    outline: 2px solid rgba(183, 0, 255, 0.45);
    outline-offset: 2px;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.15rem;
  white-space: nowrap;

  @media (min-width: 810px) {
    gap: 0.25rem;
  }
`;

export const NavItem = styled.li`
  flex-shrink: 0;
`;

export const NavAnchor = styled.a`
  display: block;
  padding: 0.45rem 0.5rem;
  font-family: var(--font-family-body);
  font-size: clamp(0.68rem, 2.4vw, 0.8125rem);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  border-radius: 10px;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;

  @media (min-width: 810px) {
    padding: 0.5rem 0.65rem;
    font-size: 0.75rem;
    letter-spacing: 0.14em;
  }

  &:hover,
  &:focus-visible {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(183, 0, 255, 0.45);
    outline-offset: 2px;
  }
`;

export const BarRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;
  gap: 0.35rem;
  flex-shrink: 0;
  min-width: 0;
  justify-self: end;

  @media (min-width: 480px) {
    gap: 0.45rem;
  }

  @media (min-width: 960px) {
    justify-content: flex-start;
    justify-self: auto;
    gap: 0.55rem;
  }

  @media (min-width: 810px) {
    gap: 0.65rem;
  }
`;

export const SocialCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 0.28rem;

  @media (min-width: 640px) {
    gap: 0.35rem;
  }

  a {
    display: inline-flex;
    width: 38px;
    height: 38px;

    @media (min-width: 640px) {
      width: 40px;
      height: 40px;
    }
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.72);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease,
      transform 0.2s ease;
  }

  a:hover,
  a:focus-visible {
    color: ${ACCENT_COLOR};
    border-color: rgba(183, 0, 255, 0.25);
    background: rgba(183, 0, 255, 0.08);
    transform: translateY(-1px);
  }

  @media (min-width: 810px) {
    a {
      width: 42px;
      height: 42px;
    }
  }
`;

export const BooksyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  height: 40px;
  padding: 0 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

  svg {
    width: 68px;
    height: 32px;
    display: block;
  }

  @media (min-width: 810px) {
    min-width: 96px;
    height: 44px;
    padding: 0 0.8rem;

    svg {
      width: 74px;
      height: 34px;
    }
  }

  &:hover,
  &:focus-visible {
    color: #fff;
    transform: translateY(-1px);
    border-color: rgba(183, 0, 255, 0.4);
    background: rgba(183, 0, 255, 0.12);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;
