import { useState } from 'react';
import { useFormik } from 'formik';

const useSearch = ({ initialState }) => {
  const [value, setValue] = useState(initialState);

  const formik = useFormik({
    initialValues: initialState,
  });
  return {
    value,
    setValue,
    formik,
  };
};

export default useSearch;
