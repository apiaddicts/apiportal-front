import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import NoNavRouter from './NoNavRouter';
import FrameRouter from './FrameRouter';
import ScrollToTop from './ScrollToTop';

function AppRouter({ isAppReady }) {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route
        path='/frame/*'
        element={
          <FrameRouter />
        }
      />
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
    </>
  );
};

export default AppRouter;
