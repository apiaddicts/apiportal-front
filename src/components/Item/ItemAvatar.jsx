import React from 'react';
import config from '../../services/config';
import classes from './avatar.module.scss';

function ItemAvatar({img = '', title = '', paragraph = '', time, border = false, divider = false, css_styles = {} }) {
  const { custom_title = '', custom_paragraph = '' } = css_styles;
  const displayTitle = time === undefined ? title : `${title} - ${time}`;

  return (
    <div className={`${classes.item} ${border ? classes.item__border : ''}`}>
      <div className={classes.item__avatar}>
        <img
          src={img || config.notImage}
          alt=''
          className={classes.item__avatar__img}
        />
      </div>
      <div className={classes.item__content}>
        <div className={`${classes.item__content__title} ${custom_title}`}>
          <span>{displayTitle}</span>
        </div>
        <div className={classes.item__content__paragraph}>
          <p className={custom_paragraph}>{paragraph}</p>
        </div>

        {divider && <div className={`${classes.divider} mt-3`} />}
      </div>
    </div>
  );
}

export default ItemAvatar;