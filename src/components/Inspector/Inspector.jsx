import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Icon from '../MdIcon/Icon';
import classes from './inspector.module.scss';

function Inspector({ item }) {
  const { t } = useTranslation();

  if (!item) {
    return (
      <div className={classes.empty_state}>
        <Icon id="MdTouchApp" />
        <span>{t('Inspector.selectItem')}</span>
      </div>
    );
  }

  return (
    <div className={classes.inspector}>
      <h4 className={classes.inspector__name}>{item.name}</h4>

      {item.title && (
        <div className={classes.inspector__block}>
          <span className={classes.inspector__label}>{t('Inspector.title')}</span>
          <p className={classes.inspector__desc}>{item.title}</p>
        </div>
      )}

      {item.description && (
        <div className={classes.inspector__block}>
          <span className={classes.inspector__label}>{t('Inspector.description')}</span>
          <p className={classes.inspector__desc}>{item.description}</p>
        </div>
      )}

      {item._type === 'tool' && (
        <>
          {item.inputSchema && (
            <div className={classes.inspector__block}>
              <span className={classes.inspector__label}>{t('Inspector.inputSchema')}</span>
              <pre className={classes.inspector__schema}>
                {JSON.stringify(item.inputSchema, null, 2)}
              </pre>
            </div>
          )}
          {item.outputSchema && (
            <div className={classes.inspector__block}>
              <span className={classes.inspector__label}>{t('Inspector.outputSchema')}</span>
              <pre className={classes.inspector__schema}>
                {JSON.stringify(item.outputSchema, null, 2)}
              </pre>
            </div>
          )}
          {item.annotations && (
            <div className={classes.inspector__block}>
              <span className={classes.inspector__label}>{t('Inspector.annotations')}</span>
              <pre className={classes.inspector__schema}>
                {JSON.stringify(item.annotations, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}

      {item._type === 'resource' && (
        <>
          {item.uri && (
            <div className={classes.inspector__block}>
              <span className={classes.inspector__label}>URI</span>
              <p className={classes.inspector__desc}>{item.uri}</p>
            </div>
          )}
          {item.mimeType && (
            <div className={classes.inspector__block}>
              <span className={classes.inspector__label}>{t('Inspector.mimeType')}</span>
              <p className={classes.inspector__desc}>{item.mimeType}</p>
            </div>
          )}
          {item.size != null && (
            <div className={classes.inspector__block}>
              <span className={classes.inspector__label}>{t('Inspector.size')}</span>
              <p className={classes.inspector__desc}>{item.size}</p>
            </div>
          )}
        </>
      )}

      {item._type === 'prompt' && item.arguments && (
        <div className={classes.inspector__block}>
          <span className={classes.inspector__label}>{t('Inspector.arguments')}</span>
          <pre className={classes.inspector__schema}>
            {JSON.stringify(item.arguments, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

Inspector.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    _type: PropTypes.string,
    inputSchema: PropTypes.shape({}),
    outputSchema: PropTypes.shape({}),
    annotations: PropTypes.shape({}),
    uri: PropTypes.string,
    mimeType: PropTypes.string,
    size: PropTypes.number,
    arguments: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
  }),
};

Inspector.defaultProps = {
  item: null,
};

export default Inspector;
