import {
  TRAINER_ADD_REQUEST,
  TRAINER_ADD_FAILURE,
  TRAINER_ADD_SUCCESS,
} from '../types';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  userId: '', // email
  errorMsg: '',
  successMsg: '',
  trainers: [],
};

const authReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case TRAINER_ADD_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
        trainers: [],
      };
    case TRAINER_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
      };
    case TRAINER_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: payload.data.body.message,
      };
    default:
      return state;
  }
};

export default authReducer;
