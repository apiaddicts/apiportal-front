import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Card, CardContent, Box, Typography, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import classes from './product-detail.module.scss';

function ProductDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;

  if (!product) {
    navigate('/developer/products', { replace: true });
    return null;
  }

  const apis = product.library_apis ?? [];

  return (
    <Container fixed className={classes.container}>
      <Box className={classes.header}>
        <IconButton onClick={() => navigate('/developer/products')} size='small'>
          <ArrowBack />
        </IconButton>
        <Typography variant='h5' className={classes.title}>{product.name}</Typography>
      </Box>

      <Card className={classes.card}>
        <CardContent>
          <Typography variant='subtitle2' color='text.secondary' gutterBottom>
            {t('ProductDetail.description')}
          </Typography>
          <Typography variant='body1' className={classes.description}>
            {product.description || t('ProductDetail.noDescription')}
          </Typography>

          <Divider className={classes.divider} />

          <Typography variant='subtitle2' color='text.secondary' gutterBottom>
            {t('ProductDetail.apis')}
          </Typography>

          {apis.length === 0 ? (
            <Typography variant='body2' color='text.disabled'>{t('ProductDetail.noApis')}</Typography>
          ) : (
            <List dense disablePadding>
              {apis.map((api) => (
                <ListItem key={api.documentId ?? api.id} disableGutters>
                  <ListItemText primary={api.title} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetail;
