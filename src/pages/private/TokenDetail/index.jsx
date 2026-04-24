import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Card, CardContent, Box, Typography, Button, Divider,
  CircularProgress, Alert, IconButton, Chip, Checkbox, ListItemText,
  MenuItem, Select, InputLabel, FormControl, OutlinedInput,
} from '@mui/material';
import { ArrowBack, AddCircleOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { getUserCredential, addProductsToCredential, resetAddProducts } from '../../../redux/actions/userCredentialAction';
import { getProductsByUser } from '../../../redux/actions/productsAction';
import classes from './token-detail.module.scss';

function TokenDetail() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documentId } = useParams();

  const tokenData = JSON.parse(localStorage.getItem('token') || sessionStorage.getItem('token') || 'null');
  const accessToken = tokenData?.accessToken;

  const { currentCredential, currentCredentialLoading, currentCredentialError, addProductsLoading, addProductsError, addProductsSuccess } = useSelector(s => s.userCredential);
  const myProducts = useSelector(s => s.products.myProducts);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    dispatch(getUserCredential(documentId, accessToken));
    dispatch(getProductsByUser());
    return () => { dispatch(resetAddProducts()); };
  }, [dispatch, documentId]);

  useEffect(() => {
    if (addProductsSuccess) {
      setSelectedProducts([]);
      setShowSelector(false);
    }
  }, [addProductsSuccess]);

  if (currentCredentialLoading) {
    return (
      <Container fixed className={classes.container}>
        <Box className={classes.loading}><CircularProgress /></Box>
      </Container>
    );
  }

  if (currentCredentialError || !currentCredential) {
    return (
      <Container fixed className={classes.container}>
        <Typography color='error'>{t('TokenDetail.errorLoading')}</Typography>
      </Container>
    );
  }

  const cred = currentCredential;
  const apimConfigDocumentId = cred.apim_config?.documentId;

  const linkedProductIds = new Set((cred.products ?? []).map(p => p.documentId));

  const availableProducts = myProducts.filter(
    p => p.apim_config?.documentId === apimConfigDocumentId && !linkedProductIds.has(p.documentId),
  );

  const handleAddProducts = () => {
    if (selectedProducts.length === 0 || !apimConfigDocumentId) return;
    dispatch(addProductsToCredential(documentId, selectedProducts, apimConfigDocumentId, accessToken));
  };

  return (
    <Container fixed className={classes.container}>
      <Box className={classes.header}>
        <IconButton onClick={() => navigate('/developer/tokens')} size='small'>
          <ArrowBack />
        </IconButton>
        <Typography variant='h5' className={classes.title}>
          {t('TokenDetail.title')}
        </Typography>
      </Box>

      <Card className={classes.card}>
        <CardContent className={classes.card_content}>

          <Box className={classes.info_section}>
            <Box className={classes.info_row}>
              <Typography variant='body2' className={classes.label}>{t('TokenDetail.credentialId')}</Typography>
              <Typography variant='body1' className={classes.value}>{cred.slug}</Typography>
            </Box>
            {cred.clientId && (
              <Box className={classes.info_row}>
                <Typography variant='body2' className={classes.label}>{t('TokenDetail.clientId')}</Typography>
                <Typography variant='body1' className={classes.value}>{cred.clientId}</Typography>
              </Box>
            )}
          </Box>

          <Divider className={classes.divider} />

          <Box className={classes.section}>
            <Typography variant='subtitle1' className={classes.section_title}>
              {t('TokenDetail.products')}
            </Typography>
            {(cred.products ?? []).length === 0 ? (
              <Typography variant='body2' color='text.secondary'>{t('TokenDetail.noProducts')}</Typography>
            ) : (
              <Box className={classes.chips}>
                {(cred.products ?? []).map(p => (
                  <Chip key={p.documentId} label={p.name} size='small' />
                ))}
              </Box>
            )}
          </Box>

          <Divider className={classes.divider} />

          {/* Add products section */}
          <Box className={classes.section}>
            <Box className={classes.section_header}>
              <Typography variant='subtitle1' className={classes.section_title}>
                {t('TokenDetail.addProducts')}
              </Typography>
              {!showSelector && availableProducts.length > 0 && (
                <Button
                  size='small'
                  startIcon={<AddCircleOutline />}
                  onClick={() => { setShowSelector(true); dispatch(resetAddProducts()); }}
                >
                  {t('TokenDetail.addPermissions')}
                </Button>
              )}
            </Box>

            {availableProducts.length === 0 && !showSelector && (
              <Typography variant='body2' color='text.secondary'>
                {t('TokenDetail.noAvailableProducts')}
              </Typography>
            )}

            {showSelector && (
              <Box className={classes.selector_area}>
                <FormControl fullWidth size='small'>
                  <InputLabel>{t('TokenDetail.selectProducts')}</InputLabel>
                  <Select
                    multiple
                    value={selectedProducts}
                    onChange={e => setSelectedProducts(e.target.value)}
                    input={<OutlinedInput label={t('TokenDetail.selectProducts')} />}
                    renderValue={selected => (
                      <Box className={classes.chips}>
                        {selected.map(docId => {
                          const product = availableProducts.find(p => p.documentId === docId);
                          return <Chip key={docId} label={product?.name ?? docId} size='small' />;
                        })}
                      </Box>
                    )}
                  >
                    {availableProducts.map(product => (
                      <MenuItem key={product.documentId} value={product.documentId}>
                        <Checkbox checked={selectedProducts.includes(product.documentId)} />
                        <ListItemText primary={product.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box className={classes.selector_actions}>
                  <Button size='small' onClick={() => { setShowSelector(false); setSelectedProducts([]); }}>
                    {t('TokenDetail.cancel')}
                  </Button>
                  <Button
                    variant='contained'
                    size='small'
                    disabled={selectedProducts.length === 0 || addProductsLoading}
                    startIcon={addProductsLoading ? <CircularProgress size={14} /> : null}
                    onClick={handleAddProducts}
                  >
                    {t('TokenDetail.save')}
                  </Button>
                </Box>
              </Box>
            )}

            {addProductsError && (
              <Alert severity='error' className={classes.alert}>
                {addProductsError}
              </Alert>
            )}
            {addProductsSuccess && (
              <Alert severity='success' className={classes.alert}>
                {t('TokenDetail.addSuccess')}
              </Alert>
            )}
          </Box>

        </CardContent>
      </Card>
    </Container>
  );
}

export default TokenDetail;
