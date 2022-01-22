import {
  TRAINER_DETAIL_REQUEST,
  TRAINER_DETAIL_FAILURE,
  TRAINER_DETAIL_SUCCESS,
  TRAINER_EDIT_MODE,
} from '../types';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  userId: '', // email
  errorMsg: '',
  // trainers: [],
  trainerDetail: {},
  editMode: false,
};

const authReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case TRAINER_DETAIL_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case TRAINER_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: payload.data.body.message,
      };
    case TRAINER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        trainerDetail: payload,
      };
    case TRAINER_EDIT_MODE:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        editMode: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
