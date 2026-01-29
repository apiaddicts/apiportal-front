import handleResponse from './handleResponse';
import config from './config';

function register(userData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    headers: { 'Content-Type': 'application/json' },
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
    headers: { 'Content-Type': 'application/json' },
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

const authService = {
  register,
  forgotPassword,
  resetPassword,
};

export default authService;