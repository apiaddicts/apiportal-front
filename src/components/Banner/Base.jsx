import React from 'react';
import classes from './banner.module.scss';

function Base({ children, img }) {
  const bannerStyle = (imgSrc) => ({
    background: `url(${imgSrc}) no-repeat`,
    backgroundSize: 'cover',
  });

  const overlayStyle = () => ({
    background: 'rgba(0, 0, 0, 0.7)',
  });

  return (
    <div className={`${classes.banner__container}`} style={img.length > 0 ? bannerStyle(img) : null}>
      <div className={classes.heroOverlay} style={img.length > 0 ? overlayStyle() : null}>
        {children}
      </div>
    </div>
  );

};

export default Base;
