import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from "redux-thunk";

import { demoReducer } from './reducer/demoReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    demo: demoReducer
})


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);