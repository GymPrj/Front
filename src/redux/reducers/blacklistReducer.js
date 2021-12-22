import {
  GYM_SEARCH_REQUEST,
  GYM_SEARCH_FAILURE,
  GYM_SEARCH_SUCCESS,
} from '../types';

const initialState = {
  gymSearchList: [],
};

const blacklistReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case GYM_SEARCH_REQUEST:
      return {
        ...state,
        payload,
        errorMsg: '',
        isLoading: true,
      };
    case GYM_SEARCH_FAILURE:
      return {
        ...state,
        payload,
        errorMsg: payload.data.body.message,
        isLoading: false,
      };
    case GYM_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        gymSearchList: payload.content,
      };
    default:
      return state;
  }
};

export default blacklistReducer;
