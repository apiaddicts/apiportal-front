import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material';
// import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Icon from '../MdIcon/Icon';
import classes from './MenuOptions.module.scss';

function MenuOptions(props) {

  const { row, handleRename, handleCancel } = props;
  const [confirmDialog, setConfirmDialog] = useState(true);

  const toggleConfirmation = () => {
    setConfirmDialog(!confirmDialog);
  };

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

      {confirmDialog && (
        <Dialog
          open={confirmDialog}
          onClose={toggleConfirmation}
        >
          <DialogTitle id='alert-dialog-title'>
            Cancelar subscripción
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              ¿Desea cancelar la subscripción? Esta es una acción irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleConfirmation} color='error'>Cancelar</Button>
            <Button onClick={() => handleCancelSubscription()} variant='contained' autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      )}

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
        <MenuItem onClick={() => toggleConfirmation()}>
          <Icon id='MdDeleteOutline' css_styles={{ 'custom_icon_styles': 'fs__20 text_gray__gray_darken mr-2' }} />
          Cancelar
        </MenuItem>
      </Menu>
    </div>
  );
}
MenuOptions.propTypes = {};
export default MenuOptions;
