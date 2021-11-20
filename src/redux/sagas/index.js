import { all, fork } from 'redux-saga/effects';

import authSage from './authSagas';

export default function* rootSaga() {
  yield all([fork(authSage)]);
}
