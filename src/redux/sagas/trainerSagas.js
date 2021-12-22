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
  TRAINER_EDIT_REQUEST,
  TRAINER_EDIT_FAILURE,
  TRAINER_EDIT_SUCCESS,
  TRAINER_EDIT_MODE,
} from '../types';

// trainer Create
const trainerCreateAPI = req => {
  // console.log(req);
  return axios.post('/trainer', req.postData);
};

function* trainerCreate(action) {
  try {
    const result = yield call(trainerCreateAPI, action.payload);
    const { history, gymId } = action.payload;

    yield put({
      type: TRAINER_ADD_SUCCESS,
      payload: result.data,
    });

    alert('성공적으로 등록되었습니다.');
    history.push(`/gymDetail/${gymId}`);
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
  return axios.delete(`/trainer/${req.id}`);
};

function* trainerDelete(action) {
  try {
    const result = yield call(trainerDeleteAPI, action.payload);
    console.log(result, 'trainer delete Data');
    const { gymId, history } = action.payload;

    yield put({
      type: TRAINER_DELETE_SUCCESS,
      payload: result,
    });
    alert('트레이너를 삭제하였습니다.');
    history.push(`/gymDetail/${gymId}`);
  } catch (e) {
    yield put({
      type: TRAINER_DELETE_FAILURE,
      payload: e.response,
    });
    alert(e.response);
  }
}

function* watchTrainerDelete() {
  yield takeEvery(TRAINER_DELETE_REQUEST, trainerDelete);
}

// trainer edit
const trainerEditAPI = req => {
  return axios.put(`/trainer/${req.id}`);
};

function* trainerEdit(action) {
  try {
    const result = yield call(trainerEditAPI, action.payload);
    const { gymId, history } = action.payload;

    yield put({
      type: TRAINER_EDIT_SUCCESS,
      payload: result,
    });
    yield put({
      type: TRAINER_EDIT_MODE,
      payload: false,
    });
    alert('성공적으로 수정되었습니다.');
    history.push(`/gymDetail/${gymId}`);
  } catch (e) {
    yield put({
      type: TRAINER_EDIT_FAILURE,
      payload: e.response,
    });
    console.log(e.response);
    alert(e.response.data.body.message);
  }
}

function* watchTrainerEdit() {
  yield takeEvery(TRAINER_EDIT_REQUEST, trainerEdit);
}

export default function* trainerSagas() {
  yield all([
    fork(watchtrainerCreate),
    fork(watchTrainerDetail),
    fork(watchTrainerDelete),
    fork(watchTrainerEdit),
  ]);
}
