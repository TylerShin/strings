import React from 'react';
import { fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { createContainer } from 'meteor/react-meteor-data';
import { Comments } from '../../api/comments';
import CommentForm from '../commentForm/commentForm';
import CommentItem from './commentItem/commentItem';

class CommentsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCommentsOpen: false,
    };
  }

  toggleComments() {
    this.setState({
      isCommentsOpen: !this.state.isCommentsOpen,
    });
  }

  render() {
    const { comments, post } = this.props;
    const { isCommentsOpen } = this.state;

    let commentsNode = null;
    let commentForm = null;
    let commentCloseBtn = null;
    if (isCommentsOpen) {
      commentsNode = comments.map((comment) => {
        return (
          <div className="comments-node-wrapper" key={comment.get('_id')}>
            <CommentItem key={comment.get('_id')} comment={comment} />
          </div>
        );
      });

      commentForm = <CommentForm post={post} />;
      commentCloseBtn = (
        <div className="comment-info-toggle" onClick={() => { this.toggleComments(); }}>
          댓글 닫기
        </div>
      );
    }

    return (
      <div className="comments-wrapper">
        <div className="comment-info-toggle" onClick={() => { this.toggleComments(); }}>
          <span>댓글</span>
          <span> {post.get('commentsCount')}개</span>
        </div>
        <div className="comments-node-wrapper">
          {commentsNode}
        </div>
        {commentForm}
        {commentCloseBtn}
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
  const comments = fromJS(Comments.find({ postId: post.get('_id') }, {
    sort: { createdAt: 1 },
  }).fetch());
  const currentUser = fromJS(Meteor.user()) || fromJS({});

  return {
    currentUser,
    commentsSubsReady,
    comments,
  };
}, CommentsContainer);
