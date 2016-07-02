import { fromJS } from 'immutable';

export const INITIAL_CURRENT_USER = fromJS({
  user: {},
  isLoggingIn: true,
});
export default function currentUserReducer(state = INITIAL_CURRENT_USER, action) {
  switch (action.type) {
    case 'LOGIN': {
      return state.set('user', action.user);
    }
    case 'LOGGING_IN': {
      return state.set('isLoggingIn', action.isLoggingIn);
    }
    case 'LOGOUT': {
      return state;
    }
    default:
      return state;
  }
}
