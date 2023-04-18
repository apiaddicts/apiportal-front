/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SwaggerUi from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

import { Container } from '@mui/material';
import Icon from '../../../components/MdIcon/Icon';
import libraryService from '../../../services/libraryService';
import appsService from '../../../services/appsService';
//import apiService from '../../../services/apiService';
import subscriptionsService from '../../../services/subscriptionsService';
//import productService from '../../../services/productsService';
import classes from './swagger-ui.module.scss';
import Select from '../../../components/Input/InputUI/Select';
import config from '../../../services/config';

function SwaggerUI() {

  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [docCheck, setDocCheck] = useState(false);
  //const [apps, setApps] = useState([]);
  const [products, setProducts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionSecrets, setSubscriptionSecrets] = useState([]);
  //const [swaggerUi, setSwaggerUi] = useState();

  const updateScopes = (openapi, apps) => {
    for (const [, securityScheme] of Object.entries(openapi.components?.securitySchemes)) {
      if (securityScheme.type === 'oauth2') {
        for (const [typeFlow, flow] of Object.entries(securityScheme.flows)) {
          if (typeFlow === 'clientCredentials') {
            for (const app of apps) {
              flow.scopes[`${config.b2cBaseUrl}/${app.id}/.default`] = 'Grant access to data';
            }
            continue;
          }
          if (typeFlow === 'password' || typeFlow === 'authorizationCode') {
            for (const app of apps) {
              flow.scopes[`${app.id}`] = 'Grant access to data';
            }
            continue;
          }
        }
      }
    }
    return openapi;
  };

  const updateServers = (openapi, hostnames) => {
    const customOpenApi = { ...openapi };
    const servers = customOpenApi && customOpenApi['servers'] !== undefined && customOpenApi.servers.length > 0 ? customOpenApi.servers.filter((server) => {
      const url = new URL(server.url);
      if (hostnames.includes(url.hostname)) return true;
      return false;
    }) : [];
    customOpenApi['servers'] = servers;
    return customOpenApi;
  };

  useEffect(() => {
    appsService.listAllApps(0).then((appList) => {
      const apps = appList && Object.keys(appList).length > 0 ? appList.data.filter((app) => app.apis.some((api) => api.id === params.id)).map((app) => {
        const appItem = {
          ...app,
          id: app.appId,
          value: app.appId,
          text: app.displayName,
        };
        return appItem;
      }) : [];
      //setApps(apps);

      libraryService.getApiHostnames(params.id).then((hostnameList) => {
        const hostnames = hostnameList.data && Object.keys(hostnameList.data).length > 0 ? hostnameList.data.value.map((hostname) => {
          return hostname.properties.value;
        }) : [];

        libraryService.getApiOpenAPI(params.id).then((jsonOpenApi) => {
          //setOpenApiFormat(('swagger' in jsonOpenApi) ? 'swagger' : 'openapi');
          //hasApiKeySecurity();
          //hasOAuthSecurity();
          //selectEnvHost();
          let customOpenApi = updateScopes(jsonOpenApi, apps);
          customOpenApi = updateServers(customOpenApi, hostnames);

          SwaggerUi({
            dom_id: '#swaggerContainer',
            spec: customOpenApi,
            presets: SwaggerUi.presets.apis,
            oauth2RedirectUrl: `${window.location.protocol}//${window.location.host}/developer/apis/swagger-ui/oauth-redirect`,
            persistAuthorization: false,
          });
          //setSwaggerUi(swaggerUi);
        }).catch((e) => {
          setDocCheck(true);
        });;

      });
    });
    if (Object.keys(user).length > 0) {
      libraryService.listApisProduct(params.id).then((productList) => {
        const products = productList && Object.keys(productList).length > 0 ? productList.map((product) => {
          const prodItem = {
            ...product.properties,
            id: product.name,
            value: product.name,
            text: product.displayName,
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
        {
          docCheck ? <h1>Información no disponible</h1> : <div id='swaggerContainer' />
        }
      </Container>
    </>
  );
};

export default SwaggerUI;
