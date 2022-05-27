import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { HashLink } from 'react-router-hash-link';

import Button from '../Buttons/Button';

import classes from './slider.module.scss';

function Slider({ slides }) {
  const navigate = useNavigate();

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

  const handleClick = (click) => {

    if (click !== '') {
      navigate(click);
    } else {
      // document.getElementById('data').scrollIntoView(true);
    }
  };

  return (
    <div className={classes.content}>
      <div className={classes.content__slider} ref={slider}>
        {slides.map((x, i) => (
          <div key={i} className={classes.content__slider__slide}>
            <img src={x.imgSrc} alt='banner Slider' />
            <div className={classes.content__slider__slide__text}>
              <div className='container align-center'>
                <div className='row'>
                  <div className='flex-md-12 flex-sm-12'>
                    <div className='divider mb-4' />
                  </div>

                  <div className='flex-md-6 flex-lg-8 flex-xl-6 flex-sm-12'>
                    <h1 className='h1 text__secondary__white'>{x.title}</h1>
                  </div>

                  <div className='flex-md-12 flex-sm-12 mt-5'>
                    <div className='button__group mt-10'>
                      {
                        x.actionButtons !== null ? (
                          x.actionButtons.map((i, index) => (
                            <div key={index + i} className='pr-2 mb-4 justify-start'>
                              {i.route !== '' ? (
                                <Button styles={i.type} onClick={() => handleClick(i.route)}>
                                  {i.label}
                                </Button>

                              ) : (
                                <HashLink smooth to='/#data'>
                                  <Button styles={i.type} onClick={() => handleClick(i.route)}>
                                    {i.label}
                                  </Button>
                                </HashLink>
                              )}
                            </div>
                          ))
                        ) : (null)
                      }
                    </div>
                  </div>

                </div>
              </div>

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

