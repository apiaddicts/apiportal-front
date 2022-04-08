import React from 'react';
import Icon from '../MdIcon/Icon';
import './item.scss';

function Item({ icon, title, description, type = 'basic', number, textColor = '#000' }) {
  const color = (color) => ({
    color: `${color}`,
  });
  return (
    <div>
      {type === 'title' ? (
        <div className='item_title'>
          <span className='number'>{`${number}. `}</span>
          {' '}
          <span className='title'>{title}</span>
        </div>
      ) : (null)}
      <section className='item_contenedor'>
        <div className='item_circle'>
          <div className='circle'>
            <span className='icon' style={color(textColor)}>
              <Icon id={icon} />
            </span>
          </div>
        </div>
        <div className='item_description'>
          {type !== 'title' ? (
            <h1>{title}</h1>
          ) : (null)}
          <p style={color(textColor)}>{description}</p>
        </div>
      </section>
    </div>

  );
}

export default Item;
