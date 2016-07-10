import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

class CommentItem extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment-item-wrapper">
        <div className="comment-user-info clearfix">
          <div className="comment-user-info-username">
            {comment.get('userId').slice(2, 8)}
          </div>
          <div className="comment-user-info-created-at">
            {moment(comment.get('createdAt')).fromNow()}
          </div>
        </div>
        <div className="comment-content">
          {comment.get('content')}
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: ImmutablePropTypes.map.isRequired,
};

export default CommentItem;
