import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import Chip from '../Chip/Chip';
import Base from './Base';
import './cards.scss';

function CardInformation({ img, buttons, title, description, reading, info, maxWidth, version, status, colorStatus }) {

  return (
    <Base maxWidth={maxWidth}>
      {img && (
        <div className='card-header'>
          <img src={img} alt='' />
        </div>
      )}
      {version && status && (
        <div className='header-api px-8 pt-5'>
          <div className={colorStatus}>
            <p>●</p>
            <p className='ml-3 font-weight-thin'>{status}</p>
          </div>
          <Chip title={version} className='version' />
        </div>
      )}
      <div className={`p-8 ${reading ? 'py-10' : null}`}>
        <p className={`h5 text__primary w-full ${reading ? 'px-8' : null}`}>{title ?? 'Conoce nuestras APIs de auto flexible'}</p>
        <div className='card__information'>
          <div className={`card__information__tags ${buttons.length >= 3 ? 'tags-flex-wrap' : null} ${reading ? 'px-8' : null}`}>
            {buttons.map((button, index) => (
              <div key={index} className='mr-2'>
                <Chip title={button.label} className={`${button.class} ${buttons.length >= 4 ? 'tags-reponsive' : null} `} />
              </div>
            ))}
          </div>
          {reading && <p className='h6 font-weight-semi-bold'>{reading.toUpperCase()}</p>}
        </div>
        <p className={`line-height-1 ${reading ? 'px-8' : null} text__gray__gray_darken`}>
          {description ?? 'Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.'}
        </p>
        {info && (
          <div className='card_chip_info mt-7'>
            <span>{info}</span>
            {' '}
            <MdArrowRightAlt className='svg' />
          </div>
        )}
      </div>
    </Base>
  );
};

export default CardInformation;
