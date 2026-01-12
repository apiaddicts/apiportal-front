/* eslint-disable prefer-regex-literals */
import { useFormik } from 'formik';
import { useState } from 'react';
import { string } from 'yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const objectFromArray = (fields, key, validationSchema) => {
  const mappedProps = fields.map((field) => {
    if (key !== 'validate') {
      return [field.id, field[key]];
    }
    const validation = validationSchema[field.validate];
    return [field.id, field.required ? validation.required() : validation];
  });

  return Object.fromEntries(mappedProps);
};

function useFormUserConfig(fields, customHandleSubmit) {
  const { t } = useTranslation(); // ✅ Hook dentro del custom hook

  const validationSchema = Yup.object().shape({
    first_name: string().required(t('UserForm.requiredField')),
    last_name: string().required(t('UserForm.requiredField')),
    email: string()
      .email(t('UserForm.invalidEmail'))
      .required(t('UserForm.requiredField')),
  });

  const [formStatus, setFormStatus] = useState({
    status: 'not_started',
    message: '',
  });

  const formik = useFormik({
    initialValues: objectFromArray(fields, 'initialValue', validationSchema),
    onSubmit: async (values, { resetForm }) => {
      setFormStatus({ status: 'loading' });
      const submitResponse = await customHandleSubmit(values);
      setFormStatus(submitResponse);
      submitResponse.status === 'success' && resetForm();
    },
    validationSchema,
    enableReinitialize: true,
  });

  return { ...formik, formStatus, setFormStatus };
}

export default useFormUserConfig;
