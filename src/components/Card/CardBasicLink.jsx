/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { HashLink } from 'react-router-hash-link';

import { MdEast } from 'react-icons/md';
import Chip from '../Chip/Chip';
import Icon from '../MdIcon/Icon';
import config from '../../services/config';
import Base from './Base';

import './cards.scss';

function CardBasicLink({ chipTitle, title, img, description, info, route, maxWidth, tabCard, footerTabCard }) {
  console.log('props', footerTabCard);
  return (
    <Base maxWidth={maxWidth} css_styles={{ override_card_height: 'custom_card__height' }}>

      {
        tabCard ? (
          <div style={{ padding: '26px 26px', minHeight: '439px' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#00AEC7', marginBottom: '1rem', lineHeight: '28px', letterSpacing: '0.16px' }}>{title}</h1>
            <p style={{ fontSize: '1rem', color: '#53565A', fontWeight: '400', lineHeight: '24px', letterSpacing: '0.11px', marginBottom: '2rem', minHeight: '276px' }}>{description}</p>
            <div style={{ display: 'flex' }}>
              <div style={{ fontSize: '50px' }}>
                <Icon id={footerTabCard ? footerTabCard.icon : 'MdOutlinePhotoSizeSelectActual'} />
              </div>
              <div style={{ border: '1px solid #676F8F', margin: '0 1rem' }} />
              <div>
                <h1 style={{ fontSize: '1rem', fontWeight: '600', lineHeight: '24px', letterSpacing: '0.11px', color: '#0033A0' }}>{footerTabCard ? footerTabCard.footerTitle : ''}</h1>
                <p style={{ fontSize: '1rem', fontWeight: '600', lineHeight: '24px', letterSpacing: '0.11px' }}>{footerTabCard ? footerTabCard.descriptionFooter : ''}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='card_container'>
            {img && (
              <picture>
                <img className='card_img' src={img !== '' ? img : config.notImage} alt={img} />
              </picture>
            )}
            <section className='card_container__body'>
              <div className='card_chip_title'>
                {chipTitle ? (
                  <>
                    <Chip title={chipTitle} className={`${chipTitle.toLowerCase()} chip_tag_rounded`} />
                    <h1 className='chip_title'>
                      {title}
                    </h1>
                  </>
                ) : (
                  <h1
                    className='fs__26 font-weight-bold px-8 pt-5 card__title'
                    style={{
                      'margin': 0,
                      'textOverflow': 'ellipsis',
                      'whiteSpace': 'nowrap',
                      'overflow': 'hidden',
                    }}
                  >
                    {title}
                  </h1>
                )}
              </div>
              <div className='card_chip_desciption'>
                <p className='text-left card__description'>
                  {description}
                </p>
                <HashLink to={route !== undefined && route.length > 0 ? route : ''}>
                  <div className='card_chip_info mt-4 display_flex justify_content__end card__link'>
                    <span>{info}</span>
                    {' '}
                    <MdEast className='svg card__link' />
                  </div>
                </HashLink>
              </div>
            </section>
          </div>
        )
      }

    </Base>
  );
}

export default CardBasicLink;
