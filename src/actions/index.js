import axios from '../axios';
import {
  FECTH_INPROGRESS,
  FETCH_FAILURE,
  FETCH_SUCCESS
} from '../actions/actionTypes';

export const fetchInProgress = () => {
  return {
    type: FECTH_INPROGRESS
  };
};

export const fetchToken = (origin, destination) => {
  return dispatch => {
    let data = {
      origin,
      destination
    };
    dispatch(fetchInProgress());
    axios
      .post('/route', data)
      .then(response => dispatch(fetchPathDetails(response.data.token)))
      .catch(error => dispatch(fetchFailure()));
  };
};

export const fetchFailure = () => {
  return {
    type: FETCH_FAILURE,
    payload: { errorMsg: 'Some Error Occured' }
  };
};

export const fetchSuccess = response => {
  return {
    type: FETCH_SUCCESS,
    payload: response
  };
};

export const fetchPathDetails = token => {
  return dispatch => {
    axios
      .get(`/route/${token}`)
      .then(response => {
        if (response.data.status === 'in progress') {
          dispatch(fetchPathDetails(token));
        } else {
          dispatch(fetchSuccess(response.data));
        }
      })
      .catch(error => {
        dispatch(fetchFailure());
      });
  };
};
