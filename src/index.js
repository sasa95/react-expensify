import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './firebase/firebase';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';

const store = configureStore();

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});

serviceWorker.unregister();
