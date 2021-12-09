import {
  TRAINER_ADD_REQUEST,
  TRAINER_ADD_FAILURE,
  TRAINER_ADD_SUCCESS,
  TRAINER_DETAIL_REQUEST,
  TRAINER_DETAIL_FAILURE,
  TRAINER_DETAIL_SUCCESS,
} from '../types';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  userId: '', // email
  errorMsg: '',
  successMsg: '',
  trainers: [],
  trainerDetail: {},
};

const authReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case TRAINER_ADD_REQUEST:
    case TRAINER_DETAIL_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case TRAINER_ADD_FAILURE:
    case TRAINER_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: payload.data.body.message,
      };
    case TRAINER_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
      };
    case TRAINER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        trainerDetail: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
