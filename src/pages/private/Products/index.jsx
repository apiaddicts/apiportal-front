import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayersIcon from '@mui/icons-material/Layers';
import { getProductsByUser } from '../../../redux/actions/productsAction';
import Title from '../../../components/Title';
import CreateProduct from './CreateProduct';
import classes from './products.module.scss';

function Products() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);

  const { myProducts, spinnerMyProducts, errorMyProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsByUser());
  }, []);

  const handleClickRow = (slug) => navigate(`/developer/products/${slug}`);
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
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Products.description')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Products.status')}</Typography></TableCell>
                  <TableCell><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{t('Products.apis')}</Typography></TableCell>
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
                      onClick={() => handleClickRow(product.slug)}
                    >
                      <TableCell>
                        <p className={classes.cell_name}>{product.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className={classes.cell_description}>
                          {product.description || '—'}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className={classes.cell_description}>
                          {product.isActive ? t('Products.active') : t('Products.inactive')}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className={classes.cell_description}>
                          {apis.length} API{apis.length === 1 ? '' : 's'}
                        </p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Container>
  );
}

export default Products;