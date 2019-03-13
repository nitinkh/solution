import {
  FECTH_INPROGRESS,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  RESET
} from '../actions/actionTypes';

const initialState = {
  path: [],
  error: null,
  errorMsg: '',
  totalTime: null,
  totalDistance: null,
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FECTH_INPROGRESS: {
      return { ...state, isLoading: true };
    }
    case FETCH_FAILURE: {
      return {
        ...state,
        error: true,
        errorMsg: action.payload.errorMsg,
        isLoading: false,
        totalDistance: null,
        totalTime: null,
        path: []
      };
    }
    case FETCH_SUCCESS: {
      if (action.payload.status === 'failure') {
        return {
          ...state,
          error: true,
          errorMsg: action.payload.error,
          totalDistance: null,
          totalTime: null,
          isLoading: false,
          path: []
        };
      } else if (action.payload.status === 'success') {
        return {
          ...state,
          error: false,
          path: [...action.payload.path],
          totalTime: action.payload.total_time,
          totalDistance: action.payload.total_distance,
          isLoading: false
        };
      } else {
        return state;
      }
    }
    case RESET: {
      return {
        path: [],
        error: null,
        errorMsg: '',
        totalTime: null,
        totalDistance: null,
        isLoading: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
