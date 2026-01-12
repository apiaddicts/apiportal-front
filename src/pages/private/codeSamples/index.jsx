import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Paper, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { getApiList } from '../../../redux/actions/apiManagerAction';
import { getLibraries } from '../../../redux/actions/libraryAction';
import classes from './code.module.scss';

const compareArrays = (array1, array2) => {
  return array1.filter((a) => {
    return array2.some((b) => {
      return a.assetId === b.slug;
    });
  });
};

function CodeSamples(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { apis, loading } = useSelector((state) => state.apiManager);
  const { libraries } = useSelector((state) => state.library);

  useEffect(() => {
    if (apis && apis.length === 0) {
      dispatch(getApiList('Mulesoft'));
    }
    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
    }
  }, [dispatch, apis, libraries]);

  const fApis = useMemo(() => {
    if (libraries && libraries.length > 0 && apis && apis.length > 0) {
      return compareArrays(apis, libraries);
    }
    return [];
  }, [apis, libraries]);

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
      <Box sx={{ mx: 'auto',  }}>

        <Typography className={classes.title}>
          {t('codeSamplesTitle')}
        </Typography>

        <Grid container spacing={4}>
          {fApis.length > 0 ? (
            fApis.map((apiItem, index) => (
              <Grid item size={4} key={index}>
                <Link to={`/developer/code-samples/${apiItem.assetId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Paper className={classes.code__card}>
                    <Typography className={classes.code__card__title}>
                      {apiItem.assetId}
                    </Typography>
                    <Typography className={classes.code__card__desc}>
                      {apiItem.description ?? apiItem.assetId}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              {t('loading')}
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

CodeSamples.propTypes = {};

export default CodeSamples;
