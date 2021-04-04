import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import { typePendingReducerSet, TypeReduxPendingState, createTypeReduxInitialState, typeReduxMiddleware } from '@gulabs/redux-async-lib';
import assign from 'object-assign';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as WindowStateReducer from './reducers/window-state-reducer';
import * as BookReducer from './reducers/book-reducer';

export const rootReducer = combineReducers({
  ...typePendingReducerSet,
  windowState: WindowStateReducer.reducer,
  bookState: BookReducer.reducer,
});

export interface RootState extends TypeReduxPendingState {
  windowState: WindowStateReducer.IState;
  bookState: BookReducer.IState;
}

export const InitialState: RootState = assign(createTypeReduxInitialState(), {
  windowState: WindowStateReducer.initialState,
  bookState: BookReducer.initialState
});

const middlewares = [typeReduxMiddleware, promiseMiddleware];

export const configureStore = (preloadedState: RootState = InitialState, clientEnv: string = '') => {
  // load 'Redux DevTools Extension' if exists (ONLY when env=development)
  let env: string = (typeof document === 'undefined') ? (process.env.NODE_ENV || '') : (clientEnv || '');

  // see https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
  let composeEnhancers = (
    env === 'development' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  // create redux store
  return createStore(
    rootReducer, 
    preloadedState, 
    composeWithDevTools(applyMiddleware(...middlewares)),
    // composeEnhancers(applyMiddleware(...middlewares))
    // applyMiddleware(...middlewares)
    );
};
