/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Container, Snackbar, Alert, Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import apiFaceAiService from '../../../services/apiDocsService';
import Spinner from '../../../components/Spinner';
import CodeTabs from './CodeTabs';
import AppSnackbar from '../../../components/Snackbar/Snackbar';


function ApiDoc() {
  const { t } = useTranslation();

  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [bboxes, setBboxes] = useState(`[
    [0, 231, 300, 355, 424]
  ]`);

  const [landmarks, setLandmarks] = useState('');

  const [emotions, setEmotions] = useState('');

  const [models, setModels] = useState(`{
    "landmarks": "mediapipe",
    "emotions": "ferKpN",
    "kpiEmotional": "default",
    "kpiAttentional": "default",
    "kpiComposed": "default"
  }`);

  const showMessage = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message: t(message), // Translate the message
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
      setLoading(true);
      setResult(null);

      let base64Image = null;
      if (imageFile) {
        base64Image = await apiFaceAiService.convertImageToBase64(imageFile);
      }

      const payload = {};
      if (base64Image) payload.image = base64Image;

      if (bboxes) payload.bboxes = JSON.parse(bboxes);
      else if (models) {
        const parsed = JSON.parse(models);
        if (parsed.bboxes) payload.models = { ...payload.models, bboxes: parsed.bboxes };
      }

      if (landmarks) payload.landmarks = JSON.parse(landmarks);
      else if (models) {
        const parsed = JSON.parse(models);
        if (parsed.landmarks) payload.models = { ...payload.models, landmarks: parsed.landmarks };
      }

      if (emotions) payload.emotions = JSON.parse(emotions);
      else if (models) {
        const parsed = JSON.parse(models);
        if (parsed.emotions) payload.models = { ...payload.models, emotions: parsed.emotions };
      }


      if (models) {
        const parsed = JSON.parse(models);
        payload.models = {
          ...payload.models,
          ...(parsed.kpiEmotional && { kpiEmotional: parsed.kpiEmotional }),
          ...(parsed.kpiAttentional && { kpiAttentional: parsed.kpiAttentional }),
          ...(parsed.kpiComposed && { kpiComposed: parsed.kpiComposed }),
        };
      }

      const response = await apiFaceAiService.processFaceImage(payload);

      if (response?.errors) {
        setResult(response);
        showMessage(`Error al procesar la solicitud ❌`, 'error');
        return;
      }

      setResult(response);
      showMessage('Imagen procesada correctamente ✅', 'success');
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      showMessage('Error inesperado', 'error');
    } finally {
      setLoading(false);
    }
  };



  return (
    <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' }, paddingTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        {t('recognizePeople')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('loremIpsum')}
      </Typography>

      <Grid container justifyContent="space-between" wrap="nowrap">

        <Grid item size={6}>
          <Card>
            <CardContent sx={{ maxHeight: '500px', overflowY: 'auto' }}>
              <Typography variant="subtitle1" gutterBottom>
                {t('image')}
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

              <Typography variant="subtitle1" gutterBottom>
                {t('jsonData')}
              </Typography>

              <TextField
                label={t('bboxes')}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={bboxes}
                onChange={(e) => setBboxes(e.target.value)}
              />

              <TextField
                label={t('landmarks')}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={landmarks}
                onChange={(e) => setLandmarks(e.target.value)}
              />


              <TextField
                label={t('emotions')}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={emotions}
                onChange={(e) => setEmotions(e.target.value)}
              />

              <TextField
                label={t('models')}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={models}
                onChange={(e) => setModels(e.target.value)}
              />


              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '20px' }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {t('submitRequest')}
              </Button>

              {loading && (
                <Box sx={{ marginTop: 2 }}>
                  <Spinner title={t('processingImage')} />
                </Box>
              )}

              {result && !loading && (
                <Box sx={{ marginTop: 3 }}>
                  <Typography variant="subtitle2">{t('response')}</Typography>
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
            <CardContent sx={{ maxHeight: '500px', overflowY: 'auto' }}>
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
