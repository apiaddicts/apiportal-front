/* eslint-disable */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { MdEast } from 'react-icons/md';

import Chip from '../Chip/Chip';
import Base from './Base';
import config from '../../services/config';
import './cards.scss';

function CardInformation({ img, buttons = [], title = '', description = '', globalRating = null, reading = null, info = null, maxWidth, version, status, theme, blog = false, modal, link, css_styles = {}, blogTitle = false, id }) {
  const [colorStatus, setColorStatus] = useState('');

  const {
    custom_title_size = '',
    custom_status_size = '',
    custom_margin_top = '',
  } = css_styles;

  const blogClasses = {
    paddingTop: blog ? '51px' : '',
    paddingBottom: blog ? '35px' : '',
    cursor: 'pointer',
  };

  const blogTitleStyles = {
    paddingBottom: blog ? '5px' : '',
  };

  const clickModal = () => {
    if (modal) modal(true);
  };

  useEffect(() => {
    setColorStatus(status === 'publicado' ? 'green' : 'warning');
  }, [status]);

  return (
    <>
      {link !== undefined ? (
        <Base maxWidth={maxWidth} css_styles={css_styles}>
          {img && (
            <div className='card-header'>
              <img src={img !== '' ? img : config.notImage} alt='' />
            </div>
          )}

          {version && status && (
            <HashLink smooth to={link}>
              <div
                style={{ cursor: 'pointer' }}
                className='header-api px-8 pt-5 letter__spacing'
              >
                <div className={`${colorStatus} ${custom_status_size}`}>
                  <p>●</p>
                  <p className='ml-3 font-weight-bold text-uppercase'>{status}</p>
                </div>
                <Chip
                  title={version}
                  className='version text-uppercase font-weight-medium'
                  spanClass='fs__14'
                />
              </div>
            </HashLink>
          )}

          <div
            className={`pr-8 pl-8 pb-8 pt-2 ${custom_margin_top} ${
              reading ? 'py-2' : ''
            }`}
            style={blogClasses}
          >
            <HashLink smooth to={link}>
              <p
                className={`h3 w-full font-weight-semi-bold card__title ${
                  reading ? 'px-8' : ''
                } ${custom_title_size}`}
                style={blogTitleStyles}
              >
                <span className="card__title__row">
                  {title}
                  {globalRating && (
                    <span
                      className={`card__rating__circle rating__${globalRating}`}
                      title={`Global rating: ${globalRating}`}
                    >
                      {globalRating}
                    </span>
                  )}
                </span>
              </p>
            </HashLink>

            <HashLink smooth to={link}>
              <div className='card__information hidden__tags' style={blogTitleStyles}>
                <div
                  className={`card__information__tags ${
                    buttons.length >= 3 ? 'tags-flex-wrap' : ''
                  } ${reading ? 'px-8' : ''}`}
                >
                  {buttons.map((button, index) => (
                    <div key={index} className='pr-2'>
                      <Chip
                        title={button.label}
                        className={`${button.class} ${
                          buttons.length >= 4 ? 'tags-reponsive' : ''
                        }`}
                        spanClass={`${button.spanClass} fs__10 font-weight-medium`}
                      />
                    </div>
                  ))}
                </div>

                {reading && (
                  <p
                    className='h6 font-weight-bold'
                    style={{ fontSize: '12px', letterSpacing: '0.8px' }}
                  >
                    {reading.toUpperCase()}
                  </p>
                )}
              </div>
            </HashLink>

            <HashLink smooth to={link}>
              <p
                className={`line-height-1 ${
                  reading ? 'px-8' : ''
                } card__description body-2`}
              >
                {description}
              </p>
            </HashLink>

            {info && modal ? (
              <HashLink smooth to={link}>
                <div
                  onClick={clickModal}
                  className='card_chip_info mt-7 display_flex justify_content__end'
                >
                  <span className='card__link'>{info}</span>
                </div>
              </HashLink>
            ) : info ? (
              <HashLink smooth to={link}>
                <div className='card_chip_info mt-7 display_flex justify_content__end'>
                  <span className='card__link'>{info}</span>
                  <MdEast className='svg card__link' />
                </div>
              </HashLink>
            ) : null}
          </div>
        </Base>
      ) : (
        <Base maxWidth={maxWidth} css_styles={css_styles}>
          {img && (
            <div className='card-header'>
              <img src={img !== '' ? img : config.notImage} alt='' />
            </div>
          )}

          {version && status && (
            <div className='header-api px-8 pt-5'>
              <div className={colorStatus}>
                <p>●</p>
                <p className='ml-3 font-weight-bold text-uppercase'>{status}</p>
              </div>
              <Chip title={version} className='version text-uppercase font-weight-medium' />
            </div>
          )}

          <div
            className={`pr-8 pl-8 pb-8 pt-2 ${custom_margin_top} ${
              reading ? 'py-4' : ''
            }`}
          >
            <p
              className={`${
                blogTitle ? 'card__title_blog' : 'h3'
              } w-full font-weight-semi-bold text__primary__title ${
                reading ? 'px-8' : ''
              } ${!blog ? 'mb-2' : ''}`}
            >
              {title}
            </p>

            {blog && (
              <div className='card__information hidden__tags' style={blogTitleStyles}>
                <div
                  className={`card__information__tags ${
                    buttons.length >= 3 ? 'tags-flex-wrap' : ''
                  } ${reading ? 'px-8' : ''}`}
                >
                  {buttons.map((button, index) => (
                    <div key={index} className='pr-2'>
                      <Chip
                        title={button.label}
                        className={`${buttons.length >= 4 ? 'tags-reponsive' : ''}`}
                        spanClass={`${button.spanClass} fs__14 ${
                          blogTitle ? '' : 'font-weight-medium'
                        } text-capitalize`}
                      />
                    </div>
                  ))}
                </div>

                {reading && (
                  <p
                    className='h6 font-weight-bold'
                    style={{ fontSize: '12px', letterSpacing: '0.8px' }}
                  >
                    {reading.toUpperCase()}
                  </p>
                )}
              </div>
            )}

            <p
              className={`line-height-1 ${
                reading ? 'px-8' : ''
              } card__description body-2`}
            >
              {description}
            </p>

            {info && (
              <HashLink smooth to={link ?? `/blog/${id}#blogDetail`}>
                <div className='card_chip_info mt-7 display_flex justify_content__end card__link'>
                  <span>{info}</span>
                  <MdEast className='svg card__icon' />
                </div>
              </HashLink>
            )}
          </div>
        </Base>
      )}
    </>
  );
}

export default CardInformation;
