import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Buttons/Button';
import classes from './banner.module.scss';

function BannerImage({ buttons, setIsOpen }) {
  //   const urlImg = 'https://picsum.photos/500/200';
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
      <div
        className={classes.banner_img__backTo}
      >
        <Link to={-1}> Volver</Link>
      </div>
      <div
        className={classes.banner_img__title}
      >
        <h1 className='h2 mb-3 text__primary'>Biblioteca de APIs</h1>
        <div className={`${classes.divider} mb-4 mt-3`} />
        <div className='w-full'>
          {buttons && (
            <div className='flex-md-12 flex-sm-12'>
              <div className='button__group mt-5'>
                {!buttons ? '' : buttons.map((button, index) => (
                  <div key={index} className='pr-2'>
                    <Button styles={button.class} onClick={handleClick}>
                      {button.label}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <img
        className={classes.banner_img__img}
        src='https://picsum.photos/500/200'
        alt='lorem'
      />
      <div
        className={classes.banner_img__footer}
      />
    </div>
  );
}

export default BannerImage;
