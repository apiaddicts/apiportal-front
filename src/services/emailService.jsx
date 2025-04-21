import config from './config';

const sendContactEmail = (values) => {
  const data = {
    'to': config.contactEmailTo,
    'from': config.contactEmailFrom,
    'subject': config.contactEmailSubject,
    'templateId': config.contactEmailTemplateId,
    'emailData': {
      'firstName': values['name'],
      'lastName': values['lastname'],
      'email': values['email'],
      'phone': values['phone'],
      'topic': values['subject'],
      'message': values['message'],
    },
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(config.sendingEmailEndpointUrl, requestOptions)
    .then((response) => {
      return response;
    }).catch((error) => {
      return error.status;
    });
};

const emailService = {
  sendContactEmail,
};

export default emailService;
