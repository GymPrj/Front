import {
  GYM_TRAINER_REQUEST,
  GYM_TRAINER_FAILURE,
  GYM_TRAINER_SUCCESS,
} from '../types';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  userId: '', // email
  errorMsg: '',
  successMsg: '',
  findTrainerByGymId: 0,
};

const gymReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case GYM_TRAINER_REQUEST:
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
      return {
        ...state,
        payload,
        errorMsg: payload.data.body.message,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default gymReducer;
