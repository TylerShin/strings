import { Meteor } from 'meteor/meteor';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class CommentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const { post } = this.props;
    const content = this.refs.content.value;
    Meteor.call('comments.insert', ({
      content,
      postId: post.get('_id'),
      isPost: true, // This is needed because it's Post's comment rather than SubPosts' comment
    }), (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.refs.content.value = '';
      }
    });
  }

  render() {
    return (
      <div className="comment-form-component">
        <form onSubmit={(e) => { this.handleSubmit(e); }}>
          <input type="text" className="comment-form-comment-input" ref="content" />
          <button className="comment-form-submit-btn" type="submit">등록</button>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  post: ImmutablePropTypes.map.isRequired,
};

export default CommentForm;
