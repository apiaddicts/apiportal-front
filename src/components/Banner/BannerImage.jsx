import React from 'react';
import { Link } from 'react-router-dom';
import classes from './banner.module.scss';

function BannerImage() {
  //   const urlImg = 'https://picsum.photos/500/200';

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
