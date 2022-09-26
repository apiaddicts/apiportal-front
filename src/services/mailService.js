import config from './config';

function sendContactMail(values) {
  let htmlContent = '<ul>';
  Object.keys(values).forEach((key) => {
    if (key !== 'subject') htmlContent += `<li>${key}: ${values[key]}</li>`;
  });
  htmlContent += '</ul>';
  const data = {
    'to': config.emailTo,
    'from': config.emailFrom,
    'templateId': config.emailContactTemplateId,
    'dynamicTemplateData': {
      'SUBJECT': values.subject,
      'CONTENIDO': htmlContent,
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
  let htmlContent = '<ul>';
  Object.keys(values).forEach((key) => {
    if (key !== 'subject') htmlContent += `<li>${key}: ${values[key]}</li>`;
  });
  htmlContent += '</ul>';
  const data = {
    'to': config.emailTo,
    'from': config.emailFrom,
    'templateId': config.emailConversationTemplateId,
    'dynamicTemplateData': {
      'SUBJECT': values.subject,
      'CONTENIDO': htmlContent,
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

const mailService = {
  sendContactMail,
  sendConversationMail,
};

export default mailService;
