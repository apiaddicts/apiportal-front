/* eslint-disable react/button-has-type */
import React from 'react';
import CustomIcon from '../MdIcon/CustomIcon';
import Icon from '../MdIcon/Icon';

import './button.scss';

function Button({ children, styles, baseColor, opacity, size = 'regular', preIcon, postIcon, icon, ...rest }) {

  const btnStyled = (size, opacity) => {
    const height = size.toLowerCase();
    const style = (opacity) ? { opacity } : {};
    if (height === 'regular') {
      style.height = '47px';
    } if (height === 'small') {
      style.height = '32px';
    } if (height === 'large') {
      style.height = '50px';
    } if (height === 'responsive') {
      style.height = '100%';
    }
    return style;
  };

  const dynamicStyle = baseColor
    ? {
        '--btn-bg': baseColor,
        '--btn-bg-hover': baseColor,
        '--btn-bg-active': baseColor,
        border: `2px solid ${baseColor}`,
      }
    : {};

  return (
    <button
      className={
        styles === 'primary' ? 'btn btn-primary' :
          styles === 'primary-blue' ? 'btn btn-primary-blue' :
            styles === 'secundary' ? 'btn btn-secundary' :
              styles === 'secundary-white' ? 'btn btn-secundary-white' :
                styles === 'tertiary' ? 'btn btn-tertiary' :
                  styles === 'tertiary-white' ? 'btn btn-tertiary-white' :
                    styles === 'ghost' ? 'btn btn-ghost' :
                      styles === 'ghost-variant' ? 'btn btn-ghost-variant' :
                        styles === 'greey-primary' ? 'btn btn-grey' :
                          styles === 'alert' ? 'btn btn-alert' :
                            styles === 'disabled' ? 'btn btn-disabled' :
                              styles === 'success' ? 'btn btn-success' :
                                styles === 'primary-dinamic' ? 'btn btn-primary-dinamic' :
                                  styles === 'secundary-dinamic' ? 'btn btn-secundary-dinamic' : 'btn-none'

      }
      style={{
        ...btnStyled(size, opacity),
        ...dynamicStyle,
        ...rest.style,
      }}
      {...rest}
    >
      {preIcon && (
        <div className='btn__icon'>
          <Icon id={preIcon} />
        </div>
      )}
      {icon && (
        <div className='btn__icon'>
          <CustomIcon name={icon} />
        </div>
      )}
      <div style={{ minWidth: '146px' }}>
        {children}
      </div>
      {postIcon && (
        <div>
          <CustomIcon name={postIcon} />
        </div>
      )}
    </button>
  );
}

export default Button;
