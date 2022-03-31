import React from 'react';
import Icon from '../MdIcon/Icon';
import './item.scss';

function Item({ icon, title, description, type = 'basic', number, iconos }) {

  return (
    <div>
      {type === 'title' ? (
        <div className='item_title'>
          <span className='number'>1.</span>
          {' '}
          <span className='title'>{title}</span>
        </div>
      ) : (null)}
      <section className='item_contenedor'>
        <div className='item_circle'>
          <div className='circle'>
            <span className='icon'>
              <Icon id={icon} />
            </span>
          </div>
        </div>
        <div className='item_description'>
          {type !== 'title' ? (
            <h1>{title}</h1>
          ) : (null)}
          <p>{description}</p>
        </div>
      </section>
    </div>

  );
}

export default Item;
