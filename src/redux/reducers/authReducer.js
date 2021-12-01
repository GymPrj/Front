import {
  // LOGIN_REQUEST,
  // LOGIN_SUCCESS,
  // LOGIN_FAILURE,
  // LOGOUT_REQUEST,
  // LOGOUT_SUCCESS,
  // LOGOUT_FAILURE,
  REGISTER_REQUEST,
  // REGISTER_SUCCESS,
  // REGISTER_FAILURE,
} from '../types';

const initialState = {
  token: null, // jwb 토큰
  isLoading: false,
  userId: '', // email
  errorMsg: '',
  successMsg: '',
};

const trainerReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        payload,
        errorMsg: '',
        isLoading: true,
      };
    default:
      return state;
  }
};

export default trainerReducer;
