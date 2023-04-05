import React from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import AppRouter from './routers/AppRouter';

function App() {
  return (
    <div className='app'>
      <Helmet>
        <title>Wolters Kluwer | Developer Portal</title>
        <meta name='author' content='CloudAppi México' />
        <meta name='description' content='Wolters Kluwer | Developer Portal description' />
        <meta property='og:title' content='Wolters Kluwer | Developer Portal' />
        <meta property='og:description' content='Wolters Kluwer | Developer Portal description' />
        <meta property='og:url' content={`${window.location.protocol}//${window.location.hostname}`} />
        <meta property='og:locale' content='es_MX' />
        <meta property='og:type' content='article' />
        <meta property='og:site_name' content='Wolters Kluwer | Developer Portal' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='Wolters Kluwer | Developer Portal' />
        <meta name='twitter:title' content='Wolters Kluwer | Developer Portal' />
        <meta name='twitter:description' content='Wolters Kluwer | Developer Portal description' />
        <meta name='twitter:image' content={`${window.location.protocol}//${window.location.hostname}`} />
      </Helmet>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
