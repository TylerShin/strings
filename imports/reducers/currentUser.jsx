import { Map } from 'immutable';

export const INITIAL_CURRENT_USER = Map();
export default function currentUserReducer(state = INITIAL_CURRENT_USER, action) {
  switch (action.type) {
    case 'LOGIN': {
      return action.user;
    }
    case 'LOGOUT': {
      return state;
    }
    default:
      return state;
  }
}
