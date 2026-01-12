/* eslint-disable */
import config from "../../services/config";

const username = localStorage.getItem('username') === null ? '' : localStorage.getItem('username');
let password = '';
if (localStorage.getItem('password') !== null) {
  const decryptedKey = atob(localStorage.getItem('password'));
  const data = decryptedKey.split(':');
  password = atob(data[0]);
}

export const fieldsRegister = [
  {
    id: 'username',
    initialValue: '',
    placeholder: 'John123',
    label: 'Nombre de usuario *',
    validate: 'username',
    required: true,
    type: 'text',
  },
  {
    id: 'first_name',
    initialValue: '',
    placeholder: 'John',
    label: 'Nombre *',
    validate: 'first_name',
    required: true,
    type: 'text',
  },
  {
    id: 'last_name',
    initialValue: '',
    placeholder: 'Doe',
    label: 'Apellidos *',
    validate: 'last_name',
    required: true,
    type: 'text',
  },
  // {
  //   id: 'phone',
  //   initialValue: '',
  //   placeholder: 'Celular',
  //   label: 'Celular',
  //   validate: 'phone',
  //   required: true,
  //   type: 'number',
  // },
  {
    id: 'company',
    initialValue: '',
    placeholder: 'Compañia',
    label: 'Compañia *',
    validate: 'company',
    required: true,
    type: 'text',
  },
  // {
  //   id: 'industry',
  //   initialValue: '',
  //   placeholder: 'Industria',
  //   label: 'Industria',
  //   validate: 'industry',
  //   required: true,
  //   type: 'email',
  // },
  {
    id: 'email',
    initialValue: '',
    placeholder: 'youremail@domain.com',
    label: 'Correo electrónico *',
    validate: 'email',
    required: true,
    type: 'email',
  },
  {
    id: 'password',
    initialValue: '',
    placeholder: '********',
    label: 'Contraseña *',
    validate: 'password',
    required: true,
    type: 'password',
    icon: true,
    iconName: 'MdOutlineRemoveRedEye'
  },
  {
    id: 'password_confirmation',
    initialValue: '',
    placeholder: '********',
    label: 'Repetir contraseña *',
    validate: 'password_confirmation',
    required: true,
    type: 'password',
    icon: true,
    iconName: 'MdOutlineRemoveRedEye'
  },
  {
    id: 'terms',
    type: 'checkbox',
    name: 'terms',
    label: `Acepto los [términos de uso](${config.termsPath})`,
    initialValue: false,
    required: true,
  },
];

export const fieldsLogin = [
  {
    id: 'username',
    initialValue: username,
    placeholder: 'Correo electrónico',
    validate: 'username',
    required: true,
    type: 'username',
  },
  {
    id: 'password',
    initialValue: password,
    placeholder: 'Contraseña',
    validate: 'password',
    required: true,
    type: 'password',
    icon: true,
    iconName: 'MdOutlineRemoveRedEye',
  },
  {
    id: 'remember',
    type: 'checkbox',
    name: 'remember',
    label: 'Recordar datos',
    initialValue: localStorage.getItem('username') !== null && localStorage.getItem('password') !== null,
  },
];
export const fieldsContact = [
  {
    id: 'name',
    initialValue: '',
    placeholder: 'Nombre',
    validate: 'Nombre',
    required: true,
    type: 'text',
  },
  {
    id: 'email',
    initialValue: '',
    placeholder: 'Email',
    validate: 'email',
    required: true,
    type: 'email',
  },
];
export const fieldsContactExtend = [
  {
    id: 'first_name',
    initialValue: '',
    placeholder: 'Nombre',
    label: 'Nombre',
    validate: 'first_name',
    required: true,
    type: 'text',
  },
  {
    id: 'last_name',
    initialValue: '',
    placeholder: 'Apellido',
    label: 'Apellido',
    validate: 'last_name',
    required: true,
    type: 'text',
  },
  {
    id: 'email',
    initialValue: '',
    placeholder: 'Email',
    label: 'Email',
    validate: 'email',
    required: true,
    type: 'email',
  },
  {
    id: 'phone',
    initialValue: '',
    placeholder: 'Celular',
    label: 'Celular',
    validate: 'phone',
    required: true,
    type: 'number',
  },
  {
    id: 'topics',
    initialValue: '',
    placeholder: 'Temas',
    label: 'Temas',
    validate: 'topics',
    required: true,
    type: 'text',
  },
  {
    id: 'subject',
    initialValue: '',
    placeholder: 'Asunto',
    label: 'Asunto',
    validate: 'subject',
    required: true,
    type: 'text',
  },
  {
    id: 'message',
    initialValue: '',
    placeholder: 'Mensaje',
    label: 'Mensaje',
    validate: 'message',
    required: true,
    type: 'textarea',
  },
];
export const fieldsForgotPassword = [
  {
    id: 'email',
    initialValue: '',
    placeholder: 'Email',
    validate: 'email',
    required: true,
    type: 'email',
  },
];
