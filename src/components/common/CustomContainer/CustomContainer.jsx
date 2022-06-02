import { ChevronLeft, Settings, Terminal } from '@mui/icons-material';
import { CssBaseline, Drawer, List, ListItem, listItemClasses, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import React from 'react';
// import SidebarDrawer from '../../SidebarDrawer/SidebarDrawer';
import CustomFooter from '../CustomFooter/CustomFooter';
import CustomHeader from '../CustomHeader/CustomHeader';
import classes from './customcontainer.module.scss';

function MyNavLink(props) {
  return <NavLink {...props} activeClassName='active' />;
}

function CustomContainer({ children, user }) {
  const listItems = [
    { route: '/apps', text: 'Productos', icon: <Terminal /> },
    { route: '/ApiLibrary', text: 'Biblioteca de APIs', icon: <Settings /> },
    { route: '/newApp', text: 'Nueva App', icon: <Terminal /> },
  ];
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.appBar}>
          <CustomHeader user={user} />
        </div>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          anchor='left'
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
        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}
          {children}
        </main>
      </div>
      <div className={classes.footer}>
        <CustomFooter />
      </div>
    </>
  );
}

export default CustomContainer;
