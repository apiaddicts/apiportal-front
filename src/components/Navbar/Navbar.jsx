import React, { useEffect, useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';

import classes from './navbar.module.scss';
import Button from '../Buttons/Button';
import Icon from '../MdIcon/Icon';
/*import { ReactComponent as Logo } from '../../static/img/logo.svg';*/
import CustomIcon from '../MdIcon/CustomIcon';

function Navbar({ setIsOpen, setOpenForm }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
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
    if (size.width < 768 && menuOpen) {
      setMenuOpen(true);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const listOptions = [
    { icon: '', name: 'APIs', route: '/apis' },
    { icon: '', name: 'Blog', route: '/blog' },
    { icon: '', name: 'FAQs', route: '/faqs' },
  ];

  return (
    <div style={{ position: 'fixed', top: '0', width: '100%', zIndex: '5000' }}>
      <header className={classes.header}>
        <div className={`container ${classes.header__content}`}>
          <NavLink to='/' className={classes.header__content__logo}>
            <div className={classes.header__content__logo__img}>
              {/*<CustomIcon name='logo' />
              <CustomIcon name='fintech' />*/}
            </div>
            <CustomIcon name='logo' />
          </NavLink>
          <nav className={`${classes.header__content__nav} ${menuOpen ? classes.isMenu : ''}`}>

            <ul className={classes.show__lg__up__buttons}>
              <li className='pr-2'>
                <Button type='button' styles='ghost-variant' size='small' icon='account' style={{ width: '200px', height: '32px' }} onClick={() => { setIsOpen(true); }}>
                  Iniciar sesión
                </Button>
              </li>
              <li>
                <Button type='button' styles='primary' size='small' style={{ width: '140px', height: '32px' }} onClick={() => { setOpenForm(true); }}>
                  regístrate
                </Button>
              </li>
            </ul>

            <div className={classes.navbar__xs}>

              <div className={classes.navbar__xs__header}>
                <div className={classes.navbar__xs__header__logo}>
                  {/*<img src={Logo} alt='Logo' />*/}
                </div>
                <div className={classes.navbar__xs__header__toggle}>
                  <MdClose onClick={menuToggleHandler} />
                </div>
              </div>
              <div className={classes.navbar__xs__section}>
                {/*<NavLink to='/' className={classes.navbar__xs__section__logo} onClick={menuToggleHandler}>FINTECH AS A SERVICE</NavLink>*/}
              </div>
              <ul>
                {
                  listOptions.map((item, index) => (
                    <NavLink to={item.route} key={index} className='text__primary font-weight-medium' onClick={menuToggleHandler}>
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

                    </NavLink>
                  ))
                }
                <li className={classes.navbar__xs__opt__login} onClick={() => { setIsOpen(true); menuToggleHandler(); }}>
                  <div className={classes.navbar__xs__icon}>
                    <svg width='12' height='18' viewBox='0 0 12 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path fillRule='evenodd' clipRule='evenodd' d='M6.44755 0C8.51595 0 10.2098 1.5889 10.2098 3.54227C10.2098 5.49565 8.51595 7.08455 6.44755 7.08455C4.37915 7.08455 2.68531 5.49565 2.68531 3.54227C2.68531 1.5889 4.37915 0 6.44755 0ZM12 18V7.55685H2.92882C1.31425 7.55685 0 8.73995 0 10.2134V18H12ZM2.92882 8.78433H10.6979V16.8032H1.30205V10.2288L1.30616 10.1272C1.36611 9.38822 2.07411 8.78433 2.92882 8.78433ZM3.96869 3.54227C3.96869 2.27019 5.07275 1.23011 6.44755 1.23011C7.82236 1.23011 8.92641 2.27019 8.92641 3.54227C8.92641 4.80884 7.81176 5.85444 6.44755 5.85444C5.07275 5.85444 3.96869 4.81436 3.96869 3.54227Z' fill='#00AEC7' />
                    </svg>
                  </div>
                  <div>
                    Iniciar sesión
                  </div>
                </li>
                <li onClick={() => { setOpenForm(true); menuToggleHandler(); }}>
                  <div className={classes.navbar__xs__icon}>
                    <svg width='20' height='18' viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path fillRule='evenodd' clipRule='evenodd' d='M9.65369 0.760498C11.6347 0.760498 13.257 2.28227 13.257 4.15313C13.257 6.02398 11.6347 7.54576 9.65369 7.54576C7.67267 7.54576 6.05039 6.02398 6.05039 4.15313C6.05039 2.28227 7.67267 0.760498 9.65369 0.760498ZM14.9716 18.0001V7.99811H6.28361C4.73724 7.99811 3.47852 9.13122 3.47852 10.5424V18.0001H14.9716ZM6.28361 9.17373H13.7245V16.8539H4.72556V10.5571L4.7295 10.4599C4.78692 9.75211 5.46501 9.17373 6.28361 9.17373ZM7.27955 4.15313C7.27955 2.93478 8.33696 1.93864 9.65369 1.93864C10.9704 1.93864 12.0278 2.93478 12.0278 4.15313C12.0278 5.36619 10.9603 6.36762 9.65369 6.36762C8.33696 6.36762 7.27955 5.37147 7.27955 4.15313Z' fill='#0033A0' />
                      <mask id='mask0_1047_229963' maskUnits='userSpaceOnUse' x='3' y='0' width='12' height='18'>
                        <path fillRule='evenodd' clipRule='evenodd' d='M9.65369 0.760498C11.6347 0.760498 13.257 2.28227 13.257 4.15313C13.257 6.02398 11.6347 7.54576 9.65369 7.54576C7.67267 7.54576 6.05039 6.02398 6.05039 4.15313C6.05039 2.28227 7.67267 0.760498 9.65369 0.760498ZM14.9716 18.0001V7.99811H6.28361C4.73724 7.99811 3.47852 9.13122 3.47852 10.5424V18.0001H14.9716ZM6.28361 9.17373H13.7245V16.8539H4.72556V10.5571L4.7295 10.4599C4.78692 9.75211 5.46501 9.17373 6.28361 9.17373ZM7.27955 4.15313C7.27955 2.93478 8.33696 1.93864 9.65369 1.93864C10.9704 1.93864 12.0278 2.93478 12.0278 4.15313C12.0278 5.36619 10.9603 6.36762 9.65369 6.36762C8.33696 6.36762 7.27955 5.37147 7.27955 4.15313Z' fill='white' />
                      </mask>
                      <g mask='url(#mask0_1047_229963)'>
                        <circle cx='9.22526' cy='9.38029' r='8.61979' fill='#0033A0' />
                        <rect x='0.605469' y='0.760498' width='17.2396' height='17.2396' fill='#0033A0' />
                        <rect x='10.6055' y='12.7605' width='6' height='6' fill='white' />
                      </g>
                      <path fillRule='evenodd' clipRule='evenodd' d='M14.4594 18L11.3809 14.8919L12.2428 14.0216L14.4594 16.2595L19.1387 11.5352L20.0007 12.4054L14.4594 18Z' fill='#0033A0' />
                    </svg>
                  </div>
                  <div>
                    Registrarte
                  </div>
                </li>
              </ul>

            </div>

            <div className={`${classes.show__lg__up} ${classes.header__content__divider}`} />
          </nav>

          <div className={classes.header__content__toggle}>
            {!menuOpen ? <MdMenu onClick={menuToggleHandler} /> : <div />}
          </div>
        </div>
      </header>
      <div className={classes.buttom__nav}>
        <div className={`container ${classes.buttom__options}`}>
          {/*<Link to='/' className={classes.buttom__nav__logo}>
            FINTECH AS A SERVICE
            </Link>*/}
          <div className={classes.buttom__nav__options}>
            <ul>
              <li>
                {listOptions && listOptions.length > 0 ? listOptions.map((item, index) => (
                  <Link key={index} to={item.route}>{item.name}</Link>
                )) : null}
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}

Navbar.propTypes = {};

export default Navbar;
