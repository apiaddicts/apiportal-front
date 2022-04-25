/* eslint-disable prefer-regex-literals */
import { useFormik } from 'formik';
import { useState } from 'react';
import { string } from 'yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  first_name: string().required('El nombre es obligatorio'),
  last_name: string().required('El apellido es obligatorio'),
  phone: string()
    .matches(new RegExp(/(^[0-9]+$)/), 'Must contain only numbers')
    .min(10, 'Must be at least 10 characters long').required('El número es obligatorio'),
  company: string().required('El nombre de la empresa es obligatorio'),
  industry: string().required('El sector es obligatorio'),
  email: string().email('Please provide a valid email').required('El email es obligatorio'),
  password: string()
    .matches(new RegExp(/(?=.*[a-z])/), 'Must contain lowercase a-z characters')
    .matches(new RegExp(/(?=.*[A-Z])/), 'Must contain uppercase A-Z characters')
    .matches(new RegExp(/(?=.*[0-9])/), 'Must contain at least one number')
    .matches(
      new RegExp(/(?=.*[!@#$%^&*])/),
      'Must contain at least one !@#$%^&* special character',
    )
    .min(8, 'Must be at least 8 characters long')
    .trim('Spaces are not allowed')
    .strict()
    .required('La contraseña es obligatoria'),
  password_confirmation: string().oneOf([Yup.ref('password')], 'Passwords must match').required('La contraseña de confirmación es obligatoria'),
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

function useFormConfig(
  fields,
  customHandleSubmit,
) {
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
}

export default useFormConfig;
