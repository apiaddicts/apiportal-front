import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from '../MdIcon/Icon';
import userConstants from '../../redux/constants/userConstats';
import classes from './Alert.module.scss';

function Alert({ alert_type, title, msg, css_styles = {}, display, onResend }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { responseError, responseRestoreError, responseResetSignup } = useSelector((state) => state.user);
  const { custom_padding, custom_margin } = css_styles;
  const [showAlert, setShowAlert] = useState('d-none');
  const [message, setMessage] = useState(msg);
  useEffect(() => {
    if (Object.keys(responseResetSignup).length > 0) {
      setShowAlert('d-block');
      setMessage([t('Alert.passwordChangeEmailSent')]);
    } else if (Object.keys(responseRestoreError).length > 0) {
      setShowAlert('d-block');
      setMessage(responseRestoreError.error.statusText);
    } else if (Object.keys(responseError).length > 0) {
      setShowAlert('d-block');
      if (Object.prototype.hasOwnProperty.call(responseError?.error, 'details')) {
        setMessage(msg);
      } else {
        setMessage(msg);
      }
    } else if (display) {
      setShowAlert('d-block');
      setMessage(msg);
    }
  }, [responseError, responseRestoreError, responseResetSignup]);

  const handleClose = () => {
    setShowAlert('d-none');
    dispatch({
      type: userConstants.RESET_ALERT,
    });
  };

  let icon = '';
  switch (alert_type) {
    case 'alert__danger': icon = <Icon id='MdReportProblem' />; break;
    case 'alert__success': icon = <Icon id='MdDone' />; break;
    case 'alert__info': icon = <Icon id='MdInfo' />; break;
    default: icon = '';
  }

  return (
    <div className={`${classes.wrapper_alert} ${showAlert}`}>
      <div className={`${classes[alert_type]} ${custom_padding} ${custom_margin}`}>
        <div className={classes.icon}>{ icon }</div>
        <div className={classes.message}>
          { title && <span className='fs__16 font-weight-bold'>{title}</span> }
          <br />
          <span className='fs__14'>{ message }</span>
          {
            alert_type === 'alert__success' && onResend && (
            <div className='mt-2'>
              <a href='#' className='fs__14 text-primary' style={{ textDecoration: 'underline' }} onClick={(e) => {
                e.preventDefault();
                onResend();
              }}>
                {t('Alert.resendPasswordChangeEmail')}
              </a>
            </div>
          )}
        </div>
        <div className={classes.close} onClick={() => handleClose()}>
          <Icon id='MdClose' />
        </div>
      </div>
    </div>
  );
}

export default Alert;
