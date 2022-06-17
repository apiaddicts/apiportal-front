import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ResetPassword from '../../Pages/ResetPassword';
import ConfirmAccount from '../../Pages/ConfirmAccount';

function NoNavRoutes() {
  return (
    <Routes>
      <Route path='/confirm-password' exact='true' element={<ResetPassword />} />
      <Route path='/confirm-account' exact='true' element={<ConfirmAccount />} />
    </Routes>
  );

}

export default NoNavRoutes;
