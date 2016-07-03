import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { addSubPosts } from './actions';

class SubPostWritingForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, post } = this.props;

    dispatch(addSubPosts({
      content: this.refs.content.value,
      tagId: post.get('tagId'),
      postId: post.get('_id'),
      textareaDom: this.refs.content,
    }));
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
  dispatch: React.PropTypes.func.isRequired,
};

export default SubPostWritingForm;
