import { AppBar, Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SuraLogoAlt from '../../../static/img/sura_logo_alt.svg';
import { logout } from '../../../redux/actions/userAction';

function CustomHeader({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUser = () => {
    navigate('/developer/profile');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
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
  );
}

export default CustomHeader;
