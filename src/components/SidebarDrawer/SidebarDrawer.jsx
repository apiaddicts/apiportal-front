/* eslint-disable no-use-before-define */
import React from 'react';

import { useDispatch } from 'react-redux';

import { NavLink, useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem, { listItemClasses } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Terminal from '@mui/icons-material/Terminal';
import Settings from '@mui/icons-material/Settings';
import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import classes from './sliderdrawer.module.scss';
import SuraLogoAlt from '../../static/img/sura_logo_alt.svg';

import { logout } from '../../redux/actions/userAction';

function SidebarDrawer({ children, user }) {
  const listItems = [
    { route: '/apps', text: 'Productos', icon: <Terminal /> },
    { route: '/ApiLibrary', text: 'Biblioteca de APIs', icon: <Settings /> },
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

  return (
    <div className={classes.backgroundSidebar}>
      {/* <CssBaseline /> */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed' elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#0033a0', padding: '0 100px' }}>
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={SuraLogoAlt} alt='Sura Logo' />
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
              <SearchIcon />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        variant='permanent'
        sx={{
          width: '388px',
        }}

      >
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
        </List>
        <List>
          <ListItem
            sx={{
              padding: '25px 80px 0px 97px',
            }}
          >
            {/* <ListItemText>
              <Typography variant='h6' component='div'>
                <p className={classes.title__organization}>Organización</p>
              </Typography>
              <Typography variant='h6' component='div'>
                <p className={classes.title__role}>Administrador</p>
              </Typography>
            </ListItemText> */}
          </ListItem>
        </List>
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
          }}
        >
          <ListItem
            sx={{ paddingLeft: '97px' }}
          >
            <ListItemText>
              <h1 className={classes.title__developer}>developer portal</h1>
            </ListItemText>
          </ListItem>
          {
            listItems.map((item, index) => (
              <ListItem button key={index} sx={{ color: '#53565A', paddingLeft: '97px' }} component={MyNavLink} to={item.route} exact>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))
          }
        </List>
        <List>
          <ListItem
            button
            sx={{
              paddingLeft: '97px',
            }}
          >
            <ListItemIcon>
              <ChevronLeft />
            </ListItemIcon>
            <ListItemText primary='Ocultar menú' />
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
