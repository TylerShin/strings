import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class SubPostWritingForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const { post } = this.props;

    Meteor.call('subPosts.insert', {
      content: this.refs.content.value,
      tagId: post.get('tagId'),
      postId: post.get('_id'),
    }, (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.refs.content.value = '';
      }
    });
  }

  render() {
    return (
      <form className="sub-post-form" onSubmit={(e) => { this.handleSubmit(e); }}>
        <textarea ref="content" className="sub-post-textarea"></textarea>
        <button type="submit" className="sub-post-submit-btn">등록</button>
      </form>
    );
  }
}

SubPostWritingForm.propTypes = {
  post: ImmutablePropTypes.map.isRequired,
};

export default SubPostWritingForm;
