import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SwaggerUIReact from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import { Container } from '@mui/material';
import Icon from '../../../components/MdIcon/Icon';
import libraryService from '../../../services/libraryService';
import classes from './swagger-ui.module.scss';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
import yaml from 'js-yaml';

function SwaggerUI() {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [openApi, setOpenApi] = useState(null);
  const [swaggerUi, setSwaggerUi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasOpenApi, setHasOpenApi] = useState(false);

  useEffect(() => {
    setLoading(true);
    setHasOpenApi(false);
    setOpenApi(null);

    libraryService
      .getOpenApiFromStrapi(params.id)
      .then(async (library) => {
        let openDoc = library?.openDoc;
        let openDocUrl = library?.openDocUrl;
        let openDocFormat = library?.openDocFormat;

        try {
          let parsedDoc = null;
          if (openDocUrl) {
            const response = await fetch(openDocUrl);
            const text = await response.text();

            if (openDocFormat === 'json') {
              parsedDoc = JSON.parse(text);
            } else {
              parsedDoc = yaml.load(text);
            }
          }

          else if (openDoc) {
            if (openDocFormat === 'json') {
              parsedDoc = JSON.parse(openDoc);
            } else {
              parsedDoc = yaml.load(openDoc);
            }
          }

          if (!parsedDoc?.openapi || !parsedDoc?.paths) {
            throw new Error('Invalid OpenAPI spec');
          }

          setOpenApi(parsedDoc);
          setHasOpenApi(true);
        } catch (err) {
          console.error(err);
          setHasOpenApi(false);
        }
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const EmptyState = () => (
    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
      <p>{t('SwaggerUI.noInfo')}</p>
    </div>
  );

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
        {!loading && !hasOpenApi && <EmptyState />}
        {!loading && hasOpenApi && (
          <SwaggerUIReact
            spec={openApi}
            onComplete={(ui) => setSwaggerUi(ui)}
          />
        )}
      </Container>
    </div>
  );
}

export default SwaggerUI;
