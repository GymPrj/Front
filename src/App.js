import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './routes/Router';
import './assets/css/common.css';
import { store, persistor } from './redux/store';
import { history } from './redux/reducers';

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
