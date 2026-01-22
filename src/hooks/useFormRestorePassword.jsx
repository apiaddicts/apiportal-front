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

function useFormRestorePassword(fields, customHandleSubmit) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    password: string()
      .min(8, t('Form.passwordMinLength'))
      .max(16, t('Form.maxCharacters'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=.,?])[A-Za-z\d!@#$%^&*()_+\-=.,?]{8,16}$/,
        t('Form.passwordRequirements')
      )
      .trim(t('Form.noSpaces'))
      .strict()
      .required(t('Form.passwordRequired')),

    confirmPassword: string()
      .oneOf([Yup.ref('password')], t('Form.passwordMatch'))
      .required(t('Form.requiredField')),
  });

  const [formStatus, setFormStatus] = useState({
    status: 'not_started',
    message: '',
  });

  const formik = useFormik({
    initialValues: objectFromArray(fields, 'initialValue', validationSchema),
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        setFormStatus({ status: 'loading' });
        const response = await customHandleSubmit(values);
        setFormStatus(response);

        if (response?.status === 'success') {
          resetForm();
        }
      } catch (error) {
        setFormStatus({
          status: 'error',
          message: t('Form.genericError'),
        });
      }
    },
    enableReinitialize: true,
  });

  return { ...formik, formStatus };
}

export default useFormRestorePassword;
