import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Navbar from './navbar/navbar';

class App extends React.Component {
  render() {
    const { currentUser, children } = this.props;

    if (currentUser.get('isLoggingIn')) {
      return (
        <div>
          LOADING...
        </div>
      );
    }

    return (
      <div className="appComponent">
        <Navbar currentUser={currentUser} />
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
};

function mapStateToProps(state) {
  const { currentUser } = state;
  return {
    currentUser,
  };
}

export default connect(mapStateToProps)(App);
