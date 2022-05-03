import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Terminal from '@mui/icons-material/Terminal';
import Settings from '@mui/icons-material/Settings';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function SidebarDrawer({ children }) {
  const listItems = [
    { route: '/apps', text: 'Apps', icon: <Terminal /> },
    { route: '/apps/nuevaApp', text: 'Nueva App', icon: <Terminal /> },
    { route: '/ApiLibrary', text: 'Biblioteca de APIs', icon: <Settings /> },
  ];
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: '400px',
      }}
    >
      <List sx={{ }}>
        <ListItem>
          <ListItemText>
            <Typography variant='h3' component='div'>
              Hola,
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography variant='h3' component='div' color='blue'>
              Beatriz Abad
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant='h6' component='div'>
              Organización
            </Typography>
            <Typography variant='h6' component='div'>
              Administrador
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
      <List>
        {
          listItems.map((item, index) => (
            <Link to={item.route} key={index}>
              <ListItem button sx={{ color: '#53565A' }} component={Link} to={item.route}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))
        }
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
            <ChevronLeft />
          </ListItemIcon>
          <ListItemText primary='Ocultar menú' />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SidebarDrawer;
