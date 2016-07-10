import React from 'react';
import { fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { createContainer } from 'meteor/react-meteor-data';
import { Comments } from '../../api/comments';
import CommentForm from '../commentForm/commentForm';
import CommentItem from './commentItem/commentItem';

class CommentsContainer extends React.Component {
  render() {
    const { comments, post } = this.props;

    const commentsNode = comments.map((comment) => {
      return (
        <CommentItem key={comment.get('_id')} comment={comment} />
      );
    });

    return (
      <div className="comments-wrapper">
        <div className="comments-node-wrapper">
          {commentsNode}
        </div>
        <CommentForm post={post} />
      </div>
    );
  }
}

CommentsContainer.propTypes = {
  currentUser: ImmutablePropTypes.map.isRequired,
  post: ImmutablePropTypes.map.isRequired,
  comments: ImmutablePropTypes.list.isRequired,
  commentsSubsReady: React.PropTypes.bool.isRequired,
};

export default createContainer(({ post }) => {
  const commentsSubs = Meteor.subscribe('comments', {
    postId: post.get('_id'),
  });
  const commentsSubsReady = commentsSubs.ready();
  const comments = fromJS(Comments.find({ postId: post.get('_id') }).fetch());
  const currentUser = fromJS(Meteor.user()) || fromJS({});

  return {
    currentUser,
    commentsSubsReady,
    comments,
  };
}, CommentsContainer);
