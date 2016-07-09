import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { login } from './actions';

class Signin extends React.Component {
  handleSignin(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { username, password } = this.refs;

    dispatch(login({
      username: username.value,
      password: password.value,
    }));
  }

  render() {
    return (
      <div className="signin-component">
        <form onSubmit={(e) => { this.handleSignin(e); }}>
          <label>아이디</label>
          <input type="text" placeholder="아이디" ref="username" />
          <label>암호</label>
          <input type="password" placeholder="암호" ref="password" />
          <button type="submit">로그인</button>
        </form>
        <span>아직까지 계정이 없으시다면? </span>
        <Link to="/signup">
          회원가입
        </Link>
        하세요.
      </div>
    );
  }
}

Signin.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
};

function mapStateToProps(state) {
  const { currentUser } = state;
  return {
    currentUser,
  };
}

export default connect(mapStateToProps)(Signin);
