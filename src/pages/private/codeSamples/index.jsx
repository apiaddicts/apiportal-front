import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Paper, Container } from '@mui/material';

import { getApiList } from '../../../redux/actions/apiManagerAction';

function CodeSamples(props) {

  const { apis, loading } = useSelector((state) => state.apiManager);
  const dispatch = useDispatch();
  useEffect(() => {
    if (apis && apis.length === 0) {
      dispatch(getApiList('Mulesoft'))
    }


  }, []);

  return (

    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, py: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={600} mb={2}>
          Code samples
        </Typography>
        <Typography color="text.secondary" mb={5}>
          Luxand.cloud API contains a wide range of ready-to-use cases. Choose the relevant case
          and access the comprehensive documentation provided.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {apis.map((apiItem, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Link to={`/developer/code-samples/${apiItem.assetId}`} underline="none" color="inherit">
                <Paper
                  elevation={0}
                  sx={{
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
          ))}
        </Grid>

      </Box>
    </Container>
  );
}


CodeSamples.propTypes = {};

export default CodeSamples;
