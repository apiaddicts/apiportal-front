import React, { useEffect, useState } from 'react';
import { MdSearch, MdClose, MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';

import classes from './navbar.module.scss';
import SuraLogo from '../../static/img/sura_logo.svg';
import Button from '../Buttons/Button';
import Icon from '../MdIcon/Icon';

function Navbar({ setIsOpen, setOpenForm }) {
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

  const listOptions = [
    { icon: '', name: 'APIs', route: '/apis' },
    { icon: 'MdArrowDropDown', name: 'Documentación', route: '/documentacion' },
    { icon: '', name: 'Blog', route: '/blog' },
    { icon: '', name: 'FAQs', route: '/faqs' },
  ];

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
            <ul className='d-xs-none'>
              <li className='pr-2'>
                <Button type='button' styles='ghost-variant' onClick={() => { setIsOpen(true); }}>
                  Iniciar sesión
                </Button>
              </li>
              <li>
                <Button type='button' styles='secundary' onClick={() => { setOpenForm(true); }}>
                  registrate
                </Button>
              </li>
            </ul>

            <div className={`d-xs-only ${classes.navbar__xs}`}>

              <div className={classes.navbar__xs__header}>
                <div className={classes.navbar__xs__header__logo}>
                  <img src={SuraLogo} alt='Logo Sura' />
                </div>
                <div className={classes.navbar__xs__header__toggle}>
                  <MdClose onClick={menuToggleHandler} />
                </div>
              </div>
              <div className={classes.navbar__xs__section}>
                SEGUROS
              </div>

              <ul>
                {
                  listOptions.map((item, index) => (
                    <Link to={item.route} key={index} className='text__primary font-weight-medium' onClick={menuToggleHandler}>
                      <li>

                        <div className={classes.navbar__xs__icon}>
                          {item.icon ? (<Icon id={item.icon} />) : (
                            <div />
                          )}
                        </div>
                        <div>
                          {item.name}
                        </div>

                      </li>

                    </Link>
                  ))
                }
                <li className={classes.navbar__xs__opt__login}>
                  <div className={classes.navbar__xs__icon}>
                    <Icon id='MdAccountCircle' />
                  </div>
                  <div>
                    Iniciar sesión
                  </div>
                </li>
                <li>
                  <div className={classes.navbar__xs__icon}>
                    <Icon id='MdAccountCircle' />
                  </div>
                  <div>
                    Registrarte
                  </div>
                </li>
                <div className={classes.navbar__xs__search}>
                  <div className={classes.navbar__xs__icon}>
                    <Icon id='MdSearch' />
                  </div>
                  <div>
                    Buscar
                  </div>
                </div>
              </ul>

            </div>

            <div className={`d-xs-none ${classes.header__content__divider}`} />

            <div className={`d-xs-none ${classes.header__content__search}`}>
              <MdSearch />
            </div>
          </nav>
          <div className={classes.header__content__toggle}>
            {!menuOpen ? <MdMenu onClick={menuToggleHandler} /> : <div />}
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
