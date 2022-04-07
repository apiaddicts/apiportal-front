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
              <Chip title={chipTitle} className={chipTitle.toLowerCase()} />
              <h1 className='chip_title'>lorems</h1>
            </>
          ) : (
            <h1 className='title'>lorems</h1>
          )}
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nam molestiae, corporis eaque deleniti eligendi aut modi illo perspiciatis.
          Impedit suscipit totam quo ea odit officiis culpa voluptatum sed fugiat quibusdam?
        </p>
        <div className='card_chip_info'>
          <span>MÁS INFORMACIÓN</span>
          {' '}
          <MdArrowRightAlt className='svg' />
        </div>
      </section>
    </Base>
  );
}

export default CardBasic;
