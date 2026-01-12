import React, { useRef } from 'react';
// import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import * as MaterialDesign from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import Base from './Base';

import './cards.scss';
import CardBasic from './CardBasic';

function CardSlider({ lists, flag = true }) {
  const { t } = useTranslation();
  const slider = useRef(null);

  const nextSlide = () => {
    if (slider.current.children.length > 0) {

      const firstElement = slider.current.children[0];

      slider.current.style.transition = '300ms ease-out all';

      const slideSize = slider.current.children[0].offsetWidth;

      slider.current.style.transform = `translateX(-${slideSize}px)`;

      const transition = () => {
        slider.current.style.transition = 'none';
        slider.current.style.transform = 'translateX(0)';

        slider.current.appendChild(firstElement);

        slider.current.removeEventListener('transitionend', transition);
      };

      slider.current.addEventListener('transitionend', transition);

    }
  };
  const previousSlide = () => {

    if (slider.current.children.length > 0) {

      const index = slider.current.children.length - 1;

      const lastElement = slider.current.children[index];

      slider.current.insertBefore(lastElement, slider.current.firstChild);

      const slideSize = slider.current.children[0].offsetWidth;
      slider.current.style.transition = 'none';
      slider.current.style.transform = `translateX(-${slideSize}px)`;

      setTimeout(() => {
        slider.current.style.transition = '300ms ease-out all';
        slider.current.style.transform = 'translateX(0)';
      }, 30);
    }

  };

  const icon = (iconName) => {
    const mdIcon = React.createElement(MaterialDesign[iconName]);
    if (mdIcon.type === undefined) {
      return React.createElement(MaterialDesign['MdApi']);
    }
    return mdIcon;
  };

  const imgs = [
    { img: '' },
    { img: '' },
    { img: '' },
  ];

  return (
    <div className='card_slider_container'>
      <div className='card_slider_container_slider' ref={slider}>
        {lists.map((item, i) => (
          <div key={i} className='card_slider_container_slider_slide'>
            <Base style={{ height: '84% !important' }}>
              {flag ? (
                <div className='card_slider_container_text'>
                  <div className='row'>
                    <div className='flex-sm-12 flex-md-12 text__secondary pb-8'>
                      <h1 className='h3 font-fs-joey'>{item.title}</h1>
                    </div>
                    <div className='flex-sm-12 flex-md-12 body-1 text__gray__gray_darken font-weight-regular'>
                      <p style={{ lineHeight: '28px' }}>{item.description}</p>
                    </div>
                    <div className='flex-sm-12 flex-md-12 mt-10 card_slider_container_footer'>
                      <span className='card_slider_container_footer_icon'>
                        {icon(item.icon)}
                      </span>
                      <div className='card_slider_container_footer_bar' />
                      <div className='card_slider_container_footer_text'>
                        <h5>{item.titleFooter}</h5>
                        <span>{item.descriptionFooter}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='container'>
                  {imgs.map((src, i) => (
                    <div key={i}>
                      <CardBasic info={t('CardSlider.moreInfo')} img={src.img} title={`title ${i}`} description={t('CardSlider.defaultDescription')} />
                    </div>
                  ))}
                </div>
              )}

            </Base>

          </div>
        ))}
      </div>
      <div className='card_slider_controls'>
        <button type='submit' className='card_slider_controls_left' onClick={previousSlide}>
          <svg width='19' height='30' viewBox='0 0 19 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path opacity='0.5' d='M18 29L2 14.9998L18 1' stroke='#00AEC7' strokeWidth='1.5' />
          </svg>

        </button>
        <button type='submit' className='card_slider_controls_right' onClick={nextSlide}>
          <svg width='19' height='30' viewBox='0 0 19 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1 29L17 14.9998L1 1' stroke='#00AEC7' strokeWidth='1.5' />
          </svg>

        </button>
      </div>
    </div>
  );
}

export default CardSlider;
