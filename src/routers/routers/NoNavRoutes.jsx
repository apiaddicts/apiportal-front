import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ResetPassword from '../../Pages/ResetPassword';
import ConfirmAccount from '../../Pages/ConfirmAccount';

function NoNavRoutes() {
  return (
    <Routes>
      <Route path='/confirm-password' exact element={<ResetPassword />} />
      <Route path='/confirm-account' exact element={<ConfirmAccount />} />
    </Routes>
  );

}

export default NoNavRoutes;
