import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Icon from '../../MdIcon/Icon';

import subscriptionsConstants from '../../../redux/constants/subscriptionsConstants';
import subscriptionsService from '../../../services/subscriptionsService';

import './passwordGenerate.scss';

function PasswordGenerate({ idSuscripcion, user, version, status }) {

  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);
  const [primaryKey, setPrimaryKey] = useState('');
  const notify = (msg) => toast(msg);

  const handleClickHidden = () => {
    if (hidden) {
      setHidden(false);
    } else {
      setHidden(true);
    }
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
      {hidden ? (
        <span className='text__secondary'>
          {primaryKey}
        </span>
      ) : (
        <span className='text__secondary'>
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
            <button onClick={() => handleReloadRegerateSubscription()} className='btn-input' type='button'>
              <Icon id='MdAutorenew' css_styles={{ 'custom_icon_styles': 'text__gray__gray_lighten-2 fs__18' }} />
            </button>
          </div>
        ) : (null)
      }

    </div>
  );
};

export default PasswordGenerate;
