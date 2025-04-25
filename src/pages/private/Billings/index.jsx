import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import Title from '../../../components/Title';

import { billingsProducts, billingsLink } from '../../../redux/actions/billingsAction';
import billingService from '../../../services/billingsService';

function Billings() {
  const dispatch = useDispatch();

  const { billings = {}, loading } = useSelector((state) => state.billing);
  const products = billings.data ?? [];

  useEffect(() => {
    if (products.length === 0) {
      dispatch(billingsProducts('Mulesoft'));
    }
  }, [products, dispatch]);

  const handleActivateProduct = (priceId) => {
    const headerManager = 'Mulesoft';

    billingService.billingsLink(priceId, headerManager)
      .then((response) => {
        if (response?.data?.link) {
          window.open(response.data.link, '_blank');
        } else {
          console.error('Error al obtener el link de pago:', response);
        }
      })
      .catch((error) => {
        console.error('Error al activar el producto:', error);
      });
  };

  return (
    <Container fixed sx={{ paddingLeft: { xs: 0, md: '59px' }, paddingRight: { xs: 0, md: '97px' } }}>
      <Title text='Pasarela de pagos' />
      <Grid container spacing={3} mt={2}>
        {products.length > 0 ? (
          products.map((product) => {
            const price = product.prices?.[0] ?? {};
            const priceId = price.id ?? 'N/A';
            const name = product.name ?? product.id;
            const monthlyRequests = price.metadata?.monthlyRequests ?? 'N/A';
            const dailyRequests = price.metadata?.dailyRequests ?? 'N/A';
            const priceFormatted = price.unitAmount ? (price.unitAmount / 100).toFixed(2) : '0.00';

            return (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{name}</Typography>
                    <Typography variant="h4" color="primary">
                      €{priceFormatted} <small>/ mo</small>
                    </Typography>
                    <Box mt={2}>
                      <Typography>{monthlyRequests} API requests</Typography>
                      <Typography>{dailyRequests} transactions</Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() => handleActivateProduct(priceId)}
                    >
                      Activate
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" textAlign="center">
              No hay productos disponibles en este momento.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Billings;
