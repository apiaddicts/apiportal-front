import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRouter from './routers/AppRouter';
// import ExternalRouter from './routers/ExternalRouter';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      {/* <ExternalRouter /> */}
    </Provider>
  );
}

export default App;
