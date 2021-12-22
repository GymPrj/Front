import {
  TRAINER_LIST_REQUEST,
  TRAINER_LIST_FAILURE,
  TRAINER_LIST_SUCCESS,
  GYM_DETAIL_INFO_REQUEST,
  GYM_DETAIL_INFO_FAILURE,
  GYM_DETAIL_INFO_SUCCESS,
} from '../types';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  userId: '', // email
  errorMsg: '',
  successMsg: '',
  trainerList: [],
  gymDetailInfo: {},
};

const gymReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case TRAINER_LIST_REQUEST:
    case GYM_DETAIL_INFO_REQUEST:
      return {
        ...state,
        payload,
        errorMsg: '',
        isLoading: true,
      };
    case TRAINER_LIST_FAILURE:
    case GYM_DETAIL_INFO_FAILURE:
      return {
        ...state,
        payload,
        errorMsg: payload.data.body.message,
        isLoading: false,
      };
    case TRAINER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        trainerList: payload,
      };
    case GYM_DETAIL_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        gymDetailInfo: payload,
      };
    default:
      return state;
  }
};

export default gymReducer;
