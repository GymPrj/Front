import {
  // GYM_SEARCH_REQUEST,
  // GYM_SEARCH_FAILURE,
  // GYM_SEARCH_SUCCESS,
  // TRAINER_ADD_REQUEST,
  // TRAINER_ADD_FAILURE,
  // TRAINER_ADD_SUCCESS,
  // TRAINER_EDIT_REQUEST,
  // TRAINER_EDIT_FAILURE,
  // TRAINER_EDIT_SUCCESS,
  // TRAINER_DELETE_REQUEST,
  // TRAINER_DELETE_FAILURE,
  // TRAINER_DELETE_SUCCESS,
  COMMENT_ADD,
  COMMENT_EDIT,
  COMMENT_DELETE,
} from '../types';

const initialState = {
  errorMsg: '',
  isAuthenticated: null,
  isLoading: false,
  gymSearchList: [],
  comment:[]
};

const blacklistReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case TRAINER_ADD_REQUEST:
    case GYM_SEARCH_REQUEST:
    case TRAINER_EDIT_REQUEST:
    case TRAINER_DELETE_REQUEST:
    case COMMENT_ADD:
    case COMMENT_DELETE:
    case COMMENT_EDIT:      
      return {
        ...state,
        payload,
        errorMsg: '',
        isLoading: true,
      };
    case TRAINER_ADD_FAILURE:
    case GYM_SEARCH_FAILURE:
    case TRAINER_EDIT_FAILURE:
    case TRAINER_DELETE_FAILURE:
      return {
        ...state,
        payload,
        errorMsg: payload.data.body.message,
        isLoading: false,
      };
    case TRAINER_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
      };
    case TRAINER_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
      };
    case GYM_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        gymSearchList: payload.content,
      };

    case TRAINER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
      };
    default:
      return state;
  }
};

export default blacklistReducer;
