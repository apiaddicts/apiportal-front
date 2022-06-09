import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ResetPassword from '../../Pages/ResetPassword';
import ConfirmAccount from '../../Pages/ConfirmAccount';

function NoNavRoutes() {
  return (
    <Routes>
      <Route path='/confirmPassword' exact element={<ResetPassword />} />
      <Route path='/confirmAccount' exact element={<ConfirmAccount />} />
    </Routes>
  );

}

export default NoNavRoutes;
