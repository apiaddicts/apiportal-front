import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ConfirmPassword from '../pages/no-nav/ConfirmPassword';
import ConfirmAccount from '../pages/no-nav/ConfirmAccount';
import Terms from '../pages/no-nav/Terms';
import PolicyPrivacy from '../pages/no-nav/PolicyPrivacy';
import LegalNotice from '../pages/no-nav/LegalNotice';

function NoNavRoutes() {
  return (
    <Routes>
      <Route path='/confirm-password' exact='true' element={<ConfirmPassword />} />
      <Route path='/confirm-account' exact='true' element={<ConfirmAccount />} />
      <Route path='/terms' exact='true' element={<Terms />} />
      <Route path='/policy-privacy' exact='true' element={<PolicyPrivacy />} />
      <Route path='/aviso-legal' exact='true' element={<LegalNotice />} />
    </Routes>
  );

}

export default NoNavRoutes;
