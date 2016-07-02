import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import currentUser, { INITIAL_CURRENT_USER } from './reducers/currentUser';

export const initialState = {
  currentUser: INITIAL_CURRENT_USER,
};

const rootReducer = combineReducers({
  currentUser,
  routing: routerReducer,
});

export default rootReducer;
