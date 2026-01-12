import React, { useState } from 'react';
import { List, ListItemText, Collapse, ListItemIcon, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import TerminalIcon from '@mui/icons-material/Terminal';
import { Link } from 'react-router-dom';
import classes from './sliderdrawer.module.scss';
import ListItem, { listItemClasses } from '@mui/material/ListItem';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function DropdownMenu({ toggleMenu, open, onToggle }) {
  const { t } = useTranslation();
  const location = useLocation();
  const isActive = location.pathname === '/developer/docs';

  return (
    <List
      component="nav"
      className={classes.sidebar__item}

    >
      <ListItem button onClick={onToggle}>
        <ListItemIcon>
          <TerminalIcon />
        </ListItemIcon>
        {toggleMenu && <ListItemText primary={t('liveApiDocs')} />}
        {toggleMenu && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>


      <Collapse in={toggleMenu && open} timeout="auto" unmountOnExit sx={{ paddingLeft: '20px' }}>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link}
            to="/developer/docs"
            sx={{ display: toggleMenu ? 'flex' : 'none', }}
          >
            <Typography variant="caption" color="primary" sx={{ mr: 1, fontSize: '10px' }}>
              POST
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '15px',
                color: isActive ? 'primary.main' : '#000',
                background: 'none',
                WebkitBackgroundClip: 'initial',
                WebkitTextFillColor: 'initial',
              }}
            >
              {t('faceAiExperience')}
            </Typography>

          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default DropdownMenu;
