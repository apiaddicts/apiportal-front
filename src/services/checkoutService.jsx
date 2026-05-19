import handleResponse from './handleResponse';
import config from './config';

const headers = () => ({ 'Content-Type': 'application/json', 'apikey': `${config.strapiApiKey}` });

const authHeaders = () => {
  const tokenData = JSON.parse(localStorage.getItem('token') || 'null');
  const jwt = tokenData?.jwt || tokenData?.accessToken;
  const base = headers();
  return jwt ? { ...base, 'Authorization': `Bearer ${jwt}` } : base;
};

function createCheckoutSession(catalogId) {
  return fetch(`${config.apiUrl}/purchases/checkout`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify({ catalogId }),
  }).then(handleResponse);
}

function getMyPurchases() {
  return fetch(`${config.apiUrl}/me/purchases`, { method: 'GET', headers: authHeaders() }).then(handleResponse);
}

function cancelPurchase(purchaseId) {
  return fetch(`${config.apiUrl}/purchases/${purchaseId}/cancel`, {
    method: 'POST', headers: authHeaders(),
  }).then(handleResponse);
}

function getPurchaseAssets(purchaseId) {
  return fetch(`${config.apiUrl}/purchases/${purchaseId}/assets`, { method: 'GET', headers: authHeaders() }).then(handleResponse);
}

function getOwnPurchase(purchaseId) {
  return fetch(`${config.apiUrl}/purchases/${purchaseId}`, { method: 'GET', headers: authHeaders() }).then(handleResponse);
}

function consumeAsset(purchaseId, assetId, webhookUrl, sourceHints) {
  const payload = { assetId, webhookUrl };
  if (sourceHints && typeof sourceHints === 'object' && Object.keys(sourceHints).length > 0) {
    payload.sourceHints = sourceHints;
  }
  return fetch(`${config.apiUrl}/purchases/${purchaseId}/consume`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  }).then(handleResponse);
}

function setPurchaseConnector(purchaseId, consumerUrl, consumerApiKey) {
  return fetch(`${config.apiUrl}/purchases/${purchaseId}/connector`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ consumerUrl, consumerApiKey }),
  }).then(handleResponse);
}

function getMyWebhooks() {
  return fetch(`${config.apiUrl}/me/webhooks`, { method: 'GET', headers: authHeaders() }).then(handleResponse);
}

function preflightWebhook(url) {
  return fetch(`${config.apiUrl}/webhooks/preflight`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify({ url }),
  }).then(handleResponse);
}

const checkoutService = {
  createCheckoutSession,
  getMyPurchases,
  getOwnPurchase,
  getPurchaseAssets,
  consumeAsset,
  setPurchaseConnector,
  cancelPurchase,
  getMyWebhooks,
  preflightWebhook,
};

export default checkoutService;
