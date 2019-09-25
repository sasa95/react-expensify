import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { firebase } from './firebase/firebase';
import { history } from './routers/AppRouter';
import { login, logout } from './actions/auth';

const store = configureStore();

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    await store.dispatch(login(user.uid));
    await store.dispatch(startSetExpenses());

    renderApp();

    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

serviceWorker.unregister();
