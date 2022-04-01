import React from 'react';
import Base from './Base';
import classes from './banner.module.scss';
import Button from '../Buttons/Button';

function BannerStatic({ title, subtitle, img, isSearch, buttons }) {
  return (
    <Base img={img}>
      <div className={classes.banner__content}>
        <div className={`${classes.divider} mb-4`} />
        <h1 className='h1 text__secondary__white'>{ title }</h1>
        <p className='subtitle-1 text__secondary__white'>{subtitle}</p>
        <div className='button__group mt-5'>
          {buttons.map((button, i) => (
            <div key={i} className='pr-2'>
              <Button type={button.class}>
                {button.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}

export default BannerStatic;
