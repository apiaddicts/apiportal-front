import handleResponse from './handleResponse';
import config from './config';




const billingsProducts = (headerManager) => {


  const tokenData = JSON.parse(localStorage.getItem('token'));
  const accessToken = tokenData?.accessToken;
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'x-apimanager-id': `Manager-${headerManager}`, 'apiKey': `${config.integratorApiKey}` },
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
  const tokenData = JSON.parse(localStorage.getItem('token'));
  const accessToken = tokenData?.accessToken;


  const data = JSON.stringify({
    priceId: priceId,
    quantity: 1
  });

  const requestOptions = {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'x-apimanager-id': `Manager-${headerManager}`, 'apiKey': `${config.integratorApiKey}` },
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


const billingDataChart = () => {
  const tokenData = JSON.parse(localStorage.getItem('token'));
  const accessToken = tokenData?.accessToken;

  const body = JSON.stringify(
    {
      "type": "enriched-http-event",
      "aggregators": [
        {
          "time_interval": 360,
          "aggregators": [
            {
              "dimension": "client_id"
            }
          ]
        }
      ],
      "duration": "10080m",
      "filters": [
        {
          "or": [
            {
              "equals": {
                "api_version_id": 2506677
              }
            }
          ]
        },
        {
          "or": [
            {
              "equals": {
                "client_id": "ab5481325055405a97fcc7a826fac919"
              }
            },
            {
              "equals": {
                "client_id": "458f7b9b21e2416eb8e8b49553264c5c"
              }
            },
            {
              "equals": {
                "client_id": "39f50acb8886417091a6203c2845ac8d"
              }
            }
          ]
        }
      ],
      "start_time": "2025-04-23T18:31:26.650Z",
      "include_policy_violation": false
    }
  );

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer`,
      'Content-Type': 'application/json'
    },
    body: body
  };

  return fetch(`${config.dataChart}`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};





const billingService = {
  billingsProducts,
  billingsLink,
  billingDataChart
};

export default billingService;
