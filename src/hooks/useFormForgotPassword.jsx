/* eslint-disable prefer-regex-literals */
import { useFormik } from 'formik';
import { useState } from 'react';
import { string } from 'yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: string().email('Please provide a valid email').required('El email es obligatorio'),
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

function useFormForgotPassword(
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
      try {
        setFormStatus({ status: 'loading' });
        const submitResponse = await customHandleSubmit(values);
        console.log('submitResponse', submitResponse);
        setFormStatus(submitResponse);
        submitResponse.status === 'success' && resetForm();
      } catch (error) {
        console.log('Error', error);
      }
    },
    validationSchema,
    enableReinitialize: true,
  });

  return { ...formik, formStatus, setFormStatus };
}

export default useFormForgotPassword;
