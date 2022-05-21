import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../Buttons/Button';
import Icon from '../MdIcon/Icon';
import classes from './banner.module.scss';

function BannerImage({ buttons, setIsOpen, title = '', img = '', description, css_styles, redirect = '/' }) {

  const { layout_height, image_display } = css_styles;
  const navigate = useNavigate();
  const handleClick = () => {
    const session = localStorage.getItem('session');
    if (session) {
      navigate('/documentation/api');
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      className={classes.banner_img}
    >
      <div className={`${classes.banner_img__layout} ${classes[layout_height]}`}>
        <div className='container'>
          <div
            className={classes.banner_img__backTo}
          >
            <Link to={redirect} className={classes.banner_img__backTo__btn}>
              <div>
                <Icon id='MdKeyboardBackspace' />
              </div>
              <div className={classes.banner_img__backTo__label}>
                <span>Volver</span>
              </div>
            </Link>
          </div>
          <div
            className={classes.banner_img__title}
          >
            <h1 className='h1 mb-3 text__primary'>
              {title !== '' ? title : 'Biblioteca de APIs' }
            </h1>
            <div className={`${classes.divider} mb-4 mt-3`} />
            <div className={classes['width-text-banner']}>
              <p className='subtitle-1'>
                {description}
              </p>
            </div>
            <div className='w-full'>
              {buttons && (
                <div className='flex-md-12 flex-sm-12'>
                  <div className='button__group mt-5'>
                    {!buttons ? '' : buttons.map((button, index) => {
                      console.log('button', button.class);
                      return (
                        <div key={index} className='mr-10 pr-2'>
                          <Button styles={button.class} onClick={handleClick}>
                            {button.label}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <img
            className={`${classes.banner_img__img} ${classes[image_display]}`}
            src={img !== '' ? img : 'https://picsum.photos/500/200'}
            alt='lorem'
          />
        </div>
        <div className={classes.banner_img__footer} />
      </div>
    </div>
  );
}

export default BannerImage;
