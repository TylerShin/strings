import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import currentUser, { INITIAL_CURRENT_USER } from './reducers/currentUser';
import tags, { INITIAL_TAGS } from './reducers/tags';

export const initialState = {
  currentUser: INITIAL_CURRENT_USER,
  tags: INITIAL_TAGS,
};

const rootReducer = combineReducers({
  currentUser,
  tags,
  routing: routerReducer,
});

export default rootReducer;
