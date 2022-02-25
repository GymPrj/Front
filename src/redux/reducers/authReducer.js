import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GYM_REGISTER_SUCCESS,
  GYM_REGISTER_FAILURE,
  GYM_REGISTER_REQUEST,
} from '../types';

const initialState = {
  token: '', // jwb 토큰
  isLoading: false,
  email: '', // email
  errorMsg: '',
  successMsg: '',
};

const trainerReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case REGISTER_REQUEST:
    case GYM_REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        payload,
        errorMsg: '',
        isLoading: true,
      };
    case REGISTER_SUCCESS:
    case GYM_REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:  
      return {
        ...state,
        ...payload,
        isLoading: false,
        email: payload.email,
        errorMsg: '',
        successMsg: '로그인에 성공했습니다',
      };
    case REGISTER_FAILURE:
    case GYM_REGISTER_FAILURE:
    case LOGIN_FAILURE:  
    case LOGOUT_FAILURE:
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

export default trainerReducer;
