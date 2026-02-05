import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Paper, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { getLibraries } from '../../../redux/actions/libraryAction';
import classes from './code.module.scss';

function CodeSamples(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { libraries } = useSelector((state) => state.library);

  useEffect(() => {
    if (libraries && libraries.length === 0) {
      dispatch(getLibraries());
    }
  }, [dispatch, libraries]);

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
      <Box sx={{ mx: 'auto',  }}>

        <Typography className={classes.title}>
          {t('codeSamplesTitle')}
        </Typography>

        <Grid container spacing={4}>
          {libraries.length > 0 ? (
            libraries.map((apiItem, index) => (
              <Grid item size={4} key={index}>
                <Link to={`/developer/code-samples/${apiItem.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Paper className={classes.code__card}>
                    <Typography className={classes.code__card__title}>
                      {apiItem.slug}
                    </Typography>
                    <Typography className={classes.code__card__desc}>
                      {apiItem.description ?? apiItem.slug}
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
