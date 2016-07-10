import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Username from '../../../username';

class CommentItem extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment-item-wrapper">
        <Username userId={comment.get('userId')} />
        {comment.get('content')}
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: ImmutablePropTypes.map.isRequired,
};

export default CommentItem;
