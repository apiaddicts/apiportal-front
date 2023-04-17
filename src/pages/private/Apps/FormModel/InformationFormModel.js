const enumExpiration = [
  { text: '90 días (3 meses)', value: '90' },
  { text: '180 días (6 meses)', value: '180' },
  { text: '365 días (12 meses)', value: '365' },
];

export default {
  formId: 'informationForm',
  formField: {
    displayName: {
      name: 'displayName',
      label: 'Nombre de la Aplicación',
      placeholder: 'Nombre de la Aplicación',
      requiredErrorMsg: 'Campo requerido',
      required: true,
    },
    callback: {
      name: 'callback',
      label: 'Añadir callback (Opcional)',
      placeholder: 'Añadir callback (Opcional)',
      requiredErrorMsg: 'Campo requerido',
      required: false,
    },
    description: {
      name: 'description',
      label: 'Descripción de la Aplicación',
      placeholder: 'Descripción de la App',
      requiredErrorMsg: 'Campo requerido',
      required: true,
    },
    expiration: {
      name: 'expiration',
      label: 'Tiempo de expiración del secreto de cliente',
      placeholder: 'Tiempo de expiración',
      requiredErrorMsg: 'Campo requerido',
      required: false,
      items: enumExpiration,
    },
    checkApis: {
      name: 'checkApis',
      label: 'Apis',
      requiredErrorMsg: 'Campo requerido',
      required: true,
    },
  },
};
