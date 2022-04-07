import React from 'react';
import classes from './avatar.module.scss';

function ItemAvatar({ img, title, paragraph }) {
  return (
    <div className={classes.item}>
      <div className={classes.item__avatar}>
        <img src={img} alt='' className={classes.item__avatar__img} />
      </div>
      <div className={classes.item__content}>
        <div className={classes.item__content__title}>
          <h1>{title}</h1>
        </div>
        <div className={classes.item__content__paragraph}>
          <p>{paragraph}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemAvatar;
