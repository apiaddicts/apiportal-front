import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { MdSearch, MdClose, MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';

import classes from './navbar.module.scss';
import SuraLogo from '../../static/img/sura_logo.svg';
import Button from '../Buttons/Button';

function Navbar({ setIsOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.header__content}>
          <a href='/' className={classes.header__content__logo}>
            <img
              src={SuraLogo}
              alt=''
              className={classes.header__content__logo__img}
            />
          </a>
          <nav className={`${classes.header__content__nav} ${menuOpen ? classes.isMenu : ''}`}>
            <ul>
              <li className='pr-2'>
                <Button type='button' styles='ghost-variant' onClick={() => { setIsOpen(true); }}>
                  Iniciar sesión
                </Button>
              </li>
              <li>
                <Button type='button' styles='secundary'>
                  registrate
                </Button>
              </li>
            </ul>

            <div className={classes.header__content__divider} />

            <div className={classes.header__content__search}>
              <MdSearch />
            </div>
          </nav>
          <div className={classes.header__content__toggle}>
            {!menuOpen ? <MdMenu onClick={menuToggleHandler} /> : <MdClose onClick={menuToggleHandler} />}
          </div>
        </div>
      </header>
      <div className={classes.buttom__nav}>
        <div className={classes.buttom__nav__logo}>
          SEGUROS
        </div>
        <div className={classes.buttom__nav__options}>
          <ul>
            <li>
              <Link to='/apis'>APIs</Link>
            </li>
            <li>
              <a href=''>DOCUMENTACIÓN</a>
            </li>
            <li>
              <Link to='/blog'>BLOG</Link>
            </li>
            <li>
              <a href='/faqs'>FAQs</a>
            </li>
            <li>
              <a href=''>CONTACTO</a>
            </li>
          </ul>
        </div>
      </div>

    </>
  );
}

Navbar.propTypes = {};

export default Navbar;
