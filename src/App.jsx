import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import AppRouter from './routers/AppRouter';
// import ExternalRouter from './routers/ExternalRouter';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      {/* <ExternalRouter /> */}
    </Provider>
  );
}

export default App;
