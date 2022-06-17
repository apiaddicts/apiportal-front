import React, { useEffect } from 'react';

function Redoc() {
  const swagger = 'https://api.apis.guru/v2/specs/instagram.com/1.0.0/swagger.yaml';

  useEffect(() => {
    let cancel = false;

    RedocTryItOut.init(swagger, {

    }, document.getElementById('redoc_container')).then(() => {
      if (cancel) {
        return;
      };
    });

    return () => {
      cancel = true;
    };
  }, []);
  return (
    <div id='redoc_container' />
  );

};

export default Redoc;
