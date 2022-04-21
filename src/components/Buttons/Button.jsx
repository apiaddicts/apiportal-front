/* eslint-disable react/button-has-type */
import React from 'react';

import './button.scss';

function Button({ children, styles, ...rest }) {
  return (
    <button
      className={
        styles === 'primary' ? 'btn btn-primary' :
          styles === 'secundary' ? 'btn btn-secundary' :
            styles === 'secundary-white' ? 'btn btn-secundary-white' :
              styles === 'ghost' ? 'btn btn-ghost' :
                styles === 'ghost-variant' ?
                  'btn btn-ghost-variant' : 'btn-none'
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
