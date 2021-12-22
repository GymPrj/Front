import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import axios from 'axios';
import {
  TRAINER_ADD_REQUEST,
  TRAINER_ADD_FAILURE,
  TRAINER_ADD_SUCCESS,
  TRAINER_DETAIL_REQUEST,
  TRAINER_DETAIL_FAILURE,
  TRAINER_DETAIL_SUCCESS,
  TRAINER_DELETE_REQUEST,
  TRAINER_DELETE_FAILURE,
  TRAINER_DELETE_SUCCESS,
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

// trainer detail
const trainerDetailAPI = req => {
  return req;
};

function* trainerDetail(action) {
  try {
    const result = yield call(trainerDetailAPI, action.payload);
    console.log(result, 'trainer detail Data');
    yield put({
      type: TRAINER_DETAIL_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log('error', e);
    yield put({
      type: TRAINER_DETAIL_FAILURE,
      payload: e.response,
    });
  }
}

function* watchTrainerDetail() {
  yield takeEvery(TRAINER_DETAIL_REQUEST, trainerDetail);
}

// trainer delete
const trainerDeleteAPI = req => {
  return axios.delete(`/trainer/${req}`);
};

function* trainerDelete(action) {
  try {
    const result = yield call(trainerDeleteAPI, action.payload);
    console.log(result, 'trainer delete Data');
    yield put({
      type: TRAINER_DELETE_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log('error', e);
    yield put({
      type: TRAINER_DELETE_FAILURE,
      payload: e.response,
    });
  }
}

function* watchTrainerDelete() {
  yield takeEvery(TRAINER_DELETE_REQUEST, trainerDelete);
}

export default function* trainerSagas() {
  yield all([
    fork(watchtrainerCreate),
    fork(watchTrainerDetail),
    fork(watchTrainerDelete),
  ]);
}
