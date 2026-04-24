import React, { useEffect, useState } from 'react';
import { Box, TextField, IconButton, InputAdornment, Typography, Card, CardContent, Button, MenuItem, Select, InputLabel,   FormControl, OutlinedInput, Checkbox, ListItemText, Chip, Divider, CircularProgress, Alert, Tooltip } from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getApimConfigs, generateCredentials, resetGeneratedCredentials } from '../../../redux/actions/apimAction';
import { getProductsByUser } from '../../../redux/actions/productsAction';
import { createUserCredential } from '../../../redux/actions/userCredentialAction';
import styles from './credentials.module.scss';

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
      size='small'
      label={label}
      variant='outlined'
      value={maskValue(value, show)}
      className={styles.secret_field}
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton size='small' onClick={() => setShow(v => !v)} edge='end'>
                {show ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
              </IconButton>
              <IconButton size='small' onClick={handleCopy} edge='end'>
                <ContentCopyIcon fontSize='small' />
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
  const [credentialType, setCredentialType] = useState('oauth2');

  const tokenData = JSON.parse(localStorage.getItem('token') || sessionStorage.getItem('token') || 'null');
  const accessToken = tokenData?.accessToken;
  const strapiUser = JSON.parse(localStorage.getItem('user') || 'null');
  const strapiUserId = strapiUser?.id;
  const userPrefix = (strapiUser?.username ?? 'user').slice(0, 6).toLowerCase();

  const [credSlug, setCredSlug] = useState(null);

  useEffect(() => {
    dispatch(getApimConfigs());
    dispatch(getProductsByUser());
    return () => { dispatch(resetGeneratedCredentials()); };
  }, [dispatch]);

  useEffect(() => {
    if (selectedApim || apimConfigs.length === 0) return;
    const firstEnabled = apimConfigs.find(
      c => c?.configurations?.[0]?.__component === 'config.kong' &&
           myProducts.some(p => p.apim_config?.documentId === c.documentId)
    );
    if (firstEnabled) setSelectedApim(firstEnabled.documentId);
  }, [apimConfigs, selectedApim, myProducts]);

  useEffect(() => {
    if (!generatedCredentials || !strapiUserId || !credSlug) return;
    dispatch(createUserCredential({
      slug: credSlug,
      type: credentialType,
      clientId: generatedCredentials.clientId ?? null,
      clientSecret: generatedCredentials.clientSecret ?? null,
      apiKey: generatedCredentials.apiKey ?? null,
      user: strapiUserId,
      apim_config: { connect: [{ documentId: selectedApim }] },
      products: selectedProducts,
    }, accessToken));
  }, [generatedCredentials]);

  const isKong = c => c?.configurations?.[0]?.__component === 'config.kong';
  const providerProducts = myProducts.filter(prod => prod.apim_config?.documentId === selectedApim);

  const productCountFor = docId => myProducts.filter(p => p.apim_config?.documentId === docId).length;

  const handleGenerate = () => {
    if (!selectedApim || selectedProducts.length === 0) return;
    const slug = `${userPrefix}-${crypto.randomUUID().replaceAll('-', '').slice(0, 16)}`;
    setCredSlug(slug);
    dispatch(generateCredentials(selectedApim, slug, selectedProducts, accessToken, credentialType));
  };

  const handleFinish = () => {
    dispatch(resetGeneratedCredentials());
    onCreated?.();
    onBack();
  };

  return (
    <Card className={styles.card}>
      <CardContent>
        <Box className={styles.form_header}>
          <IconButton onClick={onBack} size='small'>
            <ArrowBack />
          </IconButton>
          <Typography variant='h6' className={styles.title}>
            {t('CreateCredential.createCredential')}
          </Typography>
        </Box>

        <FormControl fullWidth className={styles.field}>
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
              const count = productCountFor(c.documentId);
              const disabled = !kong || count === 0;
              const item = (
                <MenuItem key={c.documentId} value={c.documentId} disabled={disabled}>
                  {c.name} - {t('CreateCredential.productCount', { count })}
                </MenuItem>
              );
              if (disabled) {
                const tooltip = kong ? '' : t('CreateCredential.providerNotAvailable');
                return (
                  <Tooltip key={c.documentId} title={tooltip} placement='right'>
                    <span>{item}</span>
                  </Tooltip>
                );
              }
              return item;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth className={styles.field} disabled={!selectedApim || !!generatedCredentials}>
          <InputLabel>{t('CreateCredential.selectCredentialType')}</InputLabel>
          <Select
            value={credentialType}
            label={t('CreateCredential.selectCredentialType')}
            onChange={e => {
              setCredentialType(e.target.value);
              dispatch(resetGeneratedCredentials());
            }}
          >
            <MenuItem value='oauth2'>{t('CreateCredential.typeOauth2')}</MenuItem>
            <MenuItem value='apiKey'>{t('CreateCredential.typeApiKey')}</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth className={styles.field_last} disabled={!selectedApim}>
          <InputLabel>{t('CreateCredential.selectProducts')}</InputLabel>
          <Select
            multiple
            value={selectedProducts}
            onChange={e => setSelectedProducts(e.target.value)}
            input={<OutlinedInput label={t('CreateCredential.selectProducts')} />}
            renderValue={selected => (
              <Box className={styles.chips_wrapper}>
                {selected.map(docId => {
                  const product = providerProducts.find(p => p.documentId === docId);
                  return <Chip key={docId} label={product?.name ?? docId} size='small' />;
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
          variant='contained'
          onClick={handleGenerate}
          disabled={loading || !selectedApim || selectedProducts.length === 0 || !!generatedCredentials}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {t('CreateCredential.generateCredentials')}
        </Button>

        {error && (
          <Alert severity='error' className={styles.alert_error}>
            {error}
          </Alert>
        )}

        {generatedCredentials && (
          <Box className={styles.credentials_result}>
            <Divider className={styles.divider} />
            <Alert severity='success' className={styles.alert_success}>
              {t('CreateCredential.credential')} <strong>{t('CreateCredential.credentialCreated')}</strong>
            </Alert>

            {credentialType === 'apiKey' ? (
              <SecretField label='API Key' value={generatedCredentials.apiKey} />
            ) : (
              <>
                <SecretField label={t('CreateCredential.clientId')} value={generatedCredentials.clientId} />
                <SecretField label={t('CreateCredential.clientSecret')} value={generatedCredentials.clientSecret} />
              </>
            )}

            <Box className={styles.finish_btn}>
              <Button variant='contained' onClick={handleFinish}>
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