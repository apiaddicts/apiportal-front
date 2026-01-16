import React from 'react';
import classes from './banner.module.scss';

function Base({ children, img, isPrivate }) {
  const bannerStyle = (imgSrc) => {
    if (imgSrc && imgSrc.length > 0) {
      return {
        background: `url(${imgSrc}) no-repeat center`,
        backgroundSize: 'cover',
      };
    }
    return { backgroundColor: 'var(--primary-color)' };
  };

  return (
    <div
      className={isPrivate ? classes.banner__containerPriv : classes.banner__container}
      style={bannerStyle(img)}
    >
      {children}
    </div>
  );

};

export default Base;
