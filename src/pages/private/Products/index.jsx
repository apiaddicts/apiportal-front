import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Box, Typography, CircularProgress, IconButton, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Menu, MenuItem, ListItemIcon, ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayersIcon from '@mui/icons-material/Layers';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getProductsByUser, deleteProduct } from '../../../redux/actions/productsAction';
import Title from '../../../components/Title';
import CreateProduct from './CreateProduct';
import classes from './products.module.scss';

function Products() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuProduct, setMenuProduct] = useState(null);

  const { myProducts, spinnerMyProducts, errorMyProducts, spinnerDeleteProduct } = useSelector((state) => state.products);

  const handleMenuOpen = (e, product) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget);
    setMenuProduct(product);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuProduct(null);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(menuProduct);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (!confirmDelete) return;
    dispatch(deleteProduct(confirmDelete.documentId, () => setConfirmDelete(null)));
  };

  useEffect(() => {
    dispatch(getProductsByUser());
  }, []);

  const handleClickRow = (product) => navigate(`/developer/products/${product.slug}`, { state: { product } });
  const handleCreate   = ()     => setShowCreate(true);

  if (showCreate) {
    return (
      <Container fixed className={classes.container}>
        <CreateProduct onBack={() => { setShowCreate(false); dispatch(getProductsByUser()); }} />
      </Container>
    );
  }

  if (spinnerMyProducts) {
    return (
      <Container fixed className={classes.container}>
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (errorMyProducts && Object.keys(errorMyProducts).length > 0) {
    return (
      <Container fixed className={classes.container}>
        <Typography color='error'>{t('Products.errorLoading')}</Typography>
      </Container>
    );
  }

  return (
    <Container fixed className={classes.container}>

      <Box className={classes.header}>
        <Title text={t('Products.title')} />
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleCreate}
          className={classes.btn_create}
        >
          {t('Products.newProduct')}
        </Button>
      </Box>

      {myProducts.length === 0 ? (
        <Card className={classes.card}>
          <Box className={classes.empty_state}>
            <LayersIcon className={classes.empty_icon} />
            <Typography variant='h6' color='text.secondary'>
              {t('Products.noProducts')}
            </Typography>
            <Typography variant='body2' color='text.disabled'>
              {t('Products.noProductsDescription')}
            </Typography>
            <Button variant='outlined' startIcon={<AddIcon />} onClick={handleCreate}>
              {t('Products.createProduct')}
            </Button>
          </Box>
        </Card>
      ) : (
        <Card className={classes.card}>
          <TableContainer>
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Products.name')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Products.provider')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Products.description')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Products.apis')}</Typography></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {myProducts.map((product) => {
                  const apis = product.library_apis ?? [];
                  return (
                    <TableRow
                      key={product.id}
                      hover
                      className={classes.row}
                      onClick={() => handleClickRow(product)}
                    >
                      <TableCell>
                        <p className={classes.cell_name}>{product.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className={classes.cell_description}>
                          {product.apim_config?.name ?? '—'}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className={classes.cell_description}>
                          {product.description || '—'}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className={classes.cell_description}>
                          {apis.length} API{apis.length === 1 ? '' : 's'}
                        </p>
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton size='small' onClick={(e) => handleMenuOpen(e, product)}>
                          <MoreVertIcon fontSize='small' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon><DeleteIcon fontSize='small' /></ListItemIcon>
          <ListItemText>{t('Products.delete')}</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>{t('Products.deleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Products.deleteConfirm', { name: confirmDelete?.name })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>{t('Products.cancel')}</Button>
          <Button
            variant='contained'
            disabled={spinnerDeleteProduct}
            startIcon={spinnerDeleteProduct ? <CircularProgress size={14} /> : null}
            onClick={handleDeleteConfirm}
          >
            {t('Products.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Products;
