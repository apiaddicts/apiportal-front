import React from 'react';

import { Container, Card, Grid } from '@mui/material';

import Title from '../../components/Title/Title';

function AppsDetail(props) {
  return (
    <Container className='mt-10 pt-10'>
      <Title text='Apps detail' />
      <Card sx={{ borderRadius: '20px', marginTop: '1rem', padding: '10px' }}>
        {/* <CardHeader sx={{ flex: '1 0 auto' }}> */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <span className='subtitle-2'>
              <b>Usuario: </b>
              marco.antonio@cloudappi.net
            </span>
          </Grid>
          <Grid item xs={6}>
            <span className='subtitle-2'>
              <b>Fecha de creación: </b>
              12 de Marzo de 2021
            </span>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: '0px' }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <span className='subtitle-2'>
              <b>Descripción</b>
            </span>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              justifyContent='flex-end'
            >
              <Grid item xs={4}>
                <span className='caption'>
                  EDITAR
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: '-25px' }} container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <p className='subtitle-2'>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quas corporis nostrum
              nisi corrupti facere alias ipsa saepe
              beatae voluptatum? Quod expedita culpa aspernatur. Iure placeat impedit aperiam quae ab ea?
            </p>
          </Grid>
        </Grid>
        {/* </CardHeader> */}
      </Card>
      <Card sx={{ borderRadius: '20px', marginTop: '1rem' }}>
        lorems
      </Card>
      <Card sx={{ borderRadius: '20px', marginTop: '1rem' }}>
        lorems
      </Card>
    </Container>
  );
}

export default AppsDetail;
