import config from './config';

function sendContactMail(values) {
  const data = {
    'to': values.email,
    'from': config.emailFrom,
    'templateId': config.emailTemplateId,
    'dynamicTemplateData': {
      'name': values.name,
      'lastname': values.lastname,
      'phone': values.phone,
      'subject': values.subject,
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
};

export default mailService;
