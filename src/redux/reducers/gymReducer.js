import {
  GYM_TRAINER_REQUEST,
  GYM_TRAINER_FAILURE,
  GYM_TRAINER_SUCCESS,
  GYM_SEARCH_REQUEST,
  GYM_SEARCH_FAILURE,
  GYM_SEARCH_SUCCESS,
  TRAINER_LIST_REQUEST,
  TRAINER_LIST_FAILURE,
  TRAINER_LIST_SUCCESS,
} from '../types';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  userId: '', // email
  errorMsg: '',
  successMsg: '',
  findTrainerByGymId: 0,
  gymSearchList: [],
  trainerList: [],
};

const gymReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case GYM_TRAINER_REQUEST:
    case GYM_SEARCH_REQUEST:
    case TRAINER_LIST_REQUEST:
      return {
        ...state,
        payload,
        errorMsg: '',
        isLoading: true,
      };
    case GYM_TRAINER_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        findTrainerByGymId: payload,
      };
    case GYM_TRAINER_FAILURE:
    case GYM_SEARCH_FAILURE:
    case TRAINER_LIST_FAILURE:
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
    case TRAINER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        trainerList: payload,
      };
    default:
      return state;
  }
};

export default gymReducer;
