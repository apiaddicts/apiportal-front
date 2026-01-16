import React from 'react';

import Base from './Base';
import Button from '../Buttons/Button';
import classes from './banner.module.scss';

function BannerCentered({ title, subtitle, buttonLabel, img, buttonType, redirect, setOpenForm }) {

  return (
    <Base img={img}>
      <div className={`container ${classes.banner__centered}`}>
        <div className='row justify-center text-center mb-5'>
          <div className='flex-md-12 flex-sm-12'>
            <h1 className='h2 mb-3 text__white'>{title}</h1>
          </div>
        </div>

        <div className='row justify-center text-center mb-5'>
          <div className='flex-md-12 flex-sm-12'>
            <p className='h5 mb-5 text__white font-weight-semi-bold'>{subtitle}</p>
          </div>
        </div>

        <div className='row justify-center text-center'>
          <div className='flex-lg-3 flex-md-5 flex-sm-12 flex-xl-3'>
          {buttonLabel && (
            redirect ? (
              <Button
                styles={buttonType}
                onClick={() => window.open(redirect, '_blank')}
              >
                {buttonLabel}
              </Button>
            ) : (
              <Button styles={buttonType} onClick={() => setOpenForm(true)}>
                {buttonLabel}
              </Button>
            )
          )}
          </div>
        </div>

      </div>
    </Base>
  );
}

export default BannerCentered;
