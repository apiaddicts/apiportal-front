import React from 'react';
import * as MaterialDesign from 'react-icons/md';
import Base from './Base';
import classes from './banner.module.scss';

function BannerVertical({ img, title, list }) {
  function icon(iconName) {
    const mdIcon = React.createElement(MaterialDesign[iconName]);
    if (mdIcon.type === undefined) {
      return React.createElement(MaterialDesign['MdApi']);
    }
    return mdIcon;
  }
  return (
    <div className={classes.banner__vertical}>
      <Base img={img} isVertical={true}>
        <div className={classes.banner__vertical__content}>
          <div>
            <div className={`${classes.divider} mb-4`} />
            <h1 className='h1 text__secondary__white'>{title}</h1>
            {
              list.map((x, i) => (
                <div key={i} className={classes.banner__list}>
                  <span className={`h4 text__secondary__white ${classes.banner__list__avatar}`}>{icon(x.iconName)}</span>
                  <p className='h4 text__secondary__white'>{x.label}</p>
                </div>
              ))
            }
          </div>
        </div>
      </Base>
    </div>
  );
}

export default BannerVertical;
