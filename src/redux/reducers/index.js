import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import gymReducer from './gymReducer';
import trainerReducer from './trainerReducer';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    gym: gymReducer,
    trainer: trainerReducer,
  });

export default createRootReducer;
