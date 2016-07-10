import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('username', ({ userId }) => {
    return Meteor.users.find(userId, { fields: { username: 1 } });
  });
}
