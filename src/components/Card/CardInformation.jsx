import React from 'react';
import Chip from '../Chip/Chip';
import './cards.scss';

function CardInformation({ img, title, description, reading }) {
  const buttons = [
    { class: 'gray', label: 'APIS' },
    { class: 'gray', label: 'Desarroladores' },
  ];
  return (
    <>
      {img && (
        <div className='card-header'>
          <img src={img} alt='' />
        </div>
      )}
      <div className=' p-5'>
        <p className='h5 text__primary w-full'>{title ?? 'Conoce nuestras APIs de auto flexible'}</p>
        <div className='card__information'>
          {buttons.map((button) => (
            <div className='py-2 mr-2 '>
              <Chip title={button.label} className={button.class} />
            </div>
          ))}
          {reading && <p className='h6 font-weight-semi-bold'>{reading.toUpperCase()}</p>}
        </div>
        <p>
          {description ?? 'Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enim'}
        </p>
      </div>
    </>
  );
};

export default CardInformation;
