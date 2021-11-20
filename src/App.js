import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './redux/store';
import Router from './routes/Router';
import './assets/css/common.css';

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
