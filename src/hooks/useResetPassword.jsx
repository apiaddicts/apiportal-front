import { useFormik } from 'formik';
import { useState } from 'react';
import { string, number } from 'yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  new__password: string().required('Campo requerido').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/, 'Su contraseña debe tener al menos una letra mayúscula, una letra minuscula, un número y un caracter especial (@$!%*?&).'),
  confirm_password: string().oneOf([Yup.ref('new_password'), null], 'Las contraseñas no coinciden').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/, 'Su contraseña debe tener al menos una letra mayúscula, una letra minuscula, un número y un caracter especial (@$!%*?&).'),
  minLength: number().min(8),
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

function useResetPassword(fields, customHandleSubmit) {
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

export default useResetPassword;
