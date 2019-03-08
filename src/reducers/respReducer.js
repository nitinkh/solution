import {
  FECTH_INPROGRESS,
  FETCH_FAILURE,
  FETCH_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  path: [],
  error: null,
  errorMsg: '',
  total_time: null,
  total_distance: null,
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
        total_distance: null,
        total_time: null,
        path: []
      };
    }
    case FETCH_SUCCESS: {
      if (action.payload.status === 'failure') {
        return {
          ...state,
          error: true,
          errorMsg: action.payload.error,
          total_distance: null,
          total_time: null,
          isLoading: false,
          path: []
        };
      } else if (action.payload.status === 'success') {
        return {
          ...state,
          error: false,
          path: [...action.payload.path],
          total_time: action.payload.total_time,
          total_distance: action.payload.total_distance,
          isLoading: false
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export default reducer;
