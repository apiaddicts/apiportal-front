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
  const { t } = useTranslation(); // ✅ ahora sí dentro del hook

  const validationSchema = Yup.object().shape({
    password: string()
      .min(8, t('RestorePassword.passwordMinLength'))
      .required(t('RestorePassword.passwordRequired')),

    new_password: string()
      .min(8, t('RestorePassword.newPasswordMinLength'))
      .required(t('RestorePassword.newPasswordRequired'))
      .trim(t('RestorePassword.noSpaces'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
        t('RestorePassword.passwordRequirements')
      ),

    confirm_password: string()
      .required(t('RestorePassword.confirmPasswordRequired'))
      .oneOf([Yup.ref('new_password'), null], t('RestorePassword.passwordMatch')),
  });

  const [formStatus, setFormStatus] = useState({
    status: 'not_started',
    message: '',
  });

  const formik = useFormik({
    initialValues: objectFromArray(fields, 'initialValue', validationSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        setFormStatus({ status: 'loading' });
        const submitResponse = await customHandleSubmit(values);
        setFormStatus(submitResponse);
        submitResponse.status === 'success' && resetForm();
      } catch (error) {
        console.error('Error', error);
      }
    },
    validationSchema,
    enableReinitialize: true,
  });

  return { ...formik, formStatus, setFormStatus };
}

export default useFormRestorePassword;
