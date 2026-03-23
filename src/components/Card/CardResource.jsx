import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../MdIcon/Icon';
import classes from './card-resource.module.scss';

function CardResource({ resource }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.resource__card}>
      <button
        type='button'
        className={classes.resource__card__header}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={classes.resource__card__name}>{resource?.name || resource?.title || '-'}</span>
        <span className={classes.resource__card__toggle}>
          <Icon id={open ? 'MdExpandLess' : 'MdExpandMore'} />
        </span>
      </button>
      {resource?.description && (
        <p className={classes.resource__card__desc}>{resource.description}</p>
      )}
      {open && (
        <div className={classes.resource__card__body}>
          {resource?.uri && (
            <div className={classes.resource__card__row}>
              <span className={classes.resource__card__label}>{t('McpDetail.resourceUri')}</span>
              <span className={classes.resource__card__value}>{resource.uri}</span>
            </div>
          )}
          {resource?.mimeType && (
            <div className={classes.resource__card__row}>
              <span className={classes.resource__card__label}>{t('McpDetail.resourceMimeType')}</span>
              <span className={classes.resource__card__value}>{resource.mimeType}</span>
            </div>
          )}
          {resource?.size != null && (
            <div className={classes.resource__card__row}>
              <span className={classes.resource__card__label}>{t('McpDetail.resourceSize')}</span>
              <span className={classes.resource__card__value}>{resource.size}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CardResource;
