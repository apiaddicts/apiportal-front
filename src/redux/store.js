import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import demoReducer from './reducer/demoReducer';
import faqReducer from './reducer/faqReducer';
import blogReducer from './reducer/blogReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  demo: demoReducer,
  faq: faqReducer,
  blog: blogReducer,
});

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
