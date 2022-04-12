import React from 'react';

import { MdArrowRightAlt } from 'react-icons/md';
import Chip from '../Chip/Chip';
import Base from './Base';

import './cards.scss';

function CardBasic({ chipTitle, title, img, description, info }) {
  return (
    <Base>
      {img ? (
        <picture>
          <img className='card_img' src={img} alt={img} />
        </picture>
      ) : (null, null)}
      <section className='card_container'>
        <div className='card_chip_title'>
          {chipTitle ? (
            <>
              <Chip title={chipTitle} className={`${chipTitle.toLowerCase()} chip_tag_rounded`} />
              <h1 className='chip_title'>lorems</h1>
            </>
          ) : (
            <h1 className='h3 font-weight-thin px-8 py-5 text__primary'>lorems</h1>
          )}
        </div>
        <div className='card_chip_desciption'>
          <p className='text-left'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat minima blanditiis dolorem assumenda temporibus inventore.
          </p>
          <div className='card_chip_info'>
            <span>MÁS INFORMACIÓN</span>
            {' '}
            <MdArrowRightAlt className='svg' />
          </div>
        </div>
      </section>
    </Base>
  );
}

export default CardBasic;
