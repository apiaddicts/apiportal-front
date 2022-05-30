import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from '../MdIcon/Icon';
import classes from './Alert.module.scss';

function Alert({ alert_type, title, css_styles }) {
  const { responseError } = useSelector((state) => state.user);
  const { custom_padding, custom_margin } = css_styles;
  const [showAlert, setShowAlert] = useState('d-none');
  const [message, setMessage] = useState('Ocurrio un error');
  useEffect(() => {
    setShowAlert(Object.prototype.hasOwnProperty.call(responseError, 'error') ? 'd-block' : 'd-none');
    setMessage(responseError?.error?.details[0]?.message);
  }, [responseError]);

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
        <div className={classes.close} onClick={() => setShowAlert('d-none')}>
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
