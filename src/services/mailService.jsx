import config from './config';

const sendContactMail = (values) => {
  const data = {
    'to': config.emailTo,
    'from': config.emailFrom,
    'subject': config.contactEmailSubject,
    'templateId': config.emailContactTemplateId,
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

  return fetch(config.emailUrl, requestOptions)
    .then((response) => {
      return response;
    }).catch((error) => {
      return error.status;
    });
};

const emailService = {
  sendContactMail,
};

export default emailService;
