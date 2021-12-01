import {
  // LOGIN_REQUEST,
  // LOGIN_SUCCESS,
  // LOGIN_FAILURE,
  // LOGOUT_REQUEST,
  // LOGOUT_SUCCESS,
  // LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../types';

const initialState = {
  token: null, // jwb 토큰
  isLoading: false,
  email: '', // email
  errorMsg: '',
  successMsg: '',
};

const authReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        payload,
        errorMsg: '',
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false,
        email: payload.email,
        errorMsg: '',
        successMsg: '회원가입에 성공하였습니다.',
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        ...payload,
        token: null,
        user: null,
        email: null,
        isLoading: false,
        errorMsg: payload.data.body.message,
      };
    default:
      return state;
  }
};

export default authReducer;
