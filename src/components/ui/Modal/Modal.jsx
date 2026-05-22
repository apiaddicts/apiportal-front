import React, { useEffect } from 'react';
import Card from '../Card/Card';
import classes from './modal.module.scss';

function Modal({ onClose, children, ariaLabel }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className={classes.overlay} onClick={handleOverlay} role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <Card layout="none" className={classes.dialog}>
        {children}
      </Card>
    </div>
  );
}

export const modalClasses = classes;
export default Modal;
