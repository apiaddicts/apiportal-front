import React, { useState } from 'react';
import Input from '../Input';

function Form() {
  const [dataForm, setDataForm] = useState({});

  const handleInputChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className='my-2 w-full'>
        <Input placeholder='Email' type='email' name='email' onChange={handleInputChange} />
      </div>
      <div className='my-2 w-full'>
        <Input placeholder='Password' type='password' name='password' onChange={handleInputChange} />
      </div>
    </>
  );
};

export default Form;
