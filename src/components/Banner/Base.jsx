import React from 'react';
import classes from './banner.module.scss';

function Base({ children, img }) {

  const bannerStyle = (imgSrc) => ({
    background: `url(${imgSrc}) no-repeat`,
    backgroundSize: 'cover',
  });

  return (
    <div className={`${classes.banner__container}`} style={bannerStyle(img)}>
      <div className={classes.heroOverlay}>
        {children}
      </div>
    </div>
  );

};

export default Base;
