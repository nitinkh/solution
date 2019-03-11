import * as actions from './index';
import * as types from './actionTypes';

describe('actions', () => {
  it('should create an action when there is backend failure', () => {
    const expectedAction = {
      type: types.FETCH_FAILURE,
      payload: { errorMsg: 'Error encountered on server' }
    };
    expect(actions.fetchFailure()).toEqual(expectedAction);
  });

  it('should create an action when backend call is success', () => {
    const payload = {
      status: 'success',
      path: [
        ['22.372081', '114.107877'],
        ['22.326442', '114.167811'],
        ['22.284419', '114.159510']
      ],
      total_distance: 20000,
      total_time: 1800
    };
    const expectedAction = {
      type: types.FETCH_SUCCESS,
      payload
    };
    expect(actions.fetchSuccess(payload)).toEqual(expectedAction);
  });
});
