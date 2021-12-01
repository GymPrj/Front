import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import axios from 'axios';
import {
  TRAINER_ADD_REQUEST,
  TRAINER_ADD_FAILURE,
  TRAINER_ADD_SUCCESS,
} from '../types';

// trainer Create
const trainerCreateAPI = req => {
  console.log(req, 'req');
  return axios.post('/trainer', req);
};

function* trainerCreate(action) {
  try {
    const result = yield call(trainerCreateAPI, action.payload);
    console.log(result, 'trainer Create Data');
    yield put({
      type: TRAINER_ADD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log('error', e);
    yield put({
      type: TRAINER_ADD_FAILURE,
      payload: e.response,
    });
  }
}

function* watchtrainerCreate() {
  yield takeEvery(TRAINER_ADD_REQUEST, trainerCreate);
}

export default function* trainerSagas() {
  yield all([fork(watchtrainerCreate)]);
}
