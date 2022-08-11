/* eslint-disable react/button-has-type */
import React from 'react';
import Icon from '../MdIcon/Icon';

import './button.scss';

function Button({ children, styles, opacity, size = 'regular', preIcon, ...rest }) {

  const btnStyled = (size, opacity) => {
    const height = size.toLowerCase();
    const style = (opacity) ? { opacity } : {};
    if (height === 'regular') {
      style[height] = '47px';
    } if (height === 'small') {
      style[height] = '32px';
    } if (height === 'large') {
      style[height] = '50px';
    } if (height === 'responsive') {
      style[height] = '100%';
    }
    return style;
  };

  return (
    <button
      className={
        styles === 'primary' ? 'btn btn-primary' :
          styles === 'primary-blue' ? 'btn btn-primary-blue' :
            styles === 'secundary' ? 'btn btn-secundary' :
              styles === 'secundary-white' ? 'btn btn-secundary-white' :
                styles === 'tertiary-white' ? 'btn btn-tertiary-white' :
                  styles === 'ghost' ? 'btn btn-ghost' :
                    styles === 'ghost-variant' ? 'btn btn-ghost-variant' :
                      styles === 'greey-primary' ? 'btn btn-grey' : 'btn-none'
      }
      style={btnStyled(size, opacity)}
      {...rest}
    >
      {preIcon && (
        <div className='btn__icon'>
          <Icon id={preIcon} />
        </div>
      )}
      <div style={{ minWidth: '146px' }}>
        {children}
      </div>
    </button>
  );
}

export default Button;
