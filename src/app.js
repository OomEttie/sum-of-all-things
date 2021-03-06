import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { firebase } from './utils/firebase';
import AppRouter, { history } from './components/routers/AppRouter';
import LoadingPage from './components/loading/LoadingPage';

import { login, logout } from './actions/auth';
import { startListClients } from './actions/clients';
import { startListSchedules } from './actions/schedules';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startListClients()).then(() => {
      store.dispatch(startListSchedules()).then(() => {
        renderApp();
        if (history.location.pathname == '/') {
          history.push('/dashboard');
        }
      });
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
