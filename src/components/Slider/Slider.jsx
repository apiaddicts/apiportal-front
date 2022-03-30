import React, { useRef } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import classes from './slider.module.scss';

function Slider({ slides }) {
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
    console.log('BACK');

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

  return (
    <div className={classes.container}>
      <div className={classes.container__slider} ref={slider}>
        {slides.map((x, i) => (
          <div key={i} className={classes.container__slider__slide}>
            <img src={x.imgSrc} alt='banner Slider' />
            <div className={classes.container__slider__slide__text}>
              <h1>{x.title}</h1>
              <h2>{x.subtitle}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.controls}>
        <button type='submit' className={classes.controls__left} onClick={previousSlide}>
          <MdChevronLeft />
        </button>
        <button type='submit' className={classes.controls__right} onClick={nextSlide}>
          <MdChevronRight />
        </button>
      </div>
    </div>

  );
}

export default Slider;

