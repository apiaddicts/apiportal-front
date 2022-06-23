import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';
import NoNavRoutes from './routers/NoNavRoutes';

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
        path='/developer/*'
        element={(
          <PrivateRoute />
        )}
      />

    </Routes>

  );
};

export default AppNewRoute;
