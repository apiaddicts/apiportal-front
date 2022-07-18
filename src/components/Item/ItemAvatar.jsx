import React from 'react';
import classes from './avatar.module.scss';

function ItemAvatar({ img, title, paragraph, border, divider, css_styles }) {

  const { custom_title, custom_paragraph } = css_styles;

  return (
    <div className={`${classes.item} ${border ? classes.item__border : null}`}>
      <div className={classes.item__avatar}>
        <img src={img} alt='' className={classes.item__avatar__img} />
      </div>
      <div className={classes.item__content}>
        <div className={`${classes.item__content__title} ${custom_title}`}>
          <h1>{title}</h1>
        </div>
        <div className={classes.item__content__paragraph}>
          <p className={custom_paragraph}>{paragraph}</p>
        </div>
        {divider ? <div className={`${classes.divider} mt-3`} /> : null}
      </div>
    </div>
  );
}

ItemAvatar.defaultProps = {
  css_styles: '',
};

export default ItemAvatar;
