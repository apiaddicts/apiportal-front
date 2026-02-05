/* eslint-disable prefer-regex-literals */
import { useFormik } from 'formik';
import { useState } from 'react';
import { string } from 'yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

function useFormForgotPassword(
  fields,
  customHandleSubmit,
) {
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    email: string().email(t('ForgotPasswordForm.invalidEmail')).required(t('ForgotPasswordForm.requiredField')),
  });

  const objectFromArray = (fields, key) => {
    const mappedProps = fields.map((field) => {
      if (key !== 'validate') {
        return [field.id, field[key]];
      }
      const validation = validationSchema[field.validate];
      return [field.id, field.required ? validation.required() : validation];
    });

    return Object.fromEntries(mappedProps);
  };

  const [formStatus, setFormStatus] = useState({
    status: 'not_started',
    message: '',
  });
  const formik = useFormik({
    initialValues: objectFromArray(fields, 'initialValue'),
    onSubmit: async (values, { resetForm }) => {
      try {
        setFormStatus({ status: 'loading' });
        const submitResponse = await customHandleSubmit(values);
        setFormStatus(submitResponse);
        if (submitResponse?.status === 'success') resetForm();
      } catch (error) {
        console.error('Error', error);
      }
    },
    validationSchema,
    enableReinitialize: true,
  });

  return { ...formik, formStatus, setFormStatus };
}

export default useFormForgotPassword;
