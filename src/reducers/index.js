import { combineReducers } from 'redux';
import respReducer from './respReducer';

const rootReducer = combineReducers({
  resp: respReducer
});

export default rootReducer;
