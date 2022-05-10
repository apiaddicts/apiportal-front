import React, { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import * as MaterialDesign from 'react-icons/md';

import Base from './Base';

import './cards.scss';
import CardBasic from './CardBasic';

function CardSlider({ lists, flag = true }) {
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
    { img: 'https://images.unsplash.com/photo-1640955014216-75201056c829?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80' },
    { img: 'https://images.unsplash.com/photo-1648737153811-69a6d8c528bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
    { img: 'https://images.unsplash.com/photo-1515086828834-023d61380316?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80' },
  ];

  return (
    <div className='card_slider_container'>
      <div className='card_slider_container_slider' ref={slider}>
        {lists.map((item, i) => (
          <div key={i} className='card_slider_container_slider_slide'>
            <Base>
              {flag ? (
                <div className='container card_slider_container_text'>
                  <div className='row'>
                    <div className='flex-sm-12 flex-md-12 h3 text__secondary font-fs-joey pb-10'>
                      <h1>{item.title}</h1>
                    </div>
                    <div className='flex-sm-12 flex-md-12 body-1 text__gray__gray_darken font-weight-regular'>
                      <p>{item.description}</p>
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
                      <CardBasic info='MÁS INFORMACIÓN' img={src.img} title={`title ${i}`} description=' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ab voluptatum nisi alias veniam nesciunt facere non culpa itaque architecto ipsam iusto, repellat est sit? Esse et id vero ut! Lorem ipsum dolor, sit amet ' />
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
          <MdChevronLeft />
        </button>
        <button type='submit' className='card_slider_controls_right' onClick={nextSlide}>
          <MdChevronRight />
        </button>
      </div>
    </div>
  );
}

export default CardSlider;
