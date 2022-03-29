import React from 'react';
import Base from './Base';
import Button from '../Buttons/Button';
import classes from './banner.module.scss';

function BannerCentered({ title, subtitle, buttonLabel, img, buttonType }) {
  return (
    <Base img={img}>
      <div className={classes.banner__centered}>
        <h1 className='h2 mb-3 text__secondary'>{title}</h1>
        <p className='h4 mb-5 text__secondary__white font-weight-semi-bold'>{subtitle}</p>
        <Button type={buttonType}>
          {buttonLabel}
        </Button>
      </div>
    </Base>
  );
}

export default BannerCentered;
