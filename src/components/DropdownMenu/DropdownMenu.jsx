import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, ListItemIcon, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import TerminalIcon from '@mui/icons-material/Terminal';
import { Link } from 'react-router-dom';

function DropdownMenu() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <List component="nav" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {/* Main Menu Item */}
      <ListItem button onClick={handleToggle}>
        <ListItemIcon>
          <TerminalIcon />
        </ListItemIcon>
        <ListItemText primary="Live API docs" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      {/* Submenu Items */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/developer/docs" sx={{ pl: 4 }}>
            <Typography variant="caption" color="primary" sx={{ mr: 1 }}>
              POST
            </Typography>
            <ListItemText primary="Ejemplo api empresa" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default DropdownMenu;
