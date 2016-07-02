import { Meteor } from 'meteor/meteor'
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';

const addUser = () => {
  return {
    type: 'LOGIN',
    user: fromJS(Meteor.user()),
  };
};

export const login = ({ username, password }) => {
  return (dispatch) => {
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        alert('로그인 중 에러가 발생했습니다.', err.message);
      } else {
        dispatch(addUser());
        dispatch(push('/'));
      }
    });
  };
};
