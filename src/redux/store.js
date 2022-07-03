import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import homeReducer from './reducer/homeReducer';
import faqReducer from './reducer/faqReducer';
import blogReducer from './reducer/blogReducer';
import libraryReducer from './reducer/libraryReducer';
import userReducer from './reducer/userReducer';
import productReducer from './reducer/productReducer';
import subscriptionsReducer from './reducer/subscriptionsReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  home: homeReducer,
  faq: faqReducer,
  blog: blogReducer,
  library: libraryReducer,
  user: userReducer,
  products: productReducer,
  suscripcions: subscriptionsReducer,
});

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
