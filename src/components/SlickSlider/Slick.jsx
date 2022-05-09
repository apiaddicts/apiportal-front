/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import CardBasic from '../Card/CardBasic';

import './Slick.scss';

export default function SimpleSlider({ slides }) {

  const [slideIndex, setSlideIndex] = useState(0);

  const settings = {
    className: 'center mt-10 mb-10',
    centerMode: true,
    centerPadding: '0',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    focusOnSelect: true,
    adaptiveHeight: true,
    beforeChange: (current, next) => setSlideIndex(next),
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {slides.map((slide, i) => (
        <div key={i} className={i === slideIndex ? 'activeSlide' : 'slide'}>
          <CardBasic chipTitle={slide.statusText ? slide.statusText : ''} info={slide.linkText} img={slide.img ? slide.img : ''} title={slide.title} description={slide.description} />
        </div>
      ))}
    </Slider>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div
      className='prevArrow'
      onClick={onClick}
      role='button'
      tabIndex={0}
    >
      <MdArrowBackIos />
    </div>
  );
}
function SampleNextArrow({ onClick }) {
  return (
    <div
      className='nextArrow'
      onClick={onClick}
      role='button'
      tabIndex={0}
    >
      <MdArrowForwardIos />
    </div>
  );
}
