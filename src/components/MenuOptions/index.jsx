import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
// import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Icon from '../MdIcon/Icon';
import classes from './MenuOptions.module.scss';

function MenuOptions(props) {

  const { row, handleRename, handleCancel } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = () => {
    handleRename(row);
    setAnchorEl(null);
  };
  const handleCancelSubscription = () => {
    handleCancel(row);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.wrapper_menu}>
      <IconButton
        sx={{
          borderRadius: '6px',
          padding: '1px',
          background: '#ECF0F1',
        }}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Icon id='MdOutlineEdit' css_styles={{ 'custom_icon_styles': 'fs__20 text_gray__gray_darken mr-2' }} />
          Renombrar
        </MenuItem>
        <MenuItem onClick={handleCancelSubscription}>
          <Icon id='MdDeleteOutline' css_styles={{ 'custom_icon_styles': 'fs__20 text_gray__gray_darken mr-2' }} />
          Cancelar
        </MenuItem>
      </Menu>
    </div>
  );
}
MenuOptions.propTypes = {};
export default MenuOptions;
