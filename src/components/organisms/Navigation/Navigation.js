import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { debounce } from "../../../helpers/debounce";
import { LockScreen } from "../../atoms/LockScreen/LockScreen";
import { ReactComponent as BooksyLogo } from "../../../assets/booksy.svg";
import {
  Bar,
  HomeLink,
  BarRight,
  HamburgerButton,
  HamburgerIcon,
  Overlay,
  MenuContent,
  MenuIcons,
} from "./Navigation.styles";

const closeMenu = (setOpen) => () => setOpen(false);

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(true);
  const location = useLocation();

  const lastY = useRef(0);
  const onScroll = debounce(() => {
    const y = window.scrollY;
    setBarVisible(y < 90 || y < lastY.current);
    lastY.current = y;
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Bar $visible={barVisible}>
        <HomeLink as={Link} to="/" onClick={closeMenu(setMenuOpen)}>
          SZNYT
        </HomeLink>

        <BarRight>
          <a
            href="https://booksy.com/pl-pl/138044_sznyt-barbershop_barber-shop_3_warszawa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rezerwacja Booksy"
          >
            <BooksyLogo style={{ width: 80, height: 40, display: "block" }} />
          </a>
          <HamburgerButton
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menuOpen}
          >
            <HamburgerIcon $open={menuOpen} />
          </HamburgerButton>
        </BarRight>
      </Bar>

      <Overlay
        $open={menuOpen}
        onClick={closeMenu(setMenuOpen)}
        aria-hidden={!menuOpen}
      >
        <MenuContent onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>
              <span>01</span>
              <Link to="/team" onClick={closeMenu(setMenuOpen)}>
                Zespół
              </Link>
            </li>
            <li>
              <span>02</span>
              <Link to="/gallery" onClick={closeMenu(setMenuOpen)}>
                Galeria
              </Link>
            </li>
            <li>
              <span>03</span>
              <Link to="/contact" onClick={closeMenu(setMenuOpen)}>
                Kontakt
              </Link>
            </li>
            <li>
              <span>04</span>
              <Link to="/findus" onClick={closeMenu(setMenuOpen)}>
                Lokalizacja
              </Link>
            </li>
          </ul>
          <MenuIcons>
            <a
              href="https://www.instagram.com/sznytbarbershop/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100083469366100"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
          </MenuIcons>
        </MenuContent>
      </Overlay>

      {menuOpen && <LockScreen />}
    </>
  );
}
