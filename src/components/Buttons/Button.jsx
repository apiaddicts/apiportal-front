import React from 'react';

import './button.scss';

function Button({ children, type }) {
  return (
    <div className={type === 'primary' ? 'btn btn-primary' : type === 'secundary' ? 'btn btn-secundary' : type === 'secundary-white' ? 'btn btn-secundary-white' : type === 'ghost' ? 'btn btn-ghost' : 'btn-none'}>{children}</div>
  );
}

export default Button;
