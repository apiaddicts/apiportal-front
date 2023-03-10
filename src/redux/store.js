import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import homeReducer from './reducer/homeReducer';
import faqReducer from './reducer/faqReducer';
import blogReducer from './reducer/blogReducer';
import libraryReducer from './reducer/libraryReducer';
import userReducer from './reducer/userReducer';
import productReducer from './reducer/productReducer';
import subscriptionsReducer from './reducer/subscriptionsReducer';
import apiReducer from './reducer/apiReducer';
import mailReducer from './reducer/mailReducer';
import termReducer from './reducer/termReducer';
import policyReducer from './reducer/policyReducer';
import timeReducer from './reducer/timeReducer';
import usersReducer from './reducer/usersReducer';
import groupReducer from './reducer/groupReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  home: homeReducer,
  faq: faqReducer,
  blog: blogReducer,
  library: libraryReducer,
  user: userReducer,
  products: productReducer,
  suscripcions: subscriptionsReducer,
  api: apiReducer,
  mail: mailReducer,
  term: termReducer,
  policy: policyReducer,
  timer: timeReducer,
  users: usersReducer,
  groups: groupReducer,
});

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
