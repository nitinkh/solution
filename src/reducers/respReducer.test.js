import respReducer from './respReducer';
import * as types from '../actions/actionTypes';

describe('respReducer', () => {
  it('should return the initial state', () => {
    expect(respReducer(undefined, {})).toEqual({
      path: [],
      error: null,
      errorMsg: '',
      total_time: null,
      total_distance: null,
      isLoading: false
    });
  });

  it('should handle fetch failure', () => {
    expect(
      respReducer(
        {},
        {
          type: types.FETCH_FAILURE,
          payload: { errorMsg: 'Some Error Occured' }
        }
      )
    ).toEqual({
      path: [],
      error: true,
      errorMsg: 'Some Error Occured',
      total_time: null,
      total_distance: null,
      isLoading: false
    });
  });
});
