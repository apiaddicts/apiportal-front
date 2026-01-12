import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import Title from '../../../components/Title';
import { useTranslation } from 'react-i18next';

import { billingsProducts, billingsLink } from '../../../redux/actions/billingsAction';
import billingService from '../../../services/billingsService';

import classes from './billing.module.scss';

function Billings() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { billings = {}, loading } = useSelector((state) => state.billing);
  const products = billings.data ?? [];

  useEffect(() => {
    if (!billings.data || billings.data.length === 0) {
      dispatch(billingsProducts('Mulesoft'));
    }
  }, [dispatch]);

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
    <Container fixed sx={{ paddingLeft: { xs: 0, md: '59px' }, paddingRight: { xs: 0, md: '97px' }, paddingTop: '50px' }}>
      <Title text={t('Billings.choosePlan')} />
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
                <Card className={classes.cardContainer}>
                  <div className={classes.cardHeader}>{name}</div>

                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.priceText}>
                      {priceFormatted}€ <small className={classes.priceSmall}>/ mes</small>
                    </Typography>
                    <Box className={classes.detailsText}>
                      <Typography>{monthlyRequests} {t('Billings.monthlyRequests')}</Typography>
                      <Typography>{dailyRequests} {t('Billings.dailyRequests')}</Typography>
                    </Box>
                  </CardContent>

                  <Button
                    variant="contained"
                    className={classes.activateButton}
                    onClick={() => handleActivateProduct(priceId)}
                  >
                    {t('Billings.activate')}
                  </Button>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" textAlign="center">
              {t('Billings.noProducts')}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Billings;
 