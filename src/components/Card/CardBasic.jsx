/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { MdEast } from 'react-icons/md';
import { HashLink } from 'react-router-hash-link';
import Chip from '../Chip/Chip';
import Icon from '../MdIcon/Icon';
import config from '../../services/config';
import Base from './Base';

import './cards.scss';

function CardBasic({ chipTitle, title, img, description, info, route, maxWidth, tabCard, footerTabCard, url }) {
  return (
    <Base maxWidth={maxWidth}>

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
          <div>
            {img ? (
              <picture>
                <img className='card_img' src={img !== '' ? img : config.notImage} alt={img} />
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
                  <h1 className='h4 font-weight-bold px-8 pt-5 text__primary'>{title}</h1>
                )}
              </div>
              <div className='card_chip_desciption'>
                <p className='text-left'>
                  {description}
                </p>
                {url !== undefined && url !== '' && route && route !== undefined ? (
                  <div className='card_chip_info mt-4' onClick={route}>
                    <HashLink smooth to={url}>
                      <span>{info}</span>
                      {' '}
                      <MdEast className='svg' />
                    </HashLink>

                  </div>
                ) : url !== undefined && url !== '' ? (
                  <div className='card_chip_info mt-4'>
                    <HashLink smooth to={url}>
                      <span>{info}</span>
                      {' '}
                      <MdEast className='svg' />
                    </HashLink>

                  </div>
                ) : (
                  <div className='card_chip_info mt-4' onClick={route}>
                    <span>{info}</span>
                    {' '}
                    <MdEast className='svg' />
                  </div>
                )}
              </div>
            </section>
          </div>
        )
      }

    </Base>
  );
}

export default CardBasic;
