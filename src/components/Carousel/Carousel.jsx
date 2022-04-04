import React from 'react';
import CardBasic from '../Card/CardBasic';
import classes from './carousel.module.scss';
import Icon from '../MdIcon/Icon';

function Carousel(props) {
  const imgs = [
    { img: 'https://images.unsplash.com/photo-1640955014216-75201056c829?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80' },
    { img: 'https://images.unsplash.com/photo-1648737153811-69a6d8c528bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
    { img: 'https://images.unsplash.com/photo-1515086828834-023d61380316?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80' },
  ];
  return (
    <div>

      <div className={classes.slider__container}>
        {imgs.map((src) => (
          <div className={classes.slider__content__card}>
            <CardBasic img={src.img} />
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
    </div>
  );
}

export default Carousel;
