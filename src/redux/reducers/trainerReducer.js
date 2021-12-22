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
    case TRAINER_DELETE_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case TRAINER_ADD_FAILURE:
    case TRAINER_DETAIL_FAILURE:
    case TRAINER_DELETE_FAILURE:
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
    case TRAINER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        // trainerDetail: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
