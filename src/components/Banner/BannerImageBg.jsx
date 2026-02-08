import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../MdIcon/Icon';
import Button from '../Buttons/Button';
import classes from './banner.module.scss';

function BannerImageBg({
  imageUrl,
  initialTitle = 'Título del banner',
  initialSubtitle = 'Subtítulo del banner',
  textBtn = 'Ver más',
  action = () => console.log('Hola mundo'),
  overlay = 0.35,
  redirect = '/'
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const { pathname } = useLocation();

  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
  const secondaryColor = rootStyles.getPropertyValue('--secondary-color').trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    action();
  };

  return (
    <div
      className={classes.banner_img}
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-hidden="true"
    >
      <div className={classes.banner_img__backTo} >
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
      <div className={classes.banner_img__title_imgbg}>
        <h1>{title}</h1>
        <div style={{display: 'flex'}}>
          <p className={classes.banner_img__title_imgbg__subtitle_imgbg} style={{flexBasis: '50%' }}>{subtitle}</p>
        </div>
        <Button
          type='button'
          baseColor={primaryColor}
          styles='primary-dinamic'
          size='small'
          style={{ width: '200px', height: '32px' }}
        >
          {textBtn}
        </Button>
      </div>
    </div>
  );
}

export default BannerImageBg;
