/* eslint-disable no-use-before-define */
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem, { listItemClasses } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Terminal from '@mui/icons-material/Terminal';
import Settings from '@mui/icons-material/Settings';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import classes from './sliderdrawer.module.scss';

function SidebarDrawer({ children }) {
  const listItems = [
    { route: '/apps', text: 'Apps', icon: <Terminal /> },
    { route: '/newApp', text: 'Nueva App', icon: <Terminal /> },
    { route: '/ApiLibrary', text: 'Biblioteca de APIs', icon: <Settings /> },
  ];

  return (
    <div className={classes.backgroundSidebar}>
      <Drawer
        variant='permanent'
        sx={{
          width: '388px',
          background: '#ECF0F1',
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
              <h1 className={`font-weight-bold text__primary ${classes.title__name}`}>Beatriz Abad</h1>
            </ListItemText>
          </ListItem>
        </List>
        <List>
          <ListItem
            sx={{
              padding: '25px 80px 0px 97px',
            }}
          >
            <ListItemText>
              <Typography variant='h6' component='div'>
                <p className={classes.title__organization}>Organización</p>
              </Typography>
              <Typography variant='h6' component='div'>
                <p className={classes.title__role}>Administrador</p>
              </Typography>
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
              <ListItem button sx={{ color: '#53565A', paddingLeft: '97px' }} component={MyNavLink} to={item.route} exact>
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
