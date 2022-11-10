import React from 'react';
import classes from './banner.module.scss';

function Base({ children, img }) {
  const bannerStyle = (imgSrc) => ({
    background: `url(${imgSrc}) no-repeat`,
    backgroundSize: 'cover',
  });

  return (
    <div className={`${classes.banner__container}`} style={img.length > 0 ? bannerStyle(img) : null}>
      {children}
    </div>
  );

};

export default Base;
