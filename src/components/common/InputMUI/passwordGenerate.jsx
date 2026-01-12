import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Icon from '../../MdIcon/Icon';
import { useTranslation } from 'react-i18next';

import subscriptionsConstants from '../../../redux/constants/subscriptionsConstants';
import subscriptionsService from '../../../services/subscriptionsService';

import './passwordGenerate.scss';

function PasswordGenerate({ idSuscripcion, user, version, status }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);
  const [primaryKey, setPrimaryKey] = useState('');
  const notify = (msg) => toast(msg);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleClickHidden = () => {
    if (hidden) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const toggleConfirmation = () => {
    setConfirmDialog(!confirmDialog);
  };

  const handleRegenerateSubscriptions = () => {
    subscriptionsService.listSubscriptionSecrets(user.name, idSuscripcion).then((response) => {
      if (version === 1) {
        setPrimaryKey(response.primaryKey);
      } else {
        setPrimaryKey(response.secondaryKey);
      }
    }, (err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    if (primaryKey.length === 0) {
      handleRegenerateSubscriptions();
    }
  }, []);

  const handleReloadRegerateSubscription = () => {
    dispatch({ type: subscriptionsConstants.REGENERATE_SUBSCRIPTIONS_REQUEST });
    if (version === 1) {
      subscriptionsService.regenerateSubscription(user.name, idSuscripcion, 'regeneratePrimaryKey').then((response) => {
        handleRegenerateSubscriptions();
        notify('Se ha regenerado exitosamente!');
      }, (err) => {
        console.error(err);
      });
    } else {
      subscriptionsService.regenerateSubscription(user.name, idSuscripcion, 'regenerateSecondaryKey').then((response) => {
        handleRegenerateSubscriptions();
        notify('Se ha regenerado exitosamente!');
      }, (err) => {
        console.error(err);
      });
    }
    setTimeout(() => {
      dispatch({ type: subscriptionsConstants.REGENERATE_SUBSCRIPTIONS_SUCCESS });
    }, 1000);
  };

  return (
    <div className='input-data display_flex justify_content__between'>

      {confirmDialog && (
        <Dialog
          open={confirmDialog}
          onClose={toggleConfirmation}
        >
          <DialogTitle id='alert-dialog-title'>
            {t('Collapse.regenerateSubscriptionKeys')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {t('Collapse.confirmRegenerateSubscriptionKeys')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleConfirmation} color='error'>
              {t('Collapse.cancel')}
            </Button>
            <Button onClick={() => handleReloadRegerateSubscription()} variant='contained' autoFocus>
              {t('Collapse.accept')}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {hidden ? (
        <span className='text__primary'>
          {primaryKey}
        </span>
      ) : (
        <span className='text__primary'>
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </span>
      )}

      <div className='iconbtn iconbtn__hover'>
        <button onClick={handleClickHidden} className='btn-input ml-auto' type='button'>
          <Icon id='MdOutlineRemoveRedEye' css_styles={{ 'custom_icon_styles': 'text__gray__gray_lighten-2 fs__18' }} />
        </button>
      </div>
      {
        status && status !== 'cancelled' ? (
          <div className='iconbtn iconbtn__hover'>
            <button onClick={() => toggleConfirmation()} className='btn-input' type='button'>
              <Icon id='MdAutorenew' css_styles={{ 'custom_icon_styles': 'text__gray__gray_lighten-2 fs__18' }} />
            </button>
          </div>
        ) : (null)
      }

    </div>
  );
};

export default PasswordGenerate;
