import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import theme from './assets/style/theme';
import store, { history } from './redux/store';
import Router from './routes/Router';

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
