import React from 'react';
import Chip from '../Chip/Chip';
import Base from './Base';
import './cards.scss';

function CardInformation({ img, buttons, title, description, reading }) {

  return (
    <Base>
      {img && (
        <div className='card-header'>
          <img src={img} alt='' />
        </div>
      )}
      <div className=' p-5'>
        <p className='h5 text__primary w-full'>{title ?? 'Conoce nuestras APIs de auto flexible'}</p>
        <div className='card__information'>
          <div className={`card__information__tags ${buttons.length >= 3 ? 'tags-flex-wrap' : null}`}>
            {buttons.map((button) => (
              <div className='py-2 mr-2 '>
                <Chip title={button.label} className={`${button.class} ${buttons.length >= 3 ? 'tags-reponsive' : null} `} />
              </div>
            ))}
          </div>
          {reading && <p className='h6 font-weight-semi-bold'>{reading.toUpperCase()}</p>}
        </div>
        <p className='py-5'>
          {description ?? 'Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enim'}
        </p>
      </div>
    </Base>
  );
};

export default CardInformation;
