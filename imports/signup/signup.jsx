import React from 'react';
import { createUser } from './actions';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

class Signup extends React.Component {
  handleSignup(e) {
    e.preventDefault();
    const { username, password, email, passwordConfirmation } = this.refs;
    const { dispatch } = this.props;

    if (password.value !== passwordConfirmation.value) {
      return alert('암호와 암호확인이 다릅니다. 다시 한 번 확인해주세요');
    }
    return dispatch(createUser({
      username: username.value,
      email: email.value,
      password: password.value,
    }));
  }

  render() {
    return (
      <div className="signup-component">
        <div className="signup-header">
          <h2 className="signup-header-title">가입 전 주의사항</h2>
          <div className="signup-header-description">
            Strings는 익명기반 서비스입니다.
            회원가입은 오직 개인화 서비스를 위해서만 필요하며, 어떠한 개인정보도 요구하지 않습니다.
          </div>
        </div>
        <form onSubmit={(e) => { this.handleSignup(e); }}>
          <label>아이디</label>
          <input type="text" placeholder="아이디" ref="username" />
          <label>이메일</label>
          <input type="email" placeholder="이메일" ref="email" />
          <label>암호</label>
          <input type="password" placeholder="암호" ref="password" />
          <label>암호확인</label>
          <input type="password" placeholder="암호 확인" ref="passwordConfirmation" />
          <button type="submit">회원가입</button>
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
};

function mapStateToProps(state) {
  const { currentUser } = state;
  return {
    currentUser,
  };
}

export default connect(mapStateToProps)(Signup);
