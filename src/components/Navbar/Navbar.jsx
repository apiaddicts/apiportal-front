import React from "react";
import PropTypes from "prop-types";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./navbar.module.scss";
import SuraLogo from "../../static/img/sura_logo.svg"

function Navbar(props) {
  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <a className={classes.header__content__logo}>
          <img src={SuraLogo} alt="" className={classes.header__content__logo__img} />
          <p className={classes.header__content__logo__text}>/ API<span className={classes.header__content__logo__variant}>_MARKET</span></p>
        </a>

        <nav className={classes.header__content__nav}>
          <ul>
            <li>
              <a href="">APIs</a>
            </li>
            <li>
              <a href="">DOCUMENTACIÓN</a>
            </li>
            <li>
              <a href="">BLOG</a>
            </li>
            <li>
              <a href="">FAQs</a>
            </li>
            <li>
              <a href="">CONTACTO</a>
            </li>
          </ul>
          <button>Iniciar sesion</button>
          <button>Registrarse</button>
        </nav>
        <div className={classes.header__content__toggle}>
          <BiMenuAltRight />
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {};

export default Navbar;
