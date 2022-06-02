import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../MdIcon/Icon';
import userConstants from '../../redux/constants/userConstats';
import classes from './Alert.module.scss';

function Alert({ alert_type, title, msg, css_styles }) {
  const dispatch = useDispatch();
  const { responseError, responseRestoreError, responseResetSignup } = useSelector((state) => state.user);
  const { custom_padding, custom_margin } = css_styles;
  const [showAlert, setShowAlert] = useState('d-none');
  const [message, setMessage] = useState(msg);
  useEffect(() => {
    if (Object.keys(responseResetSignup).length > 0) {
      setShowAlert('d-block');
      setMessage('Favor de revisar su correo electronico');
    } else if (Object.keys(responseRestoreError).length > 0) {
      setShowAlert('d-block');
      setMessage(responseRestoreError.error.statusText);
    } else if (Object.keys(responseError).length > 0) {
      setShowAlert('d-block');
      if (Object.prototype.hasOwnProperty.call(responseError?.error, 'details')) {
        setMessage(responseError?.error?.details[0]?.message);
      } else {
        setMessage(msg);
        console.log('responseError', responseError);
      }
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
          <span className='fs__14'>{ message }</span>
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div className={classes.close} onClick={() => handleClose()}>
          <Icon id='MdClose' />
        </div>
      </div>
    </div>
  );
}

Alert.defaultProps = {
  css_styles: '',
};

export default Alert;
