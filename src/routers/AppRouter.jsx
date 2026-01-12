import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import NoNavRouter from './NoNavRouter';

function AppRouter({ isAppReady }) {
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
          <PrivateRouter isAppReady={isAppReady} />
        )}
      />

    </Routes>

  );
};

export default AppRouter;
