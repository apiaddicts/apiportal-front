/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

function Dashboard(props) {
  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Current Plan */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Current plan</Typography>
              <Typography variant="h6" color="error">
                2-Day Free Plan
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Quota */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Monthly quota</Typography>
              <Typography variant="h6">100</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* API Calls Used */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">API calls used</Typography>
              <Typography variant="h6">0</Typography>
              <div style={{ height: '10px', background: '#e0e0e0', borderRadius: '5px', marginTop: '8px' }}>
                <div style={{ width: '0%', height: '100%', background: '#3f51b5', borderRadius: '5px' }}></div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Faces in Storage */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Faces in a storage</Typography>
              <Typography variant="h6">0</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Activate Now Button */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="contained" color="primary">
          Activate now
        </Button>
      </div>

      {/* API Calls Chart Placeholder */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>
        API calls
      </Typography>
      <div style={{ height: '300px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          Chart placeholder
        </Typography>
      </div>
    </Container>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
