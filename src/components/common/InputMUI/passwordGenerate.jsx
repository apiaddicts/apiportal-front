import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Icon from '../../MdIcon/Icon';

import subscriptionsConstants from '../../../redux/constants/subscriptionsConstants';
import subscriptionsService from '../../../services/subscriptionsService';

import './passwordGenerate.scss';

function PasswordGenerate({ idSuscripcion, user, version, status }) {

  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);
  const [primaryKey, setPrimaryKey] = useState('');

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
      console.log(err);
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
      }, (err) => {
        console.log(err);
      });
    } else {
      subscriptionsService.regenerateSubscription(user.name, idSuscripcion, 'regenerateSecondaryKey').then((response) => {
        handleRegenerateSubscriptions();
      }, (err) => {
        console.log(err);
      });
    }
    setTimeout(() => {
      dispatch({ type: subscriptionsConstants.REGENERATE_SUBSCRIPTIONS_SUCCESS });
    }, 1000);
  };

  return (
    <div className='input-data'>
      {hidden ? (
        <span className='text'>
          {primaryKey}
        </span>
      ) : (
        <span className='text'>
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </span>
      )}

      <button onClick={handleClickHidden} className='btn-input' type='button'>
        <Icon id='MdOutlineRemoveRedEye' />
      </button>
      {
        status && status !== 'cancelled' ? (
          <button onClick={() => handleReloadRegerateSubscription()} className='btn-input' type='button'>
            <Icon id='MdAutorenew' />
          </button>
        ) : (null)
      }

    </div>
  );
};

export default PasswordGenerate;
