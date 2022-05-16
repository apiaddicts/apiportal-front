import React, { useEffect } from 'react';

function Redoc() {
//   console.log('asincronismo ', RedocTryItOut);
  //   useEffect(() => {
  //     let cancel = false;

  //     RedocTryItOut.init(openAPI, {

  //     }, document.getElementById('redoc_container')).then(() => {
  //       if (cancel) return;
  //     });

  //     return () => {
  //       cancel = true;
  //     };
  //   }, []);

  const swagger = 'https://api.apis.guru/v2/specs/instagram.com/1.0.0/swagger.yaml';
  // const swagger = 'https://petstore.swagger.io/v2/swagger.json';

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
    <>
      <div id='redoc_container' />
      {
        // initTry({
        //   openApi: swagger,
        //   redocOptions: {
        //     theme: CustomRedoctTheme,
        //     scrollYOffset: 70,
        //   },
        // })

        // RedocTryItOut.init(
        //   swagger,
        //   { title: 'Pet Store' },
        //   document.getElementById('redoc_container'),
        // )
      }
    </>
  );

};

export default Redoc;
