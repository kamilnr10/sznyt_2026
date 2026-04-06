import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "../../../helpers/debounce";
import { ReactComponent as BooksyLogo } from "../../../assets/booksy.svg";
import logoImage from "../../../assets/images/logo.png";
import {
  Bar,
  BrandLink,
  NavLogo,
  BarRight,
  BooksyButton,
  NavScroll,
  NavList,
  NavItem,
  NavAnchor,
  SocialCluster,
  MenuButton,
  MobileDrawer,
  MobileBackdrop,
  MobilePanel,
  MobileNavList,
  MobileNavItem,
  MobileNavAnchor,
} from "./Navigation.styles";

const NAV_LINKS = [
  { href: "#o-nas", label: "O nas" },
  { href: "#zespol", label: "Zespół" },
  { href: "#galeria", label: "Galeria" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
  { href: "#lokalizacja", label: "Lokalizacja" },
];

export default function Navigation() {
  const [barVisible, setBarVisible] = useState(true);
  const [barElevated, setBarElevated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = debounce(() => {
      const y = window.scrollY;
      setBarVisible(y < 90 || y < lastY.current);
      setBarElevated(y > 48);
      lastY.current = y;
    }, 100);

    setBarElevated(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 960px)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const makeLinkClick =
    (href) => (e) => {
      if (href === "#faq") {
        e.preventDefault();
        setMenuOpen(false);
        window.dispatchEvent(new CustomEvent("sznyt:open-faq"));
        window.history.replaceState(null, "", "#faq");
        return;
      }
      setMenuOpen(false);
    };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Bar $visible={barVisible} $elevated={barElevated}>
        <BrandLink
          href="#top"
          aria-label="SZNYT Barbershop — strona główna"
          onClick={scrollToTop}
        >
          <NavLogo src={logoImage} alt="" decoding="async" />
        </BrandLink>

        <NavScroll aria-label="Nawigacja sekcji">
          <NavList>
            {NAV_LINKS.map(({ href, label }) => (
              <NavItem key={href}>
                <NavAnchor href={href} onClick={makeLinkClick(href)}>
                  {label}
                </NavAnchor>
              </NavItem>
            ))}
          </NavList>
        </NavScroll>

        <BarRight>
          <MenuButton
            type="button"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu nawigacji"}
            aria-expanded={menuOpen}
            aria-controls="sznyt-mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="lg" />
          </MenuButton>
          <SocialCluster>
            <a
              href="https://www.instagram.com/sznytbarbershop/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="sm" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100083469366100"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} size="sm" />
            </a>
          </SocialCluster>
          <BooksyButton
            href="https://booksy.com/pl-pl/138044_sznyt-barbershop_barber-shop_3_warszawa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rezerwacja Booksy"
          >
            <BooksyLogo />
          </BooksyButton>
        </BarRight>
      </Bar>

      <MobileDrawer
        id="sznyt-mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacji"
        $open={menuOpen}
      >
        <MobileBackdrop type="button" aria-label="Zamknij menu" onClick={closeMenu} />
        <MobilePanel>
          <MobileNavList>
            {NAV_LINKS.map(({ href, label }) => (
              <MobileNavItem key={href}>
                <MobileNavAnchor href={href} onClick={makeLinkClick(href)}>
                  {label}
                </MobileNavAnchor>
              </MobileNavItem>
            ))}
          </MobileNavList>
        </MobilePanel>
      </MobileDrawer>
    </>
  );
}
