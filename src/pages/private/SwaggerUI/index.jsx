/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SwaggerUi from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

import { Container } from '@mui/material';
import Icon from '../../../components/MdIcon/Icon';
import libraryService from '../../../services/libraryService';
// import appsService from '../../../services/appsService';
//import apiService from '../../../services/apiService';
import subscriptionsService from '../../../services/subscriptionsService';
//import productService from '../../../services/productsService';
import classes from './swagger-ui.module.scss';
import Select from '../../../components/Input/InputUI/Select';
import SkeletonComponent from '../../../components/SkeletonComponent/SkeletonComponent';
// import config from '../../../services/config';

function SwaggerUI() {

  const { user } = useSelector((state) => state.user);
  const [openApi, setOpenApi] = useState();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionSecrets, setSubscriptionSecrets] = useState([]);
  const [swaggerUi, setSwaggerUi] = useState();

  /*const LogoutPlugin = () => ({
    statePlugins: {
      auth: {
        wrapActions: {
          logout: (oriAction) => (keys) => {
            // here, you can do the logout request.
            console.log('Logout from following securities:', keys);
            return oriAction(keys); // don't forget! otherwise, Swagger UI won't logout
          },
        },
      },
    },
  });*/

  useEffect(() => {
    libraryService.getApiOpenAPI(params.id).then((jsonOpenApi) => {
      setOpenApi(jsonOpenApi);
      const swaggerUi = SwaggerUi({
        dom_id: '#swaggerContainer',
        spec: jsonOpenApi,
        presets: [SwaggerUi.presets.apis],
        //plugins: [LogoutPlugin],
        oauth2RedirectUrl: `${window.location.protocol}//${window.location.host}/developer/apis/swagger-ui/oauth-redirect`,
        persistAuthorization: true,
      });
      setSwaggerUi(swaggerUi);
    });

    if (Object.keys(user).length > 0) {
      libraryService.getApiProducts(params.id).then((productList) => {
        const products = productList && Object.keys(productList).length > 0 ? productList.value.map((product) => {
          const prodItem = {
            ...product.properties,
            id: product.name,
            value: product.name,
            text: product.properties.displayName,
          };
          return prodItem;
        }) : [];
        setProducts(products);

        subscriptionsService.listUserSubscriptions(user.name).then((subscriptionList) => {
          const subscriptions = subscriptionList && Object.keys(subscriptionList).length > 0 ? subscriptionList.value.filter((subscription) => {
            return (subscription.properties.state !== 'cancelled' && products.some((product) => subscription.properties.scope.includes(product.id)));
          }).map((subscription) => {
            const subscriptionItem = {
              ...subscription.properties,
              id: subscription.name,
              value: subscription.name,
              text: subscription.properties.displayName,
            };
            return subscriptionItem;
          }) : [];
          setSubscriptions(subscriptions);
        });

      });
    }
  }, []);

  /*const handleProductSelect = (selectProduct) => {
    if (Object.keys(user).length > 0 && selectProduct) {
      productService.getProductSuscripcion(selectProduct.id).then((subscriptionList) => {
        const subscriptions = subscriptionList && Object.keys(subscriptionList).length > 0 ? subscriptionList.value.filter((subscription) => {
          return (subscription.properties.state !== 'cancelled');
        }).map((subscription) => {
          const subscriptionItem = {
            ...subscription.properties,
            id: subscription.name,
            value: subscription.name,
            text: subscription.properties.displayName,
          };
          return subscriptionItem;
        }) : [];
        setSubscriptions(subscriptions);
        setSubscriptionSecrets([]);
      });
    } else {
      setSubscriptions([]);
      setSubscriptionSecrets([]);
    }
    swaggerUi.authActions.logout(['apiKeyHeader']);
  };*/

  const handleSubscriptionSelect = (selectedSubscription) => {
    if (Object.keys(user).length > 0 && selectedSubscription) {
      subscriptionsService.listSubscriptionSecrets(user.name, selectedSubscription.id).then((subscriptionSecrets) => {
        const subscriptionSecretList = subscriptionSecrets && Object.keys(subscriptionSecrets).length > 0 ? Object.keys(subscriptionSecrets).map((subscriptionSecret) => {
          return {
            id: subscriptionSecrets[subscriptionSecret],
            value: subscriptionSecrets[subscriptionSecret],
            text: subscriptionSecret,
          };
        }) : [];
        setSubscriptionSecrets(subscriptionSecretList);
      });
    } else {
      setSubscriptionSecrets([]);
    }
    swaggerUi.authActions.logout(['apiKeyHeader']);
  };

  const handleSubscriptionSecretSelect = (selectedSubscriptionKey) => {
    swaggerUi.authActions.logout(['apiKeyHeader']);
    if (Object.keys(user).length > 0 && selectedSubscriptionKey) {
      const openAuthFormButton = document.querySelector('.auth-wrapper .authorize');
      openAuthFormButton.click();
      setTimeout(() => {
        swaggerUi.preauthorizeApiKey('apiKeyHeader', selectedSubscriptionKey.value);
      }, 350);
    }
  };

  return (
    <div>
      {Object.keys(user).length > 0 ? (
        <>
          <div className={classes.back__btn}>
            <Link to={-1}>
              <div className={classes.return}>
                <div>
                  <Icon id='MdKeyboardBackspace' />
                </div>
                <span>VOLVER</span>
              </div>
            </Link>
          </div>
          { products.length > 0 && (
            <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
              {/*
              <div className='row mt-6'>
                <div className='flex-sm-12 flex-md-12 flex-lg-12'>
                  <Select label='Producto' placeholder='Seleccione un producto' items={products} itemText='text' itemValue='value' onChange={(e) => handleProductSelect(e)} />
                </div>
              </div>
              */}
              <div className='row mt-6'>
                <div className='flex-sm-12 flex-md-12 flex-lg-12'>
                  <Select label='Suscripción' disabled={!subscriptions.length > 0} placeholder='Seleccione una suscripción' items={subscriptions} itemText='text' itemValue='value' onChange={(e) => handleSubscriptionSelect(e)} />
                </div>
              </div>
              <div className='row mt-6'>
                <div className='flex-sm-12 flex-md-12 flex-lg-12'>
                  <Select label='Clave de Suscripción' disabled={!subscriptionSecrets.length > 0} placeholder='Seleccione una clave de suscripción' items={subscriptionSecrets} itemText='text' itemValue='value' onChange={(e) => handleSubscriptionSecretSelect(e)} />
                </div>
              </div>
            </Container>
          )}
          <Container fixed sx={{ paddingLeft: { xs: '0px', md: '59px !important' }, paddingRight: { xs: '0px', md: '97px !important' } }}>
            { openApi ? <div id='swaggerContainer' /> : <SkeletonComponent /> }
          </Container>
        </>
      ) : (
        <div id='apiHome' style={{ paddingTop: '114px' }}>
          <div className={classes.banner_img}>
            <div className={`${classes.banner_img__layout}`}>
              <div className='container'>
                <div className={classes.banner_img__backTo}>
                  <Link to='/apis' className={classes.banner_img__backTo__btn}>
                    <div>
                      <Icon id='MdKeyboardBackspace' />
                    </div>
                    <div className={classes.banner_img__backTo__label}>
                      <span>Volver</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            { openApi ? <div id='swaggerContainer' /> : <SkeletonComponent /> }
          </div>
        </div>
      )}
    </div>
  );
};

export default SwaggerUI;
