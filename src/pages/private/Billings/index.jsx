import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import Title from '../../../components/Title';
import billingService from '../../../services/billingsService';
import { useDispatch } from 'react-redux';
import usersConstants from '../../../redux/constants/userConstats'; // Ajusta si es necesario


function Billings() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    billingService.billingsProducts()
      .then((producto) => {
        setProducts(producto);
      })
      .catch((err) => {
        console.error('Error al obtener productos:', err);

        // Despachar alerta por error
        dispatch({
          type: usersConstants.SHOW_ALERT,
          payload: {
            alert_type: 'alert__danger',
            title: 'Error al cargar productos',
            msg: 'No se pudieron obtener los productos de la pasarela de pagos.',
          },
        });

        // Cerrar automáticamente después de 5 segundos
        setTimeout(() => {
          dispatch({ type: usersConstants.RESET_ALERT });
        }, 5000);
      });
  }, []);

  const handleActivateProduct = async (priceId) => {
    try {
      const response = await billingService.billingsLink(priceId);
      if (response?.link) {
        window.open(response.link, '_blank');
      } else {
        console.error('No se recibió una URL válida');
      }
    } catch (error) {
      console.error('Error al activar prueba:', error);
    }
  };

  return (
    <Container fixed sx={{ paddingLeft: { xs: 0, md: '59px' }, paddingRight: { xs: 0, md: '97px' } }}>
      <Title text='Pasarela de pagos' />
      <Grid container spacing={3} mt={2}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => {
            const price = product.prices?.[0] ?? {};
            const monthlyRequests = price.metadata?.monthlyRequests ?? 'N/A';
            const dailyRequests = price.metadata?.dailyRequests ?? 'N/A';
            const priceFormatted = price.unitAmount ? (price.unitAmount / 100).toFixed(2) : '0.00';

            return (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{product.name}</Typography>
                    <Typography variant="h4" color="primary">${priceFormatted} <small>/ mo</small></Typography>
                    <Box mt={2}>
                      <Typography>{monthlyRequests} API requests</Typography>
                      <Typography>{dailyRequests} transactions / minute</Typography>
                      <Typography>7-day free trial</Typography>
                      <Typography>Cancel anytime</Typography>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() => handleActivateProduct(price.id)}
                    >
                      Activate
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography variant="body1" color="textSecondary">
            No hay productos disponibles en este momento.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Billings;
