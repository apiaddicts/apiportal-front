/* eslint-disable react/button-has-type */
import React from 'react';

import './button.scss';

function Button({ children, styles, opacity, size = 'regular', ...rest }) {

  const btnStyled = (size, opacity) => {
    const height = size.toLowerCase();
    if (height === 'regular') {
      return { height: '47px', opacity };
    } if (height === 'small') {
      return { height: '32px', opacity };
    } if (height === 'large') {
      return { height: '50px', opacity };
    }
  };

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
      style={btnStyled(size, opacity)}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
