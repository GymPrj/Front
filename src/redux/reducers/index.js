import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './authReducer';
import gymReducer from './gymReducer';
import blacklistReducer from './blacklistReducer';
import trainerReducer from './trainerReducer';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['blacklists'],
}; // 추가

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  gym: gymReducer,
  trainer: trainerReducer,
  blacklists: blacklistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
