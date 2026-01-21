import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { thunk } from 'redux-thunk';

import homeReducer from './reducer/homeReducer';
import appPartnersReducer from './reducer/appPartnersReducer';
import faqReducer from './reducer/faqReducer';
import blogReducer from './reducer/blogReducer';
import codeSampleReducer from './reducer/codeSampleReducer';
import BillingReducer from './reducer/billingReducer';
import libraryReducer from './reducer/libraryReducer';
import userReducer from './reducer/userReducer';
import productReducer from './reducer/productReducer';
import subscriptionsReducer from './reducer/subscriptionsReducer';
import apiReducer from './reducer/apiReducer';
import emailReducer from './reducer/emailReducer';
import termReducer from './reducer/termReducer';
import policyReducer from './reducer/policyReducer';
import timeReducer from './reducer/timeReducer';
import usersReducer from './reducer/usersReducer';
import groupReducer from './reducer/groupReducer';
import appsReducer from './reducer/appsReducer';
import gettingStartedReducer from './reducer/gettingStartedReducer';
import apiManagerReducer from './reducer/apiManagerReducer';
import settingReducer from './reducer/settingReducer';
import authReducer from './reducer/authReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  home: homeReducer,
  apiManager: apiManagerReducer,
  appPartners: appPartnersReducer,
  faq: faqReducer,
  settingPage: settingReducer,
  blog: blogReducer,
  codeSampleReducer: codeSampleReducer,
  billing: BillingReducer,
  library: libraryReducer,
  user: userReducer,
  products: productReducer,
  suscripcions: subscriptionsReducer,
  api: apiReducer,
  email: emailReducer,
  term: termReducer,
  policy: policyReducer,
  timer: timeReducer,
  users: usersReducer,
  group: groupReducer,
  apps: appsReducer,
  started: gettingStartedReducer,
  auth: authReducer,
});

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
