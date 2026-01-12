import React from 'react';
import classes from './apis.module.scss';
import CustomIcon from '../../../components/MdIcon/CustomIcon';

const CardLibrary = ({ api }) => {
  return (
    <div className={classes.card}>
      <div className={classes.card__header}>
        <CustomIcon name="logoNeuro" className={classes.logoIcon} />
      </div>
      <div className={classes.card__content}>
        <h3 className={classes.card__title}>{api.assetId}</h3>
        <span className={classes.card__slug}>{api.slug || api.assetId.toLowerCase()}</span>
        <p className={classes.card__description}>
          {api.description || 'Quisque rutrum. Sed augue ipsum, egestas nec, vestibulum et, malesuada adip cing dui. Vestibulum volutpat pretium libero.'}
        </p>
        <a
          href={`/developer/apis/${api.id}`}
          className={classes.card__button}
        >
          VER DOCUMENTACIÓN <span>➜</span>
        </a>
      </div>
    </div>
  );
};

export default CardLibrary;
