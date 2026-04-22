import React, { useEffect, useState } from 'react';
import { Box, TextField, IconButton, InputAdornment, Typography, Card, CardContent, Button, MenuItem, Select, InputLabel, FormControl, OutlinedInput, Checkbox, ListItemText, Chip, Divider, CircularProgress, Alert, Tooltip } from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getApimConfigs, generateCredentials, resetGeneratedCredentials } from '../../redux/actions/apimAction';
import { getProductsByUser } from '../../redux/actions/productsAction';
import { createUserCredential } from '../../redux/actions/userCredentialAction';
import styles from './credentials.module.scss';

function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replaceAll('-', '+').replaceAll('_', '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function maskValue(value, show) {
  if (!value) return '';
  return show ? value : '•'.repeat(Math.min(value.length, 16));
}

function SecretField({ label, value = '' }) {
  const [show, setShow] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).catch(err => console.error(err));
  };

  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      variant="outlined"
      value={maskValue(value, show)}
      sx={{ mb: 1 }}
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setShow(v => !v)} edge="end">
                {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
              <IconButton size="small" onClick={handleCopy} edge="end">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

SecretField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

function CreateCredential({ onBack, onCreated }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const apimConfigs = useSelector(state => state.apim.apimConfigs);
  const myProducts = useSelector(state => state.products.myProducts);
  const generatedCredentials = useSelector(state => state.apim.generatedCredentials);
  const loading = useSelector(state => state.apim.generateCredentialsLoading);
  const error = useSelector(state => state.apim.generateCredentialsError);

  const [selectedApim, setSelectedApim] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const tokenData = JSON.parse(localStorage.getItem('token') || sessionStorage.getItem('token') || 'null');
  const accessToken = tokenData?.accessToken;
  const strapiUser = JSON.parse(localStorage.getItem('user') || 'null');
  const strapiUserId = strapiUser?.id;
  const userPrefix = (strapiUser?.username ?? 'user').slice(0, 4).toLowerCase();

  const [credSlug, setCredSlug] = useState(null);

  useEffect(() => {
    dispatch(getApimConfigs());
    dispatch(getProductsByUser());
    return () => {
      dispatch(resetGeneratedCredentials());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedApim || apimConfigs.length === 0) return;
    const firstKong = apimConfigs.find(
      c => c?.configurations?.[0]?.__component === 'config.kong'
    );
    if (firstKong) setSelectedApim(firstKong.documentId);
  }, [apimConfigs, selectedApim]);

  useEffect(() => {
    if (!generatedCredentials || !strapiUserId || !credSlug) return;
    dispatch(createUserCredential({
      slug: credSlug,
      clientId: generatedCredentials.clientId ?? null,
      clientSecret: generatedCredentials.clientSecret ?? null,
      user: strapiUserId,
    }, accessToken));
  }, [generatedCredentials]);

  const isKong = (c) => c?.configurations?.[0]?.__component === 'config.kong';

  const providerProducts = myProducts.filter(prod => prod.providerId === selectedApim);

  const handleGenerate = () => {
    if (!selectedApim || selectedProducts.length === 0) return;
    const slug = `${userPrefix}-${crypto.randomUUID().replaceAll('-', '').slice(0, 16)}`;
    setCredSlug(slug);
    dispatch(generateCredentials(selectedApim, slug, selectedProducts, accessToken));
  };

  const handleFinish = () => {
    dispatch(resetGeneratedCredentials());
    onCreated?.();
    onBack();
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <IconButton onClick={onBack} size="small">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" className={styles.title} sx={{ mb: 0 }}>
            {t('CreateCredential.createCredential')}
          </Typography>
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{t('CreateCredential.selectProvider')}</InputLabel>
          <Select
            value={selectedApim}
            label={t('CreateCredential.selectProvider')}
            onChange={e => {
              setSelectedApim(e.target.value);
              setSelectedProducts([]);
              dispatch(resetGeneratedCredentials());
            }}
          >
            {apimConfigs.map(c => {
              const kong = isKong(c);
              const item = (
                <MenuItem key={c.documentId} value={c.documentId} disabled={!kong}>
                  {c.name}
                </MenuItem>
              );
              if (!kong) {
                return (
                  <Tooltip
                    key={c.documentId}
                    title={t('CreateCredential.providerNotAvailable')}
                    placement="right"
                  >
                    <span>{item}</span>
                  </Tooltip>
                );
              }
              return item;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }} disabled={!selectedApim}>
          <InputLabel>{t('CreateCredential.selectProducts')}</InputLabel>
          <Select
            multiple
            value={selectedProducts}
            onChange={e => setSelectedProducts(e.target.value)}
            input={<OutlinedInput label={t('CreateCredential.selectProducts')} />}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(docId => {
                  const product = providerProducts.find(p => p.documentId === docId);
                  return <Chip key={docId} label={product?.name ?? docId} size="small" />;
                })}
              </Box>
            )}
          >
            {providerProducts.map(product => (
              <MenuItem key={product.documentId} value={product.documentId}>
                <Checkbox checked={selectedProducts.includes(product.documentId)} />
                <ListItemText primary={product.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={loading || !selectedApim || selectedProducts.length === 0 || !!generatedCredentials}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {t('CreateCredential.generateCredentials')}
        </Button>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {generatedCredentials && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Alert severity="success" sx={{ mb: 2 }}>
              {t('CreateCredential.credential')} <strong>{credSlug}</strong> {t('CreateCredential.credentialCreated')}
            </Alert>

            {generatedCredentials.apiKey && (
              <SecretField label="API Key" value={generatedCredentials.apiKey} />
            )}
            <SecretField label={t('CreateCredential.clientId')} value={generatedCredentials.clientId} />
            <SecretField label={t('CreateCredential.clientSecret')} value={generatedCredentials.clientSecret} />

            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleFinish}>
                {t('CreateCredential.goToMyCredentials')}
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

CreateCredential.propTypes = {
  onBack: PropTypes.func.isRequired,
  onCreated: PropTypes.func,
};

CreateCredential.defaultProps = {
  onCreated: undefined,
};

export default CreateCredential;
