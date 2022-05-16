import React from 'react';
import icons from '../../static/icons-sura';
import './item.scss';

function Item({ icon, title, description, type = 'basic', number, textColor = '#000', iconColor = '#fff', background = '#00acc742', titleStyles, iconStyle }) {
  const color = (color) => ({
    color: `${color}`,
  });
  // const backgroundColor = (color) => ({
  //   backgroundColor: `${color}`,
  // });
  return (
    <div className='main_item_contain'>
      <div className='item_contenedor'>
        <div className='item_circle'>
          <div style={iconStyle} className='circle'>
            <span className='icon' style={color(iconColor)}>
              {icons(icon)}
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
            <h1 className='mb-3' style={titleStyles}>{title}</h1>
          ) : (null)}
          <p style={color(textColor)}>{description}</p>
        </div>
      </div>
    </div>

  );
}

export default Item;
