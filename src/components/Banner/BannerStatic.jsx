import React from 'react';
import Base from './Base';
import classes from './banner.module.scss';
import Button from '../Buttons/Button';
import SearchInput from '../Input/SearchInput';

function BannerStatic({ title, subtitle, img, isSearch, buttons, ...props }) {

  return (
    <Base img={img}>
      <div className={`container ${classes.banner__content}`}>
        <div className='row'>
          <div className='flex-md-12 flex-sm-12'>
            <h1 className='h1 text__secondary__white'>{ title }</h1>
          </div>
          {subtitle && (
            <div className='flex-md-8 flex-sm-12'>
              <p className='subtitle-1 text__secondary__white'>{subtitle}</p>
            </div>
          )}
          <div className='flex-md-8 flex-sm-12'>
            <div className={`${classes.divider}`} />
          </div>
          {buttons && (
            <div className='flex-md-12 flex-sm-12'>
              <div className='button__group mt-5'>
                {!buttons ? '' : buttons.map((button, index) => (
                  <div key={index} className='pr-2'>
                    <Button type={button.class}>
                      {button.label}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className='flex-sm-12 flex-md-12 flex-lg-6 flex-xl-6'>
            <div>
              {isSearch && (
                <SearchInput
                  name='search'
                  type='text'
                  placeholder='Buscar'
                  {...props}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default BannerStatic;
