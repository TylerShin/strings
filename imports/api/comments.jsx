import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  Meteor.publish('comments', ({ postId, before, count }) => {
    return Comments.find({ postId }, { sort: { updatedAt: 1 }, skip: before, limit: count });
  });
}

Meteor.methods({
  'comments.insert'({ content, postId }) {
    check(postId, String);
    check(content, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Comments.insert({
      postId,
      content,
      userId: this.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [], // Should be UserId
    }, (err) => {
      if (err) {
        throw new Meteor.Error(err.message);
      }
    });
  },
});
