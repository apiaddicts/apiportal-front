import React from 'react';
import { useTranslation } from 'react-i18next';
import CardBasic from '../Card/CardBasic';
import classes from './carousel.module.scss';
import Icon from '../MdIcon/Icon';

function Carousel(props) {
  const { t } = useTranslation();

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
            <CardBasic info={t('Carousel.moreInfo')} img={src.img} title={`title ${i}`} description={t('Carousel.defaultDescription')} />
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
