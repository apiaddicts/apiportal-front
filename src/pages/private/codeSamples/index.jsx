import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Paper, Container } from '@mui/material';

import { getApiList } from '../../../redux/actions/apiManagerAction';
import { getLibraries } from '../../../redux/actions/libraryAction';

const compareArrays = (array1, array2) => {
  return array1.filter((a) => {
    return array2.some((b) => {
      return a.assetId === b.slug;
    });
  });
};

function CodeSamples(props) {
  const dispatch = useDispatch();
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
      <Box sx={{ mx: 'auto', py: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={600} mb={2}>
          Code samples
        </Typography>
        <Typography color="text.secondary" mb={5}>
          API contains a wide range of ready-to-use cases...
        </Typography>

        <Grid container spacing={4}>
          {fApis.length > 0 ? (
            fApis.map((apiItem, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Link to={`/developer/code-samples/${apiItem.assetId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: '150px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 3,
                      textAlign: 'center',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#f5faff',
                        borderColor: 'primary.main',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {apiItem.assetId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {apiItem.description ?? 'Sin descripción'}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              Cargando...
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

CodeSamples.propTypes = {};

export default CodeSamples;
