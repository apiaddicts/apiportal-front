import React from 'react';
import CardBasic from '../Card/CardBasic';
import classes from './carousel.module.scss';
import Icon from '../MdIcon/Icon';

function Carousel(props) {
  const imgs = [
    { img: '' },
    { img: '' },
    { img: '' },
  ];
  return (
    <>
      <div className={classes.slider__container}>
        {imgs.map((src, i) => (
          <div key={i} className={classes.slider__content__card}>
            <CardBasic info='MÁS INFORMACIÓN' img={src.img} title={`title ${i}`} description=' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ab voluptatum nisi alias veniam nesciunt facere non culpa itaque architecto ipsam iusto, repellat est sit? Esse et id vero ut! Lorem ipsum dolor, sit amet ' />
          </div>
        ))}
      </div>
      <div className={classes.controls}>
        <div>
          <Icon id='MdChevronLeft' />
        </div>
        <div className={classes.controls__dots}>
          <div className={classes.controls__dots__dot} />
          <div className={classes.controls__dots__dot} />
          <div className={classes.controls__dots__dot} />
        </div>
        <div>
          <Icon id='MdChevronRight' />
        </div>
      </div>
    </>
  );
}

export default Carousel;
