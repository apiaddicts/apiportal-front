import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../MdIcon/Icon';
import classes from './card-resource.module.scss';

function CardResource({ resource, type }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const renderBody = () => {
    if (type === 'tool') {
      return (
        <>
          {resource?.inputSchema && (
            <div className={classes.resource__card__row}>
              <span className={classes.resource__card__label}>{t('Inspector.inputSchema')}</span>
              <pre className={classes.resource__card__pre}>{JSON.stringify(resource.inputSchema, null, 2)}</pre>
            </div>
          )}
          {resource?.outputSchema && (
            <div className={classes.resource__card__row}>
              <span className={classes.resource__card__label}>{t('Inspector.outputSchema')}</span>
              <pre className={classes.resource__card__pre}>{JSON.stringify(resource.outputSchema, null, 2)}</pre>
            </div>
          )}
          {resource?.annotations && (
            <div className={classes.resource__card__row}>
              <span className={classes.resource__card__label}>{t('Inspector.annotations')}</span>
              <pre className={classes.resource__card__pre}>{JSON.stringify(resource.annotations, null, 2)}</pre>
            </div>
          )}
        </>
      );
    }
    if (type === 'prompt') {
      return (
        <>
          {resource?.arguments && (
            <div className={classes.resource__card__row}>
              <span className={classes.resource__card__label}>{t('Inspector.arguments')}</span>
              <pre className={classes.resource__card__pre}>{JSON.stringify(resource.arguments, null, 2)}</pre>
            </div>
          )}
        </>
      );
    }
    // resource (default)
    return (
      <>
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
      </>
    );
  };

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
          {renderBody()}
        </div>
      )}
    </div>
  );
}

export default CardResource;
