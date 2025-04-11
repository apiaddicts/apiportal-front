import * as Yup from 'yup';
import InformationFormModel from './InformationFormModel';

const {
  formField: {
    displayName,
    callback,
    description,
    expiration,
    checkApis,
  },
} = InformationFormModel;

export default [Yup.object().shape({
  [displayName.name]: Yup.string().required(`${displayName.requiredErrorMsg}`),
  [callback.name]: Yup.string().url('Please insert a valid url').test('isValidCallback', 'Url must not contain this domain!', (value) => { return value ? !value.startsWith(window.location.origin) : true; }),
  [description.name]: Yup.string().required(`${description.requiredErrorMsg}`),
  [expiration.name]: Yup.string(),
}),
Yup.object().shape({
  [checkApis.name]: Yup.array(),
}),
];
