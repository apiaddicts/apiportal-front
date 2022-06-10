/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { NavLink, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem, { listItemClasses } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Terminal from '@mui/icons-material/Terminal';
import Settings from '@mui/icons-material/Settings';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import classes from './sliderdrawer.module.scss';
import SuraLogoAlt from '../../static/img/sura_logo_alt.svg';
import { logout } from '../../redux/actions/userAction';

function SidebarDrawer({ children, user }) {
  const theme = useTheme();
  const [isPermanent, setPermanent] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleMenuTemporary, setToggleMenuTemporary] = useState(false);

  const drawerTemp = useRef();
  const drawerPerm = useRef();

  function handleWindowWithChange() {
    const windowWidth = window.innerWidth;
    const breakpoint = theme.breakpoints.values.md;
    const isSm = windowWidth < breakpoint;

    if (isSm && isPermanent) {
      setPermanent(false);
    } else if (!isSm && !isPermanent) {
      setPermanent(true);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowWithChange);
    handleWindowWithChange();
    return () => {
      window.removeEventListener('resize', handleWindowWithChange());
    };
  });

  const listItems = [
    { route: '/products', text: 'Productos', icon: <Terminal /> },
    { route: '/apiBookstores', text: 'Biblioteca de APIs', icon: <Settings /> },
    { route: '/subscriptions', text: 'Suscripciones', icon: <Terminal /> },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUser = () => {
    navigate('/user');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleMenuTemporary = () => {
    setToggleMenuTemporary(!toggleMenuTemporary);
  };

  const drawerWidth = 300;
  const openMenu = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closeMenu = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '146px',
    [theme.breakpoints.up('sm')]: {
      width: '146px',
    },
  });

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whithSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openMenu(theme),
        '& .MuiDrawer-paper': openMenu(theme),
      }),
      ...(!open && {
        ...closeMenu(theme),
        '& .MuiDrawer-paper': closeMenu(theme),
      }),
    }),
  );

  const DrawerHeader = styled('div')(({ theme }) => ({
    width: '100%',
    background: '#0033A0',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 3),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  }));

  return (
    <div className={classes.backgroundSidebar}>
      {/* <CssBaseline /> */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed' elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#0033a0', padding: { xs: '0 1rem', sm: '0 100px' } }}>
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={SuraLogoAlt} alt='Sura Logo' />
            {isPermanent && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  variant='outlined'
                  startIcon={<PersonSharpIcon sx={{ color: '#00AEC7' }} />}
                  endIcon={<KeyboardArrowDownSharpIcon color='white' sx={{ color: '#fff' }} />}
                  sx={{
                    borderRadius: '20px',
                    border: '1px solid #00AEC7',
                    color: '#fff',
                    marginRight: '1rem',
                  }}
                  onClick={handleClick}
                >
                  {user && Object.keys(user).length > 0 && user.properties && Object.keys(user.properties).length > 0 ? (
                    user.properties.firstName
                  ) : ('')}
                </Button>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleUser}>
                    <ListItemIcon>
                      <PersonSharpIcon />
                    </ListItemIcon>
                    <ListItemText>
                      Mi perfil
                    </ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>
                      Salir
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {
              !isPermanent ? (
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={handleMenuTemporary}
                >
                  <MenuIcon />
                </IconButton>
              ) : null
            }
          </Toolbar>
        </AppBar>
      </Box>
      <SwipeableDrawer
        open={toggleMenuTemporary}
        onClose={handleMenuTemporary}
        onOpen={toggleMenuTemporary}
        anchor='left'
        ref={drawerTemp}
        sx={{ zIndex: 3000, '& .MuiDrawer-paper': { width: '317px' } }}

      >
        <DrawerHeader>
          <div>
            <img src={SuraLogoAlt} alt='' />
          </div>
          <div className='text__secondary'>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={handleMenuTemporary}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DrawerHeader>
        <List>
          <ListItem>
            <ListItemText>
              <h1 className={`font-weight-regular text__gray__gray_darken ${classes.title}`}>Hola,</h1>
              <h1 className={`font-weight-bold text__primary ${classes.title__name}`}>
                {
                  user && Object.keys(user).length > 0 && user.properties && Object.keys(user.properties).length > 0 ? (
                    <>
                      {user.properties.firstName}
                      <br />
                      {user.properties.lastName }
                    </>
                  ) : ('')
                }
              </h1>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <h1 className={classes.title__developer}>developer portal</h1>
            </ListItemText>
          </ListItem>
        </List>
        <List
          sx={{
            [`& .active, & .${listItemClasses.root}:hover`]: {
              color: '#0033a0',
              fontWeight: '700',
              background: 'rgb(0, 174, 199, 0.1)',
              width: '100%',
              '& svg': {
                fill: '#0033a0',
              },
            },
          }}
        >
          {
            listItems.map((item, index) => (
              <ListItem button key={index} sx={{ color: '#0033A0', fontWeight: 500 }} component={MyNavLink} to={item.route}>
                <ListItemIcon sx={{ color: '#0033A0' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))
          }
        </List>
        <List>
          <ListItem>
            <div style={{ borderBottom: '1px solid #E3E829', width: '58px' }} />
          </ListItem>
          <ListItem
            button
            sx={{ color: '#00AEC7', fontWeight: '500' }}
            onClick={handleUser}
          >
            <ListItemIcon>
              <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' clipRule='evenodd' d='M9.44755 0C11.516 0 13.2098 1.5889 13.2098 3.54227C13.2098 5.49565 11.516 7.08455 9.44755 7.08455C7.37915 7.08455 5.68531 5.49565 5.68531 3.54227C5.68531 1.5889 7.37915 0 9.44755 0ZM15 18V7.55685H5.92882C4.31425 7.55685 3 8.73995 3 10.2134V18H15ZM5.92882 8.78433H13.6979V16.8032H4.30205V10.2288L4.30616 10.1272C4.36611 9.38822 5.07411 8.78433 5.92882 8.78433ZM6.96869 3.54227C6.96869 2.27019 8.07275 1.23011 9.44755 1.23011C10.8224 1.23011 11.9264 2.27019 11.9264 3.54227C11.9264 4.80884 10.8118 5.85444 9.44755 5.85444C8.07275 5.85444 6.96869 4.81436 6.96869 3.54227Z' fill='white' />
                <mask id='mask0_2049_231200' maskUnits='userSpaceOnUse' x='3' y='0' width='12' height='18'>
                  <path fillRule='evenodd' clipRule='evenodd' d='M9.44755 0C11.516 0 13.2098 1.5889 13.2098 3.54227C13.2098 5.49565 11.516 7.08455 9.44755 7.08455C7.37915 7.08455 5.68531 5.49565 5.68531 3.54227C5.68531 1.5889 7.37915 0 9.44755 0ZM15 18V7.55685H5.92882C4.31425 7.55685 3 8.73995 3 10.2134V18H15ZM5.92882 8.78433H13.6979V16.8032H4.30205V10.2288L4.30616 10.1272C4.36611 9.38822 5.07411 8.78433 5.92882 8.78433ZM6.96869 3.54227C6.96869 2.27019 8.07275 1.23011 9.44755 1.23011C10.8224 1.23011 11.9264 2.27019 11.9264 3.54227C11.9264 4.80884 10.8118 5.85444 9.44755 5.85444C8.07275 5.85444 6.96869 4.81436 6.96869 3.54227Z' fill='white' />
                </mask>
                <g mask='url(#mask0_2049_231200)'>
                  <circle cx='9' cy='9' r='9' fill='#00AEC7' />
                  <rect width='18' height='18' fill='#00AEC7' />
                </g>
              </svg>

            </ListItemIcon>
            <ListItemText>
              Mi Perfil
            </ListItemText>
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Salir</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>

      <div id='test' />

      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
        open={toggleMenu}
        ref={drawerPerm}
        ModalProps={{
          container: document.getElementById('test'),
          style: { position: 'absolute' },
        }}
      >
        {toggleMenu && (
          <List
            sx={{ paddingRight: '80px' }}
          >
            <ListItem
              sx={{
                paddingLeft: '97px',
                paddingTop: '80px',
              }}
            >
              <ListItemText>
                <h1 className={`font-weight-regular text__gray__gray_darken ${classes.title}`}>Hola,</h1>
                <h1 className={`font-weight-bold text__primary ${classes.title__name}`}>
                  {
                    user && Object.keys(user).length > 0 && user.properties && Object.keys(user.properties).length > 0 ? (
                      <>
                        {user.properties.firstName}
                        <br />
                        {user.properties.lastName }
                      </>
                    ) : ('')
                  }
                </h1>
              </ListItemText>
            </ListItem>
            <ListItem
              sx={{ paddingLeft: '97px' }}
            >
              <ListItemText>
                <h1 className={classes.title__developer}>developer portal</h1>
              </ListItemText>
            </ListItem>
          </List>
        )}

        <List
          sx={{
            [`& .active, & .${listItemClasses.root}:hover`]: {
              color: '#0033a0',
              fontWeight: 'bold',
              borderRight: '2px solid #0033a0',
              width: '100%',
              '& svg': {
                fill: '#0033a0',
              },
            },
            paddingTop: `${!toggleMenu ? '180px' : '8px'}`,
          }}
        >
          {
            listItems.map((item, index) => (
              <ListItem button key={index} sx={{ color: '#53565A', paddingLeft: '97px', paddingRight: 0 }} component={MyNavLink} to={item.route} exact>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                {toggleMenu && (<ListItemText primary={item.text} />)}
              </ListItem>
            ))
          }
        </List>
        <List>
          <ListItem
            button
            onClick={handleMenu}
            sx={{ paddingLeft: '97px' }}
          >
            <ListItemIcon>
              <ChevronLeft />
            </ListItemIcon>
            {toggleMenu && (<ListItemText primary='Ocultar menú' />)}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
function MyNavLink(props) {
  return <NavLink {...props} activeClassName='active' />;
}

export default SidebarDrawer;
