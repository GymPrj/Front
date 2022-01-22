import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import theme from './assets/style/theme';
import Router from './routes/Router';
import './assets/style/common.css';
import { store, persistor } from './redux/store';
import { history } from './redux/reducers';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
