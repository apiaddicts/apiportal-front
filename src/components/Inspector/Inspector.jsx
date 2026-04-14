import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Icon from '../MdIcon/Icon';
import mcpLibraryService from '../../services/mcpLibraryService';
import classes from './inspector.module.scss';

function Inspector({ item, slug, connectionOptions }) {
  const { t } = useTranslation();
  const [toolArgs, setToolArgs] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleArgChange = (key, value) => {
    setToolArgs((prev) => ({ ...prev, [key]: value }));
  };

  const parseToolResponse = (data) => {
    try {
      const text = data?.result?.content?.[0]?.text;

      if (!text) return data;

      return JSON.parse(text);
    } catch (e) {
      console.warn('Error parsing tool response', e);
      return data;
    }
  };

  const handleCallTool = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await mcpLibraryService.callTool(slug, {
        ...connectionOptions,
        toolName: item.name,
        toolArgs,
      });

      const parsed = parseToolResponse(data);

      setResult(parsed);
    } catch (e) {
      setError(e?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setToolArgs({});
    setResult(null);
    setError(null);
  }, [item?.name]);

  if (!item) {
    return (
      <div className={classes.empty_state}>
        <Icon id="MdTouchApp" />
        <span>{t('Inspector.selectItem')}</span>
      </div>
    );
  }

  const schemaProps = item._type === 'tool'
    ? Object.entries(item.inputSchema?.properties ?? {})
    : [];

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

          {schemaProps.length > 0 && (
            <div className={classes.inspector__block}>
              <span className={classes.inspector__label}>{t('Inspector.tryTool')}</span>
              {schemaProps.map(([key, def]) => (
                <div key={key} className={classes.inspector__field}>
                  <label className={classes.inspector__field__label}>
                    {key}
                    {item.inputSchema?.required?.includes(key) && (
                      <span className={classes.inspector__required}>*</span>
                    )}
                    {def.description && (
                      <span className={classes.inspector__field__hint}> — {def.description}</span>
                    )}
                  </label>
                  <input
                    type="text"
                    className={classes.inspector__field__input}
                    placeholder={def.type ?? 'value'}
                    value={toolArgs[key] ?? ''}
                    onChange={(e) => handleArgChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className={classes.inspector__run_btn}
            onClick={handleCallTool}
            disabled={loading || !slug}
          >
            <Icon id={loading ? 'MdSync' : 'MdPlayArrow'} />
            <span>{loading ? t('Inspector.running') : t('Inspector.run')}</span>
          </button>

          {error && (
            <div className={classes.inspector__error}>{error}</div>
          )}

          {result && (
            <div className={classes.inspector__block}>
              <span className={classes.inspector__label}>{t('Inspector.result')}</span>
              <pre className={classes.inspector__schema}>
                {JSON.stringify(result, null, 2)}
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
  slug: PropTypes.string,
  connectionOptions: PropTypes.shape({}),
};

Inspector.defaultProps = {
  item: null,
  slug: '',
  connectionOptions: {},
};

export default Inspector;