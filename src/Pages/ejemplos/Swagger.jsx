import React from 'react';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function Swagger() {
  return (
    <div style={{ marginTop: '50px' }}>
      <SwaggerUI
        // url='https://petstore.swagger.io/v2/swagger.json'
        // url='https://raw.githubusercontent.com/ErikWittern/openapi-snippet/main/test/petstore_oas.json'
        url='https://api.apis.guru/v2/specs/instagram.com/1.0.0/swagger.yaml'
      />
    </div>
  );
};

export default Swagger;
