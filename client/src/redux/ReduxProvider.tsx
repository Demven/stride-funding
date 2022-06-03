import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { initialState } from './initial-state';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider (props:ReduxProviderProps) {
  const { children } = props;

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
