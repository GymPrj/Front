import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { createBrowserHistory } from 'history';
// import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import persistedReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };

// export const history = createBrowserHistory();
// const sagaMiddleware = createSagaMiddleware();

// const initialState = {};

// const middlewares = [sagaMiddleware, routerMiddleware(history)];
// const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// const composeEnhancer =
//   process.env.NODE_ENV === 'production' ? compose : devtools;

// const store = createStore(
//   persistedReducer,
//   initialState,
//   composeEnhancer(applyMiddleware(...middlewares)),
// );
// sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);

// export default store;
