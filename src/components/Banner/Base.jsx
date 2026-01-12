import React from 'react';
import classes from './banner.module.scss';

function Base({ children, img, isPrivate }) {
  const bannerStyle = (imgSrc) => ({
    background: `url(${imgSrc}) no-repeat`,
    backgroundSize: 'cover',
  });

  return (
    <div
      className={`${isPrivate ? classes.banner__containerPriv : classes.banner__container}`}
      style={img && img.length > 0 ? bannerStyle(img) : null}
    >
      {children}
    </div>
  );

};

export default Base;
