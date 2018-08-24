import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import { clientsReducer } from '../reducers/clients';
import { schedulesReducer } from '../reducers/schedules';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      clients: clientsReducer,
      schedules: schedulesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
