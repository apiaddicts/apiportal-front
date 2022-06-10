import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NoNavRoutes from './NoNavRoutes';
import DashboardRoutes from './DashboardRoutes';

function AppNewRoute() {
  return (
    <Routes>
      <Route
        path='*'
        element={
          <PublicRoute />
        }
      />
      <Route
        path='/user/*'
        element={
          <NoNavRoutes />
        }
      />
      <Route
        path='/dashboard/*'
        element={(
          <PrivateRoute>
            <DashboardRoutes />
          </PrivateRoute>
        )}
      />
      {/* <Route path='confirmPassword' exact element={<ResetPassword />} />
        <Route path='confirmAccount' exact element={<ConfirmAccount />} /> */}

    </Routes>

  );
};

export default AppNewRoute;
