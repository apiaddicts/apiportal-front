import React from 'react';
import PropTypes from 'prop-types';

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.55)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '1rem',
};

const modalStyle = {
  background: '#fff',
  borderRadius: '12px',
  padding: '2rem',
  maxWidth: '640px',
  width: '100%',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  color: '#555',
  lineHeight: 1,
};

function CommandModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button type='button' style={closeBtnStyle} onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

CommandModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CommandModal;
