import React, { useState, useEffect } from 'react';
import Icon from '../../MdIcon/Icon';

import subscriptionsService from '../../../services/subscriptionsService';

import './passwordGenerate.scss';

function PasswordGenerate({ idSuscripcion, user, version }) {

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
  };

  return (
    <div className='input-data'>
      {hidden ? (
        <span className='text'>
          {primaryKey}
        </span>
      ) : (
        <span className='text'>
          xxxxxxxxxxxxxxxx
        </span>
      )}

      <button onClick={handleClickHidden} className='btn-input' type='button'>
        <Icon id='MdOutlineRemoveRedEye' />
      </button>
      <button onClick={handleReloadRegerateSubscription} className='btn-input' type='button'>
        <Icon id='MdAutorenew' />
      </button>
    </div>
  );
};

export default PasswordGenerate;
