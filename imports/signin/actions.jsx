import { Meteor } from 'meteor/meteor'
import { push } from 'react-router-redux';

export const login = ({ username, password }) => {
  return (dispatch) => {
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        alert('로그인 중 에러가 발생했습니다.', err.message);
      } else {
        dispatch(push('/'));
      }
    });
  };
};
