import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Navbar from './navbar/navbar';
import TagList from './taglist/taglist';

class App extends React.Component {
  render() {
    const { tags, currentUser, dispatch, children } = this.props;

    if (currentUser.get('isLoggingIn')) {
      return (
        <div>
          LOADING...
        </div>
      );
    }

    return (
      <div className="appComponent">
        <Navbar currentUser={currentUser} dispatch={dispatch} />
        {children}
        <TagList tags={tags} dispatch={dispatch} />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
  tags: ImmutablePropTypes.map.isRequired,
};

function mapStateToProps(state) {
  const { currentUser, tags } = state;
  return {
    currentUser,
    tags,
  };
}

export default connect(mapStateToProps)(App);
