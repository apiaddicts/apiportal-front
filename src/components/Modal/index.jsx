import React from 'react';
import classes from './modal.module.scss';

function Modal({ children }) {
  return (
    <div className={`${classes.modal} w-screen h-screen`}>
      <div className={classes.modal__content}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
