import config from './config';

function sendContactMail(values) {
  const data = {
    'to': values.email,
    'from': config.emailFrom,
    'templateId': config.emailContactTemplateId,
    'dynamicTemplateData': {
      'NOMBRE_COMPLETO': values.name,
    },
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKeySendGrid': config.apiKeySendGrid,
      'Subscription-Key': config.subscriptionKey,
    },
    body: JSON.stringify(data),
  };

  return fetch(config.emailUrl, requestOptions)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
      return error.status;
    });
}

function sendConversationMail(values) {
  const data = {
    'to': config.emailTo,
    'from': config.emailFrom,
    'templateId': config.emailConversationTemplateId,
    'dynamicTemplateData': values,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apiKeySendGrid': config.apiKeySendGrid,
      'Subscription-Key': config.subscriptionKey,
    },
    body: JSON.stringify(data),
  };

  return fetch(config.emailUrl, requestOptions)
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
      return error.status;
    });
}

const mailService = {
  sendContactMail,
  sendConversationMail,
};

export default mailService;
