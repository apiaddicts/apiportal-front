import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ConfirmPassword from '../pages/no-nav/ConfirmPassword';
import ConfirmAccount from '../pages/no-nav/ConfirmAccount';

function NoNavRoutes() {
  return (
    <Routes>
      <Route path='/confirm-password' exact='true' element={<ConfirmPassword />} />
      <Route path='/confirm-account' exact='true' element={<ConfirmAccount />} />
    </Routes>
  );

}

export default NoNavRoutes;
