import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  Meteor.publish('posts', ({ tagId, count }) => {
    if (tagId) {
      return Posts.find({ tagId }, { sort: { updatedAt: -1 }, limit: { count } });
    }
    return Posts.find({}, { sort: { updatedAt: -1 }, limit: { count } });
  });
}

Meteor.methods({
  'posts.insert'({ title, content, tagId }) {
    check(title, String);
    check(content, String);
    check(tagId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      tagId,
      title,
      content,
      userId: this.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, (err) => {
      if (err) {
        throw new Meteor.Error(err.message);
      }
    });
  },
});
