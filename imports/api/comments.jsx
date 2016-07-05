import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Posts } from './posts';
import { SubPosts } from './subPosts';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  Meteor.publish('comments', ({ postId, before, count }) => {
    return Comments.find({ postId }, { sort: { updatedAt: 1 }, skip: before, limit: count });
  });
}

Meteor.methods({
  'comments.insert'({ content, postId, isPost }) {
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
      } else {
        const count = Comments.find({ postId }).count();
        if (isPost) {
          Posts.update(postId, { $set: { commentsCount: count } });
        } else {
          SubPosts.update(postId, { $set: { commentsCount: count } });
        }
      }
    });
  },
});
