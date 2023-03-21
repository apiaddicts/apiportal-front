import React from 'react';
import CustomIcon from '../MdIcon/CustomIcon';
import './item.scss';

function Item({ icon, title, description, type = 'basic', number, textColor = '#000', iconColor = '#fff', background = '#00acc742', titleStyles, iconStyle, css_styles }) {
  const { custom_description } = css_styles;
  const color = (color) => ({
    color: `${color}`,
  });
  return (
    <div className='main_item_contain'>
      <div className='item_contenedor'>
        <div className='item_circle'>
          <div className='square__frame' style={iconStyle}>
            <span className='icon' style={color(iconColor)}>
              <CustomIcon name={icon} />
            </span>
          </div>
        </div>
        <div className='item_description'>
          {type === 'title' ? (
            <div className='item_title'>
              <span className='number'>{`${number}. `}</span>
              {' '}
              <span className='title'>{title}</span>
            </div>
          ) : (null)}
          {type !== 'title' ? (
            <h1 className='mb-3 text__primary__subtitle' style={titleStyles}>{title}</h1>
          ) : (null)}
          <p className={custom_description}>{description}</p>
        </div>
      </div>
    </div>

  );
}

Item.defaultProps = {
  css_styles: { 'custom_description': 'text__gray__darken' },
};
export default Item;
