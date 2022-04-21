import React from 'react';
import Icon from '../MdIcon/Icon';
import classes from './alert.module.scss';

function AlertFeedbock({ setShowAlert, error, success }) {
  return (
    <div className={classes.alert}>
      <button
        className={classes.alert__close__button}
        type='button'
        onClick={() => {
          setShowAlert(false);
        //   console.log(false);
        }}
      >
        <Icon id='MdClose' />
      </button>
      <div className={error ? classes.alert__error : classes.alert__success}>
        {error && (
          <div className={classes.alert__error__wrapper}>
            <div className={classes.alert__error__icon}>
              <Icon id='MdWarning' />
            </div>
            <div className={classes.alert__error__message}>
              <p className={classes.alert__error__title}>Error on login</p>
              <p>
                The data entered are not correct, try to change the password, if you do not remember you can
                {' '}
                <span>forgot your password</span>
              </p>
            </div>
          </div>
        )}
        {success && (
          <div className={classes.alert__success__wrapper}>
            <div className={classes.alert__success__icon}>
              <Icon id='MdWarning' />
            </div>
            <div className={classes.alert__success__message}>
              <p className={classes.alert__success__title}>Exit on login</p>
              <p>
                Se ha enviado un correo con el cambio de contraseña al correo b**********@e****.com. Ingrese con la nueva contraseña.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AlertFeedbock;
