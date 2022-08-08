/* eslint-disable prefer-regex-literals */
import { useFormik } from 'formik';
import { useState } from 'react';
import { string } from 'yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: string().min(8, 'La contraseña actual debe tener al menos 8 carácteres de longitud').required('Campo requerido').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/, 'Su contraseña debe tener al menos 1 letra mayúscula, 1 letra minuscula, 1 número y 1 caracter'),
  new_password: string().min(8, 'La nueva contraseña debe tener al menos 8 carácteres de longitud').required('Campo requerido').trim('Los espacios no estan permitidos'),
  confirm_password: string().required('La confirmación de contraseña es obligatoria').oneOf([Yup.ref('new_password'), null], 'La nueva contraseña y la confirmación de contraseña deben coincidir'),
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

function useFormRestorePassword(
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
