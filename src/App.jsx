import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import AppNewRoute from './routers/AppNewRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppNewRoute />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
