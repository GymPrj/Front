import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import trainerReducer from './trainerReducer';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    trainer: trainerReducer,
  });

export default createRootReducer;
