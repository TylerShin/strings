import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor';
import { fromJS } from 'immutable';

const addUser = () => {
  return {
    type: 'LOGIN',
    user: fromJS(Meteor.user()),
  };
};

export const createUser = ({ username, email, password }) => {
  return (dispatch) => {
    Accounts.createUser({ username, email, password }, (err) => {
      if (err) {
        alert('회원가입 중 문제가 발생했습니다!', err.reason);
      } else {
        dispatch(addUser());
      }
    });
  };
};
