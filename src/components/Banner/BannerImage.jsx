import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import config from '../../services/config';
import Button from '../Buttons/Button';
import Icon from '../MdIcon/Icon';
import classes from './banner.module.scss';

function BannerImage({ buttons, setIsOpen, title = '', img = '', description, css_styles, redirect = '/', apiId = '' }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { layout_height, apiindividual_height, image_display, custom_line_height } = css_styles;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/apis/${apiId}/swagger-ui`);
  };

  return (
    <div
      className={classes.banner_img}
    >
      <div className={`${classes.banner_img__layout} ${classes[layout_height]} ${classes[apiindividual_height]}`}>
        <div className='container'>
          <div
            className={classes.banner_img__backTo}
          >
            {(pathname !== '/apis' && (
              <Link to={redirect} className={classes.banner_img__backTo__btn}>
                <div>
                  <Icon id='MdKeyboardBackspace' />
                </div>
                <div className={classes.banner_img__backTo__label}>
                  <span>{t('BannerImage.goBack')}</span>
                </div>
              </Link>
            ))}
          </div>
          <div
            className={classes.banner_img__title}
          >
            <h1 className='h2 mb-3 text__white'>
              {title !== '' ? title : ''}
            </h1>
            <div className={classes['width-text-banner']}>
              <p className={`subtitle-1 text__white ${custom_line_height}`}>
                {description}
              </p>
            </div>
            <div className='w-full'>
              {buttons && (
                <div className='flex-md-12 flex-sm-12'>
                  <div className='button__group mt-5'>
                    {!buttons ? '' : buttons.map((button, index) => {
                      return (
                        <div key={index} className='mr-10 pr-2'>
                          <Button onClick={handleClick} styles={button.class}>
                            {t(button.label)}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          {(!pathname.includes('try-out') && (
            <img
              className={`${classes.banner_img__img} ${classes[image_display]}`}
              src={img !== '' ? img : config.notImage}
              alt={t('BannerImage.noImage')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerImage;
