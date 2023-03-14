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
        {slides && slides.length > 0 ? slides.map((x, i) => (
          <div key={i} className={classes.content__slider__slide}>
            <img src={x?.imgSrc} alt='' />
            <div className={classes.content__slider__slide__text}>
              <div className='container align-center'>
                <div className='display_flex justify_content__center'>
                  <h1 className='h1 text__white w_800 text-center'>{x?.title}</h1>
                </div>
                <div className='display_flex justify_content__center'>
                  <div className='flex-md-12 flex-sm-12 mt-5'>
                    <div className='button__group mt-10'>
                      {
                        x?.actionButtons && x?.actionButtons?.length ? (
                          x?.actionButtons.map((i, index) => (
                            <div key={index + i} className='pr-2 mb-4 justify-start'>
                              {'route' in i && i?.route !== '' ? (
                                <Button styles={i?.type} onClick={() => handleClick(i?.route)}>
                                  {i?.label}
                                </Button>
                              ) : ('externalUrl' in i && i?.externalUrl !== '') ? (
                                <a
                                  className={
                                    i?.type === 'primary' ? 'btn btn-primary' :
                                      i?.type === 'primary-blue' ? 'btn btn-primary-blue' :
                                        i?.type === 'secundary' ? 'btn btn-secundary' :
                                          i?.type === 'secundary-white' ? 'btn btn-secundary-white' :
                                            i?.type === 'tertiary' ? 'btn btn-tertiary' :
                                              i?.type === 'tertiary-white' ? 'btn btn-tertiary-white' :
                                                i?.type === 'ghost' ? 'btn btn-ghost' :
                                                  i?.type === 'ghost-variant' ? 'btn btn-ghost-variant' :
                                                    i?.type === 'greey-primary' ? 'btn btn-grey' :
                                                      i?.type === 'disabled' ? 'btn btn-disabled' : 'btn-none'
                                  }
                                  href={i?.externalUrl}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {i?.label}
                                </a>
                              ) : (
                                <HashLink smooth to='/#data'>
                                  <Button styles='tertiary' onClick={() => handleClick(i?.route)}>
                                    {i?.label}
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
        )) : (
          <div className={classes.content__slider__slide}>
            <img alt='' />
            <div className={classes.content__slider__slide__text} />
          </div>
        )}
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

