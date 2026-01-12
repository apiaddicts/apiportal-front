import { useFormik } from 'formik';
import { useState } from 'react';
import { string, bool } from 'yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useFormConfig = (fields, customHandleSubmit) => {
  const { t } = useTranslation(); // ✅ Agregado aquí antes de usarlo

  const validationSchema = Yup.object().shape({
    first_name: string().trim().required(t('Form.requiredField')).matches(/^[a-zA-ZÀ-ÿ\s]+$/, t('Form.noSpecialCharacters'))
      .max(50, t('Form.maxCharacters')),
    last_name: string().trim().required(t('Form.requiredField')).matches(/^[a-zA-ZÀ-ÿ\s]+$/, t('Form.noSpecialCharacters'))
      .max(50, t('Form.maxCharacters')),
    email: string().email(t('Form.invalidEmail')).required(t('Form.requiredField')),
    terms: bool().oneOf([true], t('Form.acceptTerms')),
    password: string()
      .min(8, t('Form.passwordMinLength'))
      .max(16, t('Form.maxCharacters'))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/, t('Form.passwordRequirements'))
      .trim(t('Form.noSpaces'))
      .strict()
      .required(t('Form.passwordRequired')),
    password_confirmation: string().oneOf([Yup.ref('password')], t('Form.passwordMatch')).required(t('Form.requiredField')).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/, t('Form.passwordRequirements')),
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
      setFormStatus({ status: 'loading' });
      const submitResponse = await customHandleSubmit(values);
      setFormStatus(submitResponse);
      submitResponse.status === 'success' && resetForm();
    },
    validationSchema,
    enableReinitialize: true,
  });

  return { ...formik, formStatus, setFormStatus };
};

export default useFormConfig;
