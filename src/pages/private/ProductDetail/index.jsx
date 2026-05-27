import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container, Card, CardContent, Box, Typography, IconButton, Divider,
  Button, CircularProgress, Alert, Chip, Menu, ListItemIcon, ListItemText,
  FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { ArrowBack, AddCircleOutline, Delete } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import classes from './product-detail.module.scss';

import {
  removeApiFromProduct, resetRemoveApiFromProduct,
  addApiToProduct, resetAddApiToProduct,
  deleteProduct,
} from '../../../redux/actions/productsAction';
import { getKongApis, getAwsApis } from '../../../redux/actions/libraryAction';

function ProductDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const product = state?.product;

  const allKongApis = useSelector(s => s.library.kongApis);
  const allAwsApis  = useSelector(s => s.library.awsApis);
  const {
    removeApiLoading, removeApiError, removeApiSuccess,
    addApiLoading, addApiError, addApiSuccess,
    spinnerDeleteProduct,
  } = useSelector(s => s.products);

  const [currentApis, setCurrentApis] = useState(product?.library_apis ?? []);
  const [removingApiId, setRemovingApiId] = useState(null);
  const [confirmRemoveApi, setConfirmRemoveApi] = useState(null);
  const [showSelector, setShowSelector] = useState(false);
  const [selectedApiId, setSelectedApiId] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [confirmDeleteProduct, setConfirmDeleteProduct] = useState(false);

  useEffect(() => {
    dispatch(getKongApis());
    dispatch(getAwsApis());
    return () => {
      dispatch(resetRemoveApiFromProduct());
      dispatch(resetAddApiToProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    if (removeApiSuccess) {
      setCurrentApis(prev => prev.filter(a => a.documentId !== removingApiId));
      setRemovingApiId(null);
      dispatch(resetRemoveApiFromProduct());
    }
  }, [removeApiSuccess]);

  useEffect(() => {
    if (addApiSuccess) {
      const addedApi = availableApis.find(a => a.documentId === selectedApiId);
      if (addedApi) {
        setCurrentApis(prev => [...prev, { documentId: addedApi.documentId, title: addedApi.title }]);
      }
      setSelectedApiId('');
      setShowSelector(false);
      dispatch(resetAddApiToProduct());
    }
  }, [addApiSuccess]);

  if (!product) {
    navigate('/developer/products', { replace: true });
    return null;
  }

  const apimConfigDocumentId = product.apim_config?.documentId;
  const currentApiIds = new Set(currentApis.map(a => a.documentId));

  const allApis = [...(allKongApis ?? []), ...(allAwsApis ?? [])];
  const availableApis = allApis.filter(
    a => a.apim_config?.documentId === apimConfigDocumentId && !currentApiIds.has(a.documentId),
  );

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleDeleteProductConfirm = () => {
    dispatch(deleteProduct(product.documentId, () => navigate('/developer/products')));
  };

  const handleRemoveApiClick = (api) => {
    setConfirmRemoveApi(api);
  };

  const handleRemoveApiConfirm = () => {
    if (!confirmRemoveApi) return;
    setRemovingApiId(confirmRemoveApi.documentId);
    setConfirmRemoveApi(null);
    dispatch(resetRemoveApiFromProduct());
    dispatch(removeApiFromProduct(product.documentId, confirmRemoveApi.documentId));
  };

  const handleAddApi = () => {
    if (!selectedApiId) return;
    dispatch(addApiToProduct(product.documentId, selectedApiId));
  };

  return (
    <Container fixed className={classes.container}>
      <Box className={classes.header}>
        <IconButton onClick={() => navigate('/developer/products')} size='small'>
          <ArrowBack />
        </IconButton>
        <Typography variant='h5' className={classes.title}>{product.name}</Typography>
        <IconButton size='small' onClick={handleMenuOpen} sx={{ marginLeft: 'auto' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { handleMenuClose(); setConfirmDeleteProduct(true); }}>
          <ListItemIcon><Delete fontSize='small' /></ListItemIcon>
          <ListItemText>{t('Products.delete')}</ListItemText>
        </MenuItem>
      </Menu>

      <Card className={classes.card}>
        <CardContent>
          <Typography variant='subtitle2' color='text.secondary' gutterBottom>
            {t('ProductDetail.provider')}
          </Typography>
          <Typography variant='body1' className={classes.description}>
            {product.apim_config?.name ?? '—'}
          </Typography>

          <Divider className={classes.divider} />

          <Typography variant='subtitle2' color='text.secondary' gutterBottom>
            {t('ProductDetail.description')}
          </Typography>
          <Typography variant='body1' className={classes.description}>
            {product.description || t('ProductDetail.noDescription')}
          </Typography>

          <Divider className={classes.divider} />

          <Box className={classes.section}>
            <Typography variant='subtitle1' className={classes.section_title}>
              {t('ProductDetail.apis')}
            </Typography>

            {currentApis.length === 0 ? (
              <Typography variant='body2' color='text.secondary'>{t('ProductDetail.noApis')}</Typography>
            ) : (
              <Box className={classes.chips}>
                {currentApis.map(api => {
                  const isRemoving = removeApiLoading && removingApiId === api.documentId;
                  return (
                    <Chip
                      key={api.documentId}
                      label={api.title}
                      size='small'
                      disabled={isRemoving}
                      deleteIcon={isRemoving ? <CircularProgress size={14} /> : undefined}
                      onDelete={() => handleRemoveApiClick(api)}
                    />
                  );
                })}
              </Box>
            )}

            {removeApiError && (
              <Alert severity='error' sx={{ mt: 1 }}>{t('ProductDetail.removeError')}</Alert>
            )}
          </Box>

          <Divider className={classes.divider} />

          <Box className={classes.section}>
            <Box className={classes.section_header}>
              <Typography variant='subtitle1' className={classes.section_title}>
                {t('ProductDetail.addApis')}
              </Typography>
              {!showSelector && availableApis.length > 0 && (
                <Button
                  size='small'
                  startIcon={<AddCircleOutline />}
                  onClick={() => { setShowSelector(true); dispatch(resetAddApiToProduct()); }}
                >
                  {t('ProductDetail.add')}
                </Button>
              )}
            </Box>

            {availableApis.length === 0 && !showSelector && (
              <Typography variant='body2' color='text.secondary'>
                {t('ProductDetail.noAvailableApis')}
              </Typography>
            )}

            {showSelector && (
              <Box className={classes.selector_area}>
                <FormControl fullWidth size='small'>
                  <InputLabel>{t('ProductDetail.selectApi')}</InputLabel>
                  <Select
                    value={selectedApiId}
                    onChange={e => setSelectedApiId(e.target.value)}
                    input={<OutlinedInput label={t('ProductDetail.selectApi')} />}
                  >
                    {availableApis.map(api => (
                      <MenuItem key={api.documentId} value={api.documentId}>
                        <Checkbox checked={selectedApiId === api.documentId} />
                        <ListItemText primary={api.title} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box className={classes.selector_actions}>
                  <Button size='small' onClick={() => { setShowSelector(false); setSelectedApiId(''); }}>
                    {t('ProductDetail.cancel')}
                  </Button>
                  <Button
                    variant='contained'
                    size='small'
                    disabled={!selectedApiId || addApiLoading}
                    startIcon={addApiLoading ? <CircularProgress size={14} /> : null}
                    onClick={handleAddApi}
                  >
                    {t('ProductDetail.save')}
                  </Button>
                </Box>
              </Box>
            )}

            {addApiError && (
              <Alert severity='error' sx={{ mt: 1 }}>{t('ProductDetail.addError')}</Alert>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog open={confirmDeleteProduct} onClose={() => setConfirmDeleteProduct(false)}>
        <DialogTitle>{t('Products.deleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Products.deleteConfirm', { name: product.name })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteProduct(false)}>{t('Products.cancel')}</Button>
          <Button
            variant='contained'
            disabled={spinnerDeleteProduct}
            startIcon={spinnerDeleteProduct ? <CircularProgress size={14} /> : null}
            onClick={handleDeleteProductConfirm}
          >
            {t('Products.delete')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!confirmRemoveApi} onClose={() => setConfirmRemoveApi(null)}>
        <DialogTitle>{t('ProductDetail.removeApiTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('ProductDetail.removeApiConfirm', { name: confirmRemoveApi?.title })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmRemoveApi(null)}>{t('ProductDetail.cancel')}</Button>
          <Button variant='contained' onClick={handleRemoveApiConfirm}>
            {t('ProductDetail.remove')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProductDetail;
