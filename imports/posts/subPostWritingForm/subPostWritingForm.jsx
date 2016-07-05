import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class SubPostWritingForm extends React.Component {
  componentDidMount() {
    $('.subpost-summernote').summernote({
      height: 300,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { post } = this.props;

    Meteor.call('subPosts.insert', {
      content: $('.subpost-summernote').summernote('code'),
      tagId: post.get('tagId'),
      postId: post.get('_id'),
    }, (err) => {
      if (err) {
        alert(err.message);
      } else {
        $('.subpost-summernote').summernote('code', '');
      }
    });
  }

  render() {
    return (
      <form className="sub-post-form" onSubmit={(e) => { this.handleSubmit(e); }}>
        <div className="subpost-summernote"></div>
        <button type="submit" className="sub-post-submit-btn">등록</button>
      </form>
    );
  }
}

SubPostWritingForm.propTypes = {
  post: ImmutablePropTypes.map.isRequired,
};

export default SubPostWritingForm;
