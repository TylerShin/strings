import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { fromJS } from 'immutable';
import { INITIAL_CURRENT_USER } from './reducers/currentUser';

export function loadUser() {
  return dispatch => {
    Tracker.autorun(() => {
      dispatch({
        type: 'LOGGING_IN',
        isLoggingIn: Meteor.loggingIn(),
      });
    });

    Tracker.autorun(() => {
      let user = INITIAL_CURRENT_USER.get('user');
      if (!!Meteor.user()) {
        user = fromJS(Meteor.user());
      }
      dispatch({
        type: 'LOGIN',
        user,
      });
    });
  };
}
