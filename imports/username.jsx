import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';

class Username extends React.Component {
  render() {
    const { className, user } = this.props;
    return (
      <div className={className}>
        {user.get('username')}
      </div>
    );
  }
}

Username.propTypes = {
  user: ImmutablePropTypes.map.isRequired,
  userId: React.PropTypes.number.isRequired,
  usernameSubsReady: React.PropTypes.bool.isRequired,
  className: React.PropTypes.string,
};

export default createContainer(({ userId }) => {
  const usernameSubs = Meteor.subscribe('username', { userId });
  const usernameSubsReady = usernameSubs.ready();
  const user = fromJS(Meteor.users.findOne(userId));
  return {
    user,
    usernameSubsReady,
  };
}, Username);
