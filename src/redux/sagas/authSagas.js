import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import axios from 'axios';
import {
  GYM_REGISTER_SUCCESS,
  GYM_REGISTER_FAILURE,
  GYM_REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
} from '../types';

// Register
const MembergisterAPI = req => {
  console.log(req, 'req');
  return axios.post('/member/join', req);
};

function* Membergister(action) {
  try {
    const result = yield call(MembergisterAPI, action.payload);
    console.log(result, 'Member RegisterUser Data');
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

function* watchMemberRegister() {
  yield takeEvery(REGISTER_REQUEST, Membergister);
}

// Gym Register
const gymRegisterAPI = req => {
  console.log(req, 'req');
  return axios.post('/gym/join', req);
};

function* gymRegister(action) {
  try {
    const result = yield call(gymRegisterAPI, action.payload);
    console.log(result, 'Gum RegisterUser Data');
    yield put({
      type: GYM_REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log('error', e);
    yield put({
      type: GYM_REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchgymRegister() {
  yield takeEvery(GYM_REGISTER_REQUEST, gymRegister);
}

export default function* authSaga() {
  yield all([fork(watchgymRegister), fork(watchMemberRegister)]);
}
