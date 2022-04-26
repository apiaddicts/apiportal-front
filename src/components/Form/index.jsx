import React, { useState } from 'react';
import Button from '../Buttons/Button';
import Input from '../Input';

function Form({ handleSubmit }) {
  const [dataForm, setDataForm] = useState({});

  const handleInputChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={(e) => {
      handleSubmit(e, dataForm);
    }}
    >
      <div className='my-2 w-full'>
        <Input
          placeholder='Email'
          type='email'
          name='email'
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </div>
      <div className='my-2 w-full'>
        <Input
          placeholder='Password'
          type='password'
          name='password'
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </div>
      <div>
        <Button styles='secundary' type='submit'>
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
};

export default Form;
