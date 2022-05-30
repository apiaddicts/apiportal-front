import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import { useDispatch, useSelector } from 'react-redux';
// import config from '../../services/config';

import { getApiOpenAPI } from '../../redux/actions/libraryAction';

function Swagger() {

  const { jsonOpenApi } = useSelector((state) => state.library);
  // console.log(jsonOpenApi);

  const params = useParams();
  console.log(params.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (jsonOpenApi) {
      dispatch(getApiOpenAPI(params.id));
    }
  }, [dispatch]);

  // const urlPrincipal = `${config.suraUrl}/subscriptions/${config.subscriptionId}`;
  // const urlResourceGroups = `${urlPrincipal}/resourceGroups/${config.resourceGroupName}`;
  // const urlService = `${urlResourceGroups}/providers/Microsoft.ApiManagement/service/${config.serviceName}`;
  // const url = `${urlService}/apis/${params.id}?api-version=${config.apiVersion}`;
  // console.log(url);

  return (
    <div style={{ marginTop: '50px' }}>
      <SwaggerUI
        // url='https://petstore.swagger.io/v2/swagger.json'
        // url='https://cloudappi-apim.management.azure-api.net/subscriptions/8e7674e5-98c5-4ccb-9b4c-bd5eec3dc202/resourceGroups/grdatafactory/providers/Microsoft.ApiManagement/service/cloudappi-apim/apis/demo-conference-api-v1?api-version=2021-08-01'
        // url='https://api.apis.guru/v2/specs/instagram.com/1.0.0/swagger.yaml'
        spec={jsonOpenApi}
      />
    </div>
  );
};

export default Swagger;
