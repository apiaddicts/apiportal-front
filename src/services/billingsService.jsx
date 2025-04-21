import handleResponse from './handleResponse';
import config from './config';




const billingsProducts = () => {
  // Obtener el token del sessionStorage
  const tokenData = JSON.parse(sessionStorage.getItem('token'));
  const accessToken = tokenData?.accessToken;

  const requestOptions = {
    method: 'GET',
    headers: {
      // 'client_id': process.env.REACT_APP_CLIENT_ID,
      // 'client_secret': process.env.REACT_APP_CLIENT_SECRET,
      'client_id': 'ab5481325055405a97fcc7a826fac919',
      'client_secret': '08f5c7b4aE194eCaBF7E33c990Ca7504',
      'Authorization': `Bearer ${accessToken}`
    },
  };

  return fetch(`${config.kopernicaUrlPrc}/payments/v1/products`, requestOptions)

    .then(handleResponse)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    });
}


const billingsLink = (priceId) => {
  const tokenData = JSON.parse(sessionStorage.getItem('token'));
  const accessToken = tokenData?.accessToken;


  const data = JSON.stringify({
    priceId: priceId,
    quantity: 1
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'client_id': process.env.REACT_APP_CLIENT_ID,
      // 'client_secret': process.env.REACT_APP_CLIENT_SECRET,
      'client_id': 'ab5481325055405a97fcc7a826fac919',
      'client_secret': '08f5c7b4aE194eCaBF7E33c990Ca7504',
      'Authorization': `Bearer ${accessToken}`
    },
    body: data
  };

  return fetch(`${config.kopernicaUrlPrc}/payments/v1/payment-link`, requestOptions)
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
// https://ne-apimanagement-dev.management.azure-api.net/subscriptions/9aebbbee-3758-4651-95e2-caf96026576e/resourceGroups/azure-apiquality/providers/Microsoft.ApiManagement/service/ne-apimanagement-dev/identity?api-version=2021-08-01