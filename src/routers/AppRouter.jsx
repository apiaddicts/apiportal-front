import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import NoNavRouter from './NoNavRouter';

function AppRouter() {
  return (
    <Routes>
      <Route
        path='*'
        element={
          <PublicRouter />
        }
      />
      <Route
        path='/user/*'
        element={
          <NoNavRouter />
        }
      />
      <Route
        path='/developer/*'
        element={(
          <PrivateRouter />
        )}
      />

    </Routes>

  );
};

export default AppRouter;
