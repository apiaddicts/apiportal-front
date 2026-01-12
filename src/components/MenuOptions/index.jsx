import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material';
// import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Icon from '../MdIcon/Icon';
import classes from './MenuOptions.module.scss';
import { useTranslation } from 'react-i18next';

function MenuOptions(props) {
  const { t } = useTranslation();

  const { row, handleRename, handleCancel } = props;
  const [confirmDialog, setConfirmDialog] = useState(false);

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
            {t('MenuOptions.cancelSubscriptionTitle')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {t('MenuOptions.cancelSubscriptionMessage')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleConfirmation} color='error'>{t('MenuOptions.cancelButton')}</Button>
            <Button onClick={() => handleCancelSubscription()} variant='contained' autoFocus>
              {t('MenuOptions.acceptButton')}
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
          {t('MenuOptions.renameOption')}
        </MenuItem>
        <MenuItem onClick={() => toggleConfirmation()}>
          <Icon id='MdDeleteOutline' css_styles={{ 'custom_icon_styles': 'fs__20 text_gray__gray_darken mr-2' }} />
          {t('MenuOptions.cancelOption')}
        </MenuItem>
      </Menu>
    </div>
  );
}
MenuOptions.propTypes = {};
export default MenuOptions;
