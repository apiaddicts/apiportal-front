import React, { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import * as MaterialDesign from 'react-icons/md';

import Base from './Base';

import './cards.scss';

function CardSlider({ lists }) {
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

  return (
    <div className='card_slider_container'>
      <div className='card_slider_container_slider' ref={slider}>
        {lists.map((item, i) => (
          <div key={i} className='card_slider_container_slider_slide'>
            <Base>
              <div className='card_slider_container_text'>
                <div>
                  <h1>{item.title}</h1>
                  <p>
                    {item.description}
                  </p>
                </div>
                <div className='card_slider_container_footer'>
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
