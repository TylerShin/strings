import { Accounts } from 'meteor/accounts-base'
import { browserHistory } from 'react-router';

export const createUser = ({ username, email, password }) => {
  return (dispatch) => {
    Accounts.createUser({
      username,
      email,
      password,
      profile: {
        admin: false,
        name: username,
      },
    }, (err) => {
      if (err) {
        alert('회원가입 중 문제가 발생했습니다!', err.reason);
      } else {
        browserHistory.push('/');
      }
    });
  };
};
