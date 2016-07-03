import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tags } from './tags';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  Meteor.publish('posts', ({ tagId, count }) => {
    return Posts.find({ tagId }, { sort: { updatedAt: -1 }, limit: count });
  });

  Meteor.publish('post', ({ postId }) => {
    return Posts.find({ _id: postId });
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
      views: 0,
      likes: [], // Should be UserId
      subPostsCount: 0,
      commentsCount: 0,
      clipedCount: 0,
    }, (err) => {
      if (err) {
        throw new Meteor.Error(err.message);
      } else {
        const postsCount = Posts.find({ tagId }).count();
        Tags.update(tagId, { $set: { postsCount } });
      }
    });
  },
});
