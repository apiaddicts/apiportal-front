const statusCode = {
  HTTP_200_OK: 200,
  HTTP_201_CREATED: 201,
  HTTP_202_ACCEPTED: 202,
  HTTP_204_NO_CONTENT: 204,
  HTTP_205_RESET_CONTENT: 205,
  HTTP_206_PARTIAL_CONTENT: 206,

  HTTP_300_MULTIPLE_CHOICES: 300,
  HTTP_301_MOVED_PERMANENTLY: 301,
  HTTP_302_FOUND: 302,
  HTTP_303_SEE_OTHER: 303,
  HTTP_304_NOT_MODIFIED: 304,
  HTTP_305_USE_PROXY: 305,
  HTTP_306_RESERVED: 306,
  HTTP_307_TEMPORARY_REDIRECT: 307,
  HTTP_308_PERMANENT_REDIRECT: 308,

  HTTP_400_BAD_REQUEST: 400,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_402_PAYMENT_REQUIRED: 402,
  HTTP_403_FORBIDDEN: 403,
  HTTP_404_NOT_FOUND: 404,
  HTTP_405_METHOD_NOT_ALLOWED: 405,
  HTTP_406_NOT_ACCEPTABLE: 406,
  HTTP_429_TOO_MANY_REQUESTS: 429,

  HTTP_500_INTERNAL_SERVER_ERROR: 500,
  HTTP_502_BAD_GATEWAY: 502,
};

function handleResponseToken(response) {

  return response.text().then((text) => {
    const token = response.headers.get('ocp-apim-sas-token');
    const data = text && JSON.parse(text);
    Object.assign(data, { token });
    switch (response.status) {
      case statusCode.HTTP_200_OK:
        return data;
      case statusCode.HTTP_201_CREATED:
        return data;
      case statusCode.HTTP_204_NO_CONTENT:
        return data;
      case statusCode.HTTP_304_NOT_MODIFIED:
        return 'Not_Modified';
      case statusCode.HTTP_401_UNAUTHORIZED:
        return {
          error: {
            status: response.status,
            statusText: response.statusText,
          },
        };
      default:
        return Promise.reject(data);
    }
  });
}

export default handleResponseToken;
