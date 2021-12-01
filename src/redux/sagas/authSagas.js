import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST } from '../types';

// Register
const gymRegisterUserAPI = req => {
  console.log(req, 'req');
  return axios.post('/gym/join', req);
};

function* gymRegisterUser(action) {
  try {
    const result = yield call(gymRegisterUserAPI, action.payload);
    console.log(result, 'Gum RegisterUser Data');
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log('error', e);
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchgymRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, gymRegisterUser);
}

export default function* rootSaga() {
  yield all([fork(watchgymRegisterUser)]);
}
