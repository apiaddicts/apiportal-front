import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {

  const { id, token } = useSelector((state) => state.user);

  const privateSession = id !== '' && token !== '';
  return privateSession ?
    children :
    <Navigate to='/' />;

}

export default PrivateRoute;
