import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetSubscriptionsUser,
  renameSubscription,
  cancelSubscription } from '../../redux/actions/subscriptionsAction';
import Icon from '../MdIcon/Icon';
import classes from './Collapse.module.scss';
import { useTranslation } from 'react-i18next';

function Collapse({ children, row, user, css_styles, initialState, productId = '' }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { renameSubscriptionResponse, cancelSubscriptionResponse } = useSelector((state) => state.suscripcions);
  const { custom_title } = css_styles;
  const [edit, setEdit] = useState(false);
  const [chevron, setChevron] = useState(initialState);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const toggleConfirmation = () => {
    setConfirmDialog(!confirmDialog);
  };
  const chevronIcon = chevron ?
    <Icon id='MdArrowDropUp' css_styles={{ 'custom_icon_styles': 'fs__30 text__gray__gray_darken mr-2' }} /> :
    <Icon id='MdArrowDropDown' css_styles={{ 'custom_icon_styles': 'fs__30 text__gray__gray_darken mr-2' }} />;

  // Edit suscriptions
  const handleRename = () => {
    setEdit(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const data = {
        'properties': {
          'name': e.target.value,
        },
      };
      if (productId !== '') {
        dispatch(renameSubscription(user.name, row.name, data, productId));
      }
      dispatch(renameSubscription(user.name, row.name, data));
    } else if (e.key === 'Escape') {
      setEdit('');
    }
  };

  const handleBLur = (e) => {
    const data = {
      'properties': {
        'name': e.target.value,
      },
    };

    if (productId !== '') {
      dispatch(renameSubscription(user.name, row.name, data, productId));
    }
    dispatch(renameSubscription(user.name, row.name, data));
  };

  useEffect(() => {
    if (Object.keys(renameSubscriptionResponse).length > 0 && Object.prototype.hasOwnProperty.call(renameSubscriptionResponse, 'status')) {
      dispatch(resetSubscriptionsUser());
      setEdit('');
    }
  }, [renameSubscriptionResponse]);

  // Cancel suscriptin
  const handleCancel = () => {
    const data = {
      'properties': {
        'state': 'Cancelled',
      },
    };
    if (productId !== '') {
      dispatch(cancelSubscription(user.name, row.name, data, productId));
    }
    dispatch(cancelSubscription(user.name, row.name, data));
  };

  useEffect(() => {
    if (Object.keys(cancelSubscriptionResponse).length > 0 && Object.prototype.hasOwnProperty.call(cancelSubscriptionResponse, 'status')) {
      dispatch(resetSubscriptionsUser());
      setEdit('');
    }
  }, [cancelSubscriptionResponse]);

  return (
    <div className={`${classes.collapse__container}`}>

      {confirmDialog && (
        <Dialog
          open={confirmDialog}
          onClose={toggleConfirmation}
        >
          <DialogTitle id='alert-dialog-title'>
            {t('Collapse.cancelSubscription')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {t('Collapse.confirmCancelSubscription')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleConfirmation} color='error'>
              {t('Collapse.cancel')}
            </Button>
            <Button onClick={() => handleCancel()} variant='contained' autoFocus>
              {t('Collapse.accept')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <div className={classes.collapse__title}>
        <div className={`mr-auto ${custom_title}`}>
          {
            edit ? (
              <input
                key={row.id}
                id={row.id}
                type='text'
                placeholder='Nuevo nombre'
                defaultValue={row.properties.displayName}
                onKeyDown={(e) => handleKeyDown(e)}
                onBlur={(e) => handleBLur(e)}
                className={classes.input}
              />
            ) : (
              <span>{row.properties.displayName}</span>
            )
          }
        </div>
        {row.properties.state && row.properties.state !== 'cancelled' && (
          <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <span onClick={() => handleRename()}>
              <Icon
                id='MdOutlineEdit'
                css_styles={{ 'custom_icon_styles': 'fs__20 text__gray__gray_darken mr-2 cpointer' }}
              />
            </span>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <span onClick={() => toggleConfirmation()}>
              <Icon id='MdDeleteOutline' css_styles={{ 'custom_icon_styles': 'fs__20 text__gray__gray_darken mr-2 cpointer' }} />
            </span>
          </>
        )}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className={classes.collapse__chevron} onClick={() => setChevron(!chevron)}>
          { chevronIcon }
        </div>
      </div>
      {
        chevron && (
          <div className={classes.collapse__body}>
            { children }
          </div>
        )
      }
    </div>
  );
}

export default Collapse;
