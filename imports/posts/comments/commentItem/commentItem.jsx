import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class CommentItem extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment-item-wrapper">
        {comment.get('content')}
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: ImmutablePropTypes.map.isRequired,
};

export default CommentItem;
