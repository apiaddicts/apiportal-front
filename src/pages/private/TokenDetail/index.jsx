import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Card, CardContent, Box, Typography, Button, Divider,
  CircularProgress, Alert, IconButton, Chip, Checkbox, ListItemText,
  MenuItem, Select, InputLabel, FormControl, OutlinedInput,
  Tooltip, Dialog, DialogTitle, Menu, ListItemIcon,
  DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { ArrowBack, AddCircleOutline, Delete } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslation } from 'react-i18next';

import {
  getUserCredential,
  addProductsToCredential,
  resetAddProducts,
  removeProductsFromCredential,
  resetRemoveProducts,
  deleteCredential,
} from '../../../redux/actions/userCredentialAction';
import { getProductsByUser } from '../../../redux/actions/productsAction';
import classes from './token-detail.module.scss';

function SecretField({ value = '' }) {
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).catch(err => console.error(err));
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant='body1' className={classes.value} sx={{ fontFamily: 'monospace' }}>
        {value ? value.slice(0, 5) + '•'.repeat(10) : '—'}
      </Typography>
      <Tooltip title='Copy'>
        <IconButton size='small' onClick={handleCopy}>
          <ContentCopyIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

function TokenDetail() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documentId } = useParams();

  const tokenData = JSON.parse(localStorage.getItem('token') || sessionStorage.getItem('token') || 'null');
  const accessToken = tokenData?.accessToken;

  const {
    currentCredential, currentCredentialLoading, currentCredentialError,
    addProductsLoading, addProductsError, addProductsSuccess,
    removeProductsLoading, removeProductsError, removeProductsSuccess,
    deleteLoading,
  } = useSelector(s => s.userCredential);
  const myProducts = useSelector(s => s.products.myProducts);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showSelector, setShowSelector] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmRemoveProduct, setConfirmRemoveProduct] = useState(null);
  const [removingProductId, setRemovingProductId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    dispatch(getUserCredential(documentId, accessToken));
    dispatch(getProductsByUser());
    return () => {
      dispatch(resetAddProducts());
      dispatch(resetRemoveProducts());
    };
  }, [dispatch, documentId]);

  useEffect(() => {
    if (addProductsSuccess) {
      setSelectedProducts([]);
      setShowSelector(false);
    }
  }, [addProductsSuccess]);

  useEffect(() => {
    if (removeProductsSuccess) {
      setRemovingProductId(null);
      dispatch(resetRemoveProducts());
    }
  }, [removeProductsSuccess]);

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

  const handleRemoveProductClick = (product) => {
    setConfirmRemoveProduct(product);
  };

  const handleRemoveProductConfirm = () => {
    if (!confirmRemoveProduct) return;
    setRemovingProductId(confirmRemoveProduct.documentId);
    setConfirmRemoveProduct(null);
    dispatch(removeProductsFromCredential(documentId, [confirmRemoveProduct.documentId], apimConfigDocumentId, accessToken));
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteCredential(documentId, accessToken, () => navigate('/developer/tokens')));
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
        <IconButton size='small' onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ marginLeft: 'auto' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { setMenuAnchor(null); setConfirmDelete(true); }}>
          <ListItemIcon><Delete fontSize='small' /></ListItemIcon>
          <ListItemText>{t('TokenDetail.delete')}</ListItemText>
        </MenuItem>
      </Menu>

      <Card className={classes.card}>
        <CardContent className={classes.card_content}>

          <Box className={classes.info_section}>
            <Box className={classes.info_row}>
              <Typography variant='body2' className={classes.label}>{t('TokenDetail.provider')}</Typography>
              <Typography variant='body1' className={classes.value}>{cred.apim_config?.name ?? '—'}</Typography>
            </Box>
            <Box className={classes.info_row}>
              <Typography variant='body2' className={classes.label}>{t('TokenDetail.type')}</Typography>
              <Typography variant='body1' className={classes.value}>{cred.type}</Typography>
            </Box>
            {cred.type === 'apiKey' && cred.apiKey && (
              <Box className={classes.info_row}>
                <Typography variant='body2' className={classes.label}>{t('TokenDetail.apiKey')}</Typography>
                <SecretField value={cred.apiKey} />
              </Box>
            )}
            {cred.type === 'oauth2' && cred.clientId && (
              <Box className={classes.info_row}>
                <Typography variant='body2' className={classes.label}>{t('TokenDetail.clientId')}</Typography>
                <SecretField value={cred.clientId} />
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
                {(cred.products ?? []).map(p => {
                  const isRemoving = removeProductsLoading && removingProductId === p.documentId;
                  return (
                    <Chip
                      key={p.documentId}
                      label={p.name}
                      size='small'
                      disabled={isRemoving}
                      deleteIcon={isRemoving ? <CircularProgress size={14} /> : undefined}
                      onDelete={() => handleRemoveProductClick(p)}
                    />
                  );
                })}
              </Box>
            )}
            {removeProductsError && (
              <Alert severity='error' sx={{ mt: 1 }}>{removeProductsError}</Alert>
            )}
            {removeProductsSuccess && (
              <Alert severity='success' sx={{ mt: 1 }}>{t('TokenDetail.removeSuccess')}</Alert>
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
                  {t('TokenDetail.add')}
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
                    {availableProducts.map(product => {
                      const apiCount = product.library_apis?.length ?? 0;
                      const disabled = apiCount === 0;
                      return (
                        <MenuItem key={product.documentId} value={product.documentId} disabled={disabled}>
                          <Checkbox checked={selectedProducts.includes(product.documentId)} disabled={disabled} />
                          <ListItemText
                            primary={product.name}
                            secondary={`${apiCount} API${apiCount === 1 ? '' : 's'}`}
                          />
                        </MenuItem>
                      );
                    })}
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
              <Alert severity='error' className={classes.alert}>{addProductsError}</Alert>
            )}
            {addProductsSuccess && (
              <Alert severity='success' className={classes.alert}>{t('TokenDetail.addSuccess')}</Alert>
            )}
          </Box>

        </CardContent>
      </Card>

      <Dialog open={!!confirmRemoveProduct} onClose={() => setConfirmRemoveProduct(null)}>
        <DialogTitle>{t('TokenDetail.removeProductTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('TokenDetail.removeProductConfirm', { name: confirmRemoveProduct?.name })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmRemoveProduct(null)}>{t('TokenDetail.cancel')}</Button>
          <Button variant='contained' onClick={handleRemoveProductConfirm}>
            {t('TokenDetail.remove')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>{t('TokenDetail.deleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('TokenDetail.deleteConfirm')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>{t('TokenDetail.cancel')}</Button>
          <Button
            variant='contained'
            disabled={deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={14} /> : null}
            onClick={handleDeleteConfirm}
          >
            {t('TokenDetail.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TokenDetail;
