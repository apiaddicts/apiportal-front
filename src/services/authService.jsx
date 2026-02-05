import handleResponse from './handleResponse';
import config from './config';

function register(userData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': `${config.strapiApiKey}`,
    },
    body: JSON.stringify(userData),
  };

  const url = `${config.apiUrl}/auth/local/register`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response);
}

function forgotPassword(email) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': `${config.strapiApiKey}`,
    },
    body: JSON.stringify({ email }),
  };

  const url = `${config.apiUrl}/auth/forgot-password`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response);
}

function resetPassword(code, password, passwordConfirmation) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': `${config.strapiApiKey}`,
    },
    body: JSON.stringify({
      code,
      password,
      passwordConfirmation,
    }),
  };

  const url = `${config.apiUrl}/auth/reset-password`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response);
}

function login(identifier, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': `${config.strapiApiKey}`,
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  };

  const url = `${config.apiUrl}/auth/local`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response);
}

function resendConfirmationEmail(email) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': `${config.strapiApiKey}`,
    },
    body: JSON.stringify({ email }),
  };

  const url = `${config.apiUrl}/auth/send-email-confirmation`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((response) => response);
}

const authService = {
  register,
  forgotPassword,
  resetPassword,
  login,
  resendConfirmationEmail,
};

export default authService;