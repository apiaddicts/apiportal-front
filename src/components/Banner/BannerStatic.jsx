import React from 'react';
import { useTranslation } from 'react-i18next';
import Base from './Base';
import classes from './banner.module.scss';
import Button from '../Buttons/Button';
import SearchInput from '../Input/SearchInput';

function BannerStatic({ title, subtitle, img, isSearch = false, buttons = [], styles = {}, stylesTitle = {}, css_styles = {}, isPrivate = false, ...props }) {
  const { t } = useTranslation();
  const { custom_padding = '', custom_overlay = '' } = css_styles;

  return (
    <Base style={styles} img={img} isPrivate={isPrivate}>
      <div style={stylesTitle} className={`container ${classes.banner__content} ${custom_overlay}`}>
        <div className={`row ${custom_padding}`}>
          <div className='flex-md-12 flex-sm-12'>
            <h1 className={`h1 text__white ${classes.shadow__text}`}>{title}</h1>
          </div>
          {subtitle && (
            <div className='flex-md-8 flex-sm-12'>
              <p className='subtitle-1 text__secondary__white'>{subtitle}</p>
            </div>
          )}

          {buttons.length > 0 && (
            <div className='flex-md-12 flex-sm-12'>
              <div className='button__group mt-5'>
                {buttons.map((button, index) => (
                  <div key={index} className='pr-2'>
                    <Button styles={button.class}>
                      {t(button.label)}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isSearch && (
            <div className='flex-sm-12 flex-md-12 flex-lg-6 flex-xl-6'>
              <SearchInput
                name='search'
                type='text'
                placeholder={t('BannerStatic.searchPlaceholder')}
                icon
                {...props}
              />
            </div>
          )}
        </div>
      </div>
    </Base>
  );
}

export default BannerStatic;
