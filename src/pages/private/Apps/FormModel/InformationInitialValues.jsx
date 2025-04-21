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

export default {
  [displayName.name]: '',
  [callback.name]: '',
  [description.name]: '',
  [expiration.name]: '',
  [checkApis.name]: [],
};
