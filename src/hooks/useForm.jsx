/* eslint-disable prefer-regex-literals */
import { useFormik } from 'formik';
import { useState } from 'react';
import { string, bool } from 'yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  first_name: string().required('Campo obligatorio').matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'No se permiten caracteres especiales o númericos').max(50, 'Se ha excedido el número de caracteres permitidos'),
  last_name: string().required('Campo obligatorio').matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'No se permiten caracteres especiales o númericos').max(50, 'Se ha excedido el número de caracteres permitidos'),
  email: string().email('Correo electrónico inválido').required('Campo obligatorio'),
  terms: bool().oneOf([true], 'Debes aceptar los términos y condiciones'),
  password: string()
    .min(8, 'La contraseña debe tener al menos 8 carácteres de longitud')
    .max(16, 'Se ha excedido el número de caracteres permitidos')
    .trim('Los espacios no estan permitidos')
    .strict()
    .required('Campo obligatorio'),
  password_confirmation: string().oneOf([Yup.ref('password')], 'La contraseñas y la confirmación de contraseña deben coincidir').required('Campo oligatorio'),
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
