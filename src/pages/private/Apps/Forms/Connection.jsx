import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputKeys from '../../../../components/Input/InputKeys';
import appsActions from '../../../../redux/actions/appsActions';

function Connection(props) {
  const dispatch = useDispatch();
  const { createdApp, appSuscription, secretKeys } = useSelector((state) => state.apps);

  useEffect(() => {
    if (createdApp && Object.keys(createdApp).length > 0) {
      dispatch(appsActions.getAppDetailSuscription(createdApp.id));
      dispatch(appsActions.getAppDetail(createdApp.id));
    }
  }, []);

  const primaryKey = appSuscription && Object.keys(appSuscription).length > 0 && appSuscription?.appSubscriptionKey?.primaryKey ? appSuscription?.appSubscriptionKey?.primaryKey : '';
  const secondaryKey = appSuscription && Object.keys(appSuscription).length > 0 && appSuscription?.appSubscriptionKey?.secondaryKey ? appSuscription?.appSubscriptionKey?.secondaryKey : '';
  const appId = secretKeys && Object.keys(secretKeys).length > 0 ? secretKeys?.appId : '';
  const clientSecret = appSuscription && Object.keys(appSuscription).length > 0 ? appSuscription?.passwordCredentials : '';

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <p className='font-weight-bold text-uppercase mb-5 pb-2'>Claves de Aplicación</p>
        <form>
          <div className='row align_items__center mt-5 justify_content__between'>
            <div className='flex-lg-6 flex-sm-12'>
              <InputKeys label='Id de Aplicación' type='password' value={appId} disabled />
            </div>
            <div className='flex-lg-6 flex-sm-12'>
              <InputKeys label='Secreto del cliente' type='password' value={clientSecret} disabled />
            </div>
          </div>
        </form>
      </Grid>
      <Grid item xs={12} marginTop={3}>
        <p className='font-weight-bold text-uppercase mb-5 pb-2'>Suscripción</p>
        <form>
          <div className='row align_items__center mt-5 justify_content__between'>
            <div className='flex-lg-6 flex-sm-12'>
              <div className='w-full'>
                <InputKeys label='Primary Key' type='password' value={primaryKey} disabled />
              </div>
            </div>
            <div className='flex-lg-6 flex-sm-12'>
              <InputKeys label='Secondary Key' type='password' value={secondaryKey} disabled />
            </div>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}

export default Connection;
