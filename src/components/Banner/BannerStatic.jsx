import React from 'react';
import Base from './Base';
import classes from './banner.module.scss';
import Button from '../Buttons/Button';
import SearchInput from '../Input/SearchInput';

function BannerStatic({ title, subtitle, img, isSearch, buttons, styles, stylesTitle, css_styles, ...props }) {

  const { custom_padding, custom_overlay } = css_styles;

  return (
    <Base style={styles} img={img}>
      <div style={stylesTitle} className={`container ${classes.banner__content} ${custom_overlay}`}>
        <div className={`row ${custom_padding}`}>
          <div className='flex-md-12 flex-sm-12'>
            <h1 className={`h1 text__white ${classes.shadow__text}`}>{ title }</h1>
          </div>
          {subtitle && (
            <div className='flex-md-8 flex-sm-12'>
              <p className='subtitle-1 text__secondary__white'>{subtitle}</p>
            </div>
          )}
          {buttons && (
            <div className='flex-md-12 flex-sm-12'>
              <div className='button__group mt-5'>
                {!buttons ? '' : buttons.map((button, index) => (
                  <div key={index} className='pr-2'>
                    <Button styles={button.class}>
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
                  icon
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

BannerStatic.defaultProps = {
  css_styles: '',
};

export default BannerStatic;
