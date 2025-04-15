/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';

function ApiDoc() {
  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
      <Typography variant="h4" gutterBottom>
        Recognize People in a Photo
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: '20px' }} justifyContent="space-between">

        {/* File Upload Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Imagen
              </Typography>
              <TextField
                type="file"
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: 'image/*' }}
              />
              <Typography variant="body2" color="primary" sx={{ marginTop: '10px', cursor: 'pointer' }}>
                Show optional parameters
              </Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '20px' }}>
                Perform request
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Code Example Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="subtitle1">Python</Typography>
                <Button variant="outlined" size="small">
                  Copy the code
                </Button>
              </Box>
              <Box
                component="pre"
                sx={{
                  backgroundColor: '#f5f5f5',
                  padding: '10px',
                  borderRadius: '5px',
                  overflowX: 'auto',
                  fontSize: '0.875rem',
                }}
              >
                {`#!/usr/bin/env python3
import requests

# Request data
data = {
  "collections": "",
}
# Request files
files = {
  "photo": open("", "rb"),
}
# Endpoint URL
url = "https://api.cloudappi.net/photo/search/v2"

# Request headers
headers = {
  "token": "1abfd168cb149cfa93ce5fff67afe03",
}

# Making the POST request
response = requests.request("POST", url, headers=headers, data=data, files=files)

# Printing the response
print(response.text.encode('utf8'))`}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ApiDoc;
