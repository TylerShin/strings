import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tags = new Mongo.Collection('tags');

if (Meteor.isServer) {
  Meteor.publish('tags', () => {
    return Tags.find({});
  });
}

Meteor.methods({
  'tags.insert'(tag) {
    check(tag, String);
    if (!this.userId && !Meteor.user().profile.admin) {
      throw new Meteor.Error('not-authorized');
    }

    Tags.insert({
      tag,
      createdAt: new Date(),
    });
  },
});
