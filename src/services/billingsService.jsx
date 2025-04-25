import handleResponse from './handleResponse';
import config from './config';




const billingsProducts = (headerManager) => {


  const tokenData = JSON.parse(sessionStorage.getItem('token'));
  const accessToken = tokenData?.accessToken;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'x-apimanager-id': `Manager-${headerManager}` },
  };


  return fetch(`${config.integratorUrl}/list/products`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}


const billingsLink = (priceId, headerManager) => {
  const tokenData = JSON.parse(sessionStorage.getItem('token'));
  const accessToken = tokenData?.accessToken;


  const data = JSON.stringify({
    priceId: priceId,
    quantity: 1
  });

  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'x-apimanager-id': `Manager-${headerManager}` },
    body: data
  };

  return fetch(`${config.integratorUrl}/payments/link`, requestOptions)
    .then(handleResponse)
    .then((response) => {

      return response;
    })
    .catch((error) => {
      console.error('Error al obtener el link de pago:', error);
    });
}




const billingService = {
  billingsProducts,
  billingsLink
};

export default billingService;
