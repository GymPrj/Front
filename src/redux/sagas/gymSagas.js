import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import axios from 'axios';
import {
  GYM_SEARCH_REQUEST,
  GYM_SEARCH_FAILURE,
  GYM_SEARCH_SUCCESS,
  TRAINER_LIST_REQUEST,
  TRAINER_LIST_FAILURE,
  TRAINER_LIST_SUCCESS,
  GYM_DETAIL_INFO_REQUEST,
  GYM_DETAIL_INFO_FAILURE,
  GYM_DETAIL_INFO_SUCCESS,
} from '../types';

// gym search
const gymSearchAPI = req => {
  return axios.get('/gym', req);
};

function* gymSearch(action) {
  try {
    const result = yield call(gymSearchAPI, action.payload);
    // console.log(result, 'gym search Data');
    yield put({
      type: GYM_SEARCH_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log('error', e);
    yield put({
      type: GYM_SEARCH_FAILURE,
      payload: e.response,
    });
  }
}

function* watchGymSearch() {
  yield takeEvery(GYM_SEARCH_REQUEST, gymSearch);
}

// gym trainer list
const trainerListAPI = req => {
  return axios.get(`/trainer/gym/${req}`);
};

function* trainerList(action) {
  try {
    const result = yield call(trainerListAPI, action.payload);
    console.log(result, 'trainer list Data');
    yield put({
      type: TRAINER_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.log('error', e);
    yield put({
      type: TRAINER_LIST_FAILURE,
      payload: e.response,
    });
  }
}

function* watchTrainerList() {
  yield takeEvery(TRAINER_LIST_REQUEST, trainerList);
}

// gym detail info
const gymDetailInfoAPI = req => {
  // return axios.get(`/trainer/gym/${req}`);
  return req;
};

function* gymDetailInfo(action) {
  try {
    const result = yield call(gymDetailInfoAPI, action.payload);
    console.log(result, 'trainer list Data');
    yield put({
      type: GYM_DETAIL_INFO_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log('error', e);
    yield put({
      type: GYM_DETAIL_INFO_FAILURE,
      payload: e.response,
    });
  }
}

function* watchGymDetailInfo() {
  yield takeEvery(GYM_DETAIL_INFO_REQUEST, gymDetailInfo);
}

export default function* gymSagas() {
  yield all([
    fork(watchGymSearch),
    fork(watchTrainerList),
    fork(watchGymDetailInfo),
  ]);
}
