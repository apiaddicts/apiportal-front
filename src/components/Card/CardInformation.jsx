/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { HashLink } from 'react-router-hash-link';

import { MdEast } from 'react-icons/md';
import Chip from '../Chip/Chip';
import Base from './Base';
import config from '../../services/config';
import './cards.scss';

function CardInformation({ img, buttons, title, description, reading, info, maxWidth, version, status, colorStatus, theme, blog, modal, link, css_styles, blogTitle, id }) {
  const { custom_title_size, custom_status_size, custom_margin_top } = css_styles;
  const blogClasses = {
    paddingTop: blog ? '51px' : '',
    paddingBottom: blog ? '35px' : '',
    cursor: 'pointer',
  };
  const blogTitleStyles = {
    paddingBottom: blog ? '5px' : '',
  };

  const clickModal = () => {
    modal(true);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
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
              <div style={{ cursor: 'pointer' }} className='header-api px-8 pt-5 letter__spacing'>
                <div className={`${colorStatus} ${custom_status_size}`}>
                  <p>●</p>
                  <p className='ml-3 font-weight-bold text-uppercase'>{status}</p>
                </div>
                <Chip title={version} className='version text-uppercase font-weight-medium' spanClass='fs__14' />
              </div>
            </HashLink>
          )}
          <div className={`pr-8 pl-8 pb-8 pt-2 ${custom_margin_top} ${reading ? 'py-2' : null}`} style={blogClasses}>
            <HashLink smooth to={link}>
              <p className={`h3 w-full font-weight-semi-bold text__dark__grey ${reading ? 'px-8' : null}  ${theme === 'primary' ? 'text__dark__grey' : ''} ${custom_title_size}`} style={blogTitleStyles}>{title ?? 'Conoce nuestras APIs de auto flexible'}</p>
            </HashLink>
            <HashLink smooth to={link}>
              <div className='card__information hidden__tags' style={blogTitleStyles}>
                <div className={`card__information__tags ${buttons.length >= 3 ? 'tags-flex-wrap' : null} ${reading ? 'px-8' : null}`}>
                  {buttons && buttons?.length > 0 && buttons.map((button, index) => (
                    <div key={index} className='pr-2'>
                      <Chip title={button.label} className={`${button.class} ${buttons?.length >= 4 ? 'tags-reponsive' : null} `} spanClass={`${button.spanClass} fs__10 font-weight-medium`} />
                    </div>
                  ))}
                </div>
                {reading && <p className='h6 font-weight-bold' style={{ fontSize: '12px', letterSpacing: '0.8px' }}>{reading.toUpperCase()}</p>}
              </div>
            </HashLink>
            <HashLink smooth to={link}>
              <p className={`line-height-1 ${reading ? 'px-8' : null} text__dark__grey body-2`}>
                {description ?? 'Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.'}
              </p>
            </HashLink>

            {info && modal !== undefined ? (
              <HashLink smooth to={link}>
                <div onClick={clickModal} className='card_chip_info mt-7 display_flex justify_content__end'>
                  <span>{info}</span>
                  {' '}
                </div>
              </HashLink>
            ) : info ? (
              <HashLink smooth to={link}>
                <div className='card_chip_info mt-7 display_flex justify_content__end'>
                  <span>{info}</span>
                  {' '}
                  <MdEast className='svg' />
                </div>
              </HashLink>
            ) : (null)}
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
          <div className={`pr-8 pl-8 pb-8 pt-2 ${custom_margin_top} ${reading ? 'py-4' : null}`}>
            <p className={`${blogTitle ? 'card__title_blog' : 'h3'} w-full font-weight-semi-bold ${reading ? 'px-8' : null} ${!blog ? 'mb-2' : ''}  ${theme === 'primary' ? 'text__dark__grey' : ''} `}>{title ?? 'Conoce nuestras APIs de auto flexible'}</p>

            {blog && (
              <div className='card__information hidden__tags' style={blogTitleStyles}>
                <div className={`card__information__tags ${buttons?.length >= 3 ? 'tags-flex-wrap' : null} ${reading ? 'px-8' : null}`}>
                  {buttons && buttons?.length > 0 && buttons.map((button, index) => (
                    <div key={index} className='pr-2'>
                      <Chip title={button.label} className={`${button.class} ${buttons.length >= 4 ? 'tags-reponsive' : null} `} spanClass={`${button.spanClass} fs__14 ${blogTitle === true ? '' : 'font-weight-medium'} text-capitalize`} />
                    </div>
                  ))}
                </div>
                {reading && <p className='h6 font-weight-bold' style={{ fontSize: '12px', letterSpacing: '0.8px' }}>{reading.toUpperCase()}</p>}
              </div>
            )}

            <p className={`line-height-1 ${reading ? 'px-8' : null} text__gray__gray_darken body-2`}>
              {description ?? 'Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.Suspendisse potenti. Integer tincidunt. Aenean commodo ligula eget dolor. Nulla consequat massa quis enimQuisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipi cing, dui. Vestibulum volutpat pretium libero. Praesent blandit laoreet nibh. Nam at totor in tellus interdum sai.'}
            </p>

            {info && (
              link ? (
                <HashLink smooth to={link}>
                  <div className='card_chip_info mt-7 display_flex justify_content__end'>
                    <span>{info}</span>
                    {' '}
                    <MdEast className='svg' />
                  </div>
                </HashLink>
              ) : (
                <HashLink smooth to={`/blog/${id}#blogDetail`}>
                  <div className='card_chip_info mt-7 display_flex justify_content__end'>
                    <span>{info}</span>
                    {' '}
                    <MdEast className='svg' />
                  </div>
                </HashLink>
              )
            )}
          </div>
        </Base>
      )}
    </>
  );
};

CardInformation.defaultProps = {
  css_styles: '',
};

export default CardInformation;
