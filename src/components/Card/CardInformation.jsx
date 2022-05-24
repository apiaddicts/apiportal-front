/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { useNavigate } from 'react-router-dom';

import { MdEast } from 'react-icons/md';
import Chip from '../Chip/Chip';
import Base from './Base';
import './cards.scss';

function CardInformation({ img, buttons, title, description, reading, info, maxWidth, version, status, colorStatus, theme, blog, modal, link, css_styles, blogTitle }) {
  const { custom_title_size, custom_status_size } = css_styles;
  const navigate = useNavigate();
  const blogClasses = {
    paddingTop: blog ? '51px' : '',
    paddingBottom: blog ? '35px' : '',
    cursor: 'pointer',
  };
  const blogTitleStyles = {
    paddingBottom: blog ? '25px' : '',
  };

  const clickLink = () => {
    navigate(link);
  };

  const clickModal = () => {
    modal(true);
  };
  return (
    <div>
      {link !== undefined ? (
        <Base maxWidth={maxWidth} css_styles={css_styles}>
          {img && (
            <div className='card-header'>
              <img src={img} alt='' />
            </div>
          )}
          {version && status && (
            <div onClick={clickLink} style={{ cursor: 'pointer' }} className='header-api px-8 pt-5 letter__spacing'>
              <div className={`${colorStatus} ${custom_status_size}`}>
                <p>●</p>
                <p className='ml-3 font-weight-bold text-uppercase'>{status}</p>
              </div>
              <Chip title={version} className='version text-uppercase font-weight-medium' spanClass='fs__14' />
            </div>
          )}
          <div className={`pr-8 pl-8 pb-8 pt-2 ${reading ? 'py-2' : null}`} style={blogClasses}>
            <p onClick={clickLink} className={`h3 w-full font-weight-semi-bold text__dark ${reading ? 'px-8' : null}  ${theme === 'primary' ? 'text__primary' : ''} ${custom_title_size}`} style={blogTitleStyles}>{title ?? 'Conoce nuestras APIs de auto flexible'}</p>
            <div onClick={clickLink} className='card__information hidden__tags' style={blogTitleStyles}>
              <div className={`card__information__tags ${buttons.length >= 3 ? 'tags-flex-wrap' : null} ${reading ? 'px-8' : null}`}>
                {buttons.map((button, index) => (
                  <div key={index} className='pr-2'>
                    <Chip title={button.label} className={`${button.class} ${buttons.length >= 4 ? 'tags-reponsive' : null} `} spanClass={`${button.spanClass} fs__10 font-weight-medium`} />
                  </div>
                ))}
              </div>
              {reading && <p className='h6 font-weight-bold' style={{ fontSize: '12px', letterSpacing: '0.8px' }}>{reading.toUpperCase()}</p>}
            </div>
            <p onClick={clickLink} className={`line-height-1 ${reading ? 'px-8' : null} text__gray__gray_darken body-2`}>
              {description ?? 'Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.'}
            </p>

            {info && modal !== undefined ? (

              <div onClick={clickModal} className='card_chip_info mt-7'>
                <span>{info}</span>
                {' '}
                <MdEast className='svg' />
              </div>
            ) : info ? (
              <div className='card_chip_info mt-7'>
                <span>{info}</span>
                {' '}
                <MdEast className='svg' />
              </div>
            ) : (null)}
          </div>
        </Base>
      ) : (
        <Base maxWidth={maxWidth} css_styles={css_styles}>
          {img && (
            <div className='card-header'>
              <img src={img} alt='' />
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
          <div className={`pr-8 pl-8 pb-8 pt-2 ${reading ? 'py-2' : null}`} style={blogClasses}>
            <p className={`${blogTitle ? 'card__title_blog' : 'h3'} w-full font-weight-semi-bold ${reading ? 'px-8' : null}  ${theme === 'primary' ? 'text__primary' : ''} `}>{title ?? 'Conoce nuestras APIs de auto flexible'}</p>
            <div className='card__information hidden__tags' style={blogTitleStyles}>
              <div className={`card__information__tags ${buttons.length >= 3 ? 'tags-flex-wrap' : null} ${reading ? 'px-8' : null}`}>
                {buttons.map((button, index) => (
                  <div key={index} className='pr-2'>
                    <Chip title={button.label} className={`${button.class} ${buttons.length >= 4 ? 'tags-reponsive' : null} `} spanClass={`${button.spanClass} fs__14 ${blogTitle === true ? '' : 'font-weight-medium'} text-capitalize`} />
                  </div>
                ))}
              </div>
              {reading && <p className='h6 font-weight-bold' style={{ fontSize: '12px', letterSpacing: '0.8px' }}>{reading.toUpperCase()}</p>}
            </div>
            <p className={`line-height-1 ${reading ? 'px-8' : null} text__gray__gray_darken body-2`}>
              {description ?? 'Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.'}
            </p>

            {info && (
              <div className='card_chip_info mt-7'>
                <span>{info}</span>
                {' '}
                <MdEast className='svg' />
              </div>
            )}
          </div>
        </Base>
      )}
    </div>

  );
};

CardInformation.defaultProps = {
  css_styles: '',
};

export default CardInformation;
