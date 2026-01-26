import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import yaml from 'js-yaml';

import '@asyncapi/react-component/styles/default.min.css';
import AsyncAPIComponent from '@asyncapi/react-component/browser';
import Icon from '../../../components/MdIcon/Icon';

import libraryService from '../../../services/libraryService';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import classes from './asyncapi-ui.module.scss';

function AsyncApiUI() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [asyncApi, setAsyncApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAsyncApi, setHasAsyncApi] = useState(false);

  useEffect(() => {
    setLoading(true);
    setHasAsyncApi(false);
    setAsyncApi(null);

    libraryService
      .getOpenApiFromStrapi(id)
      .then((library) => {
        const doc = library?.openDoc;
        if (!doc) return;

        try {
          const parsed =
            library?.openDocFormat === 'json'
              ? JSON.parse(doc)
              : yaml.load(doc);

          if (!parsed?.asyncapi) return;

          setAsyncApi(parsed);
          setHasAsyncApi(true);
        } catch (e) {
          console.error('AsyncAPI parse error', e);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div className={classes.back__btn}>
        <div className={classes.return} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
          <Icon id='MdKeyboardBackspace' />
          <span>{t('SwaggerUI.back')}</span>
        </div>
      </div>
      <Container fixed>
        {loading && <SkeletonComponent />}

        {!loading && hasAsyncApi && asyncApi && (
          <div className={classes.asyncapiWrapper}>
            <AsyncAPIComponent
              schema={asyncApi}
              config={{
                showErrors: false,
                disableSchemaValidation: true,
                show: {
                  info: true,
                  servers: true,
                  messages: true,
                },
              }}
            />
          </div>
        )}

        {!loading && !hasAsyncApi && (
          <p style={{ textAlign: 'center', color: '#666' }}>
            No AsyncAPI documentation available
          </p>
        )}
      </Container>
    </div>
  );
}

export default AsyncApiUI;
