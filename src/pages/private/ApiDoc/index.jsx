/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Container, Snackbar, Alert, Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import apiFaceAiService from '../../../services/apiDocsService';
import Spinner from '../../../components/Spinner';
import CodeTabs from './CodeTabs';
import AppSnackbar from '../../../components/Snackbar/Snackbar';


function ApiDoc() {
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const showMessage = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl(null);
    }
  };


  const handleSubmit = async () => {
    try {
      if (!imageFile) {
        showMessage('Por favor selecciona una imagen', 'warning');
        return;
      }

      setLoading(true);
      setResult(null);

      const base64Image = await apiFaceAiService.convertImageToBase64(imageFile);
      // const ejemplo = await apiFaceAiService.getUsersCredentials();
      const response = await apiFaceAiService.processFaceImage(base64Image);
      // consoloe.log('ejemplo', ejemplo);
      setResult(response);

      showMessage('Imagen procesada correctamente ✅', 'success');
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      showMessage('Ocurrió un error. Revisa la consola.', 'error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
      <Typography variant="h4" gutterBottom>
        Recognize People in a Photo
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto...
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: '20px' }} justifyContent="space-between" wrap="nowrap">

        <Grid item size={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Imagen
              </Typography>
              <TextField
                type="file"
                fullWidth
                onChange={handleFileChange}
              />

              {previewUrl && (
                <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      borderRadius: 8,
                      objectFit: 'cover',
                      boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                    }}
                  />
                </Box>
              )}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '20px' }}
                onClick={handleSubmit}
                disabled={loading}
              >
                Realizar solicitud
              </Button>

              {loading && (
                <Box sx={{ marginTop: 2 }}>
                  <Spinner title="Procesando imagen..." />
                </Box>
              )}

              {result && !loading && (
                <Box sx={{ marginTop: 3 }}>
                  <Typography variant="subtitle2">Respuesta:</Typography>
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: '#f0f0f0',
                      padding: 2,
                      borderRadius: 1,
                      maxHeight: 300,
                      overflowY: 'auto',
                      fontSize: '0.85rem',
                    }}
                  >
                    {JSON.stringify(result, null, 2)}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item size={6}>
          <Card>
            <CardContent>
              <CodeTabs />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

    </Container>

  );
}

export default ApiDoc;
