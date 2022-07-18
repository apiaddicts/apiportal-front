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
        <title>Seguros Sura API Market</title>
        <meta name='author' content='CloudAppi México' />
        <meta name='description' content='Seguros Sura API Market description' />
        <meta property='og:title' content='Seguros Sura API Market' />
        <meta property='og:image' content='https://apimarket-dev.segurossura.com.mx/static/media/sura_logo.fb3321719796ca3ec873142ecdaae65d.svg' />
        <meta property='og:description' content='API Market description' />
        <meta property='og:url' content={`${window.location.protocol}//${window.location.hostname}`} />
        <meta property='og:locale' content='es_MX' />
        <meta property='og:type' content='article' />
        <meta property='og:site_name' content='Seguros Sura API Market' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='Seguros Sura API Market' />
        <meta name='twitter:title' content='Seguros Sura API Market' />
        <meta name='twitter:description' content='Seguros Sura API Market description' />
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
