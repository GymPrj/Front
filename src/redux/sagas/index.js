import { all, fork } from 'redux-saga/effects';

import authSage from './authSagas';
import gymSagas from './gymSagas';
import trainerSagas from './trainerSagas';

export default function* rootSaga() {
  yield all([fork(authSage), fork(gymSagas), fork(trainerSagas)]);
}
