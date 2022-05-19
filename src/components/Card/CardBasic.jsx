import React from 'react';

import { MdEast } from 'react-icons/md';
import Chip from '../Chip/Chip';
import Base from './Base';

import './cards.scss';

function CardBasic({ chipTitle, title, img, description, info, route, maxWidth }) {

  return (
    <Base maxWidth={maxWidth}>
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
              <h1 className='chip_title'>{title}</h1>
            </>
          ) : (
            <h1 className='h4 font-weight-bold px-8 py-5 text__primary'>{title}</h1>
          )}
        </div>
        <div className='card_chip_desciption'>
          <p className='text-left'>
            {description}
          </p>
          <a className='card_chip_info mt-4' href={route}>
            <span>{info}</span>
            {' '}
            <MdEast className='svg' />
          </a>
        </div>
      </section>
    </Base>
  );
}

export default CardBasic;
