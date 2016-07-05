import React from 'react';
import { browserHistory } from 'react-router';

class WritingForm extends React.Component {
  componentDidMount() {
    $('.post-summernote').summernote({
      height: 400,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const tagId = this.props.params.tagId;
    const title = this.refs.title.value;
    const content = $('.post-summernote').summernote('code');
    if (!tagId) {
      alert('잘못된 접근입니다.');
      return;
    }
    Meteor.call('posts.insert', {
      title,
      content,
      tagId,
    }, (err) => {
      if (err) {
        alert(err.message);
      } else {
        browserHistory.push(`/posts/${tagId}`);
      }
    });
  }

  render() {
    return (
      <div className="writing-form-component">
        <form className="writing-form-form" onSubmit={(e) => { this.handleSubmit(e); }}>
          <label>제목</label>
          <input type="text" ref="title" />
          <label>내용</label>
          <div className="post-summernote"></div>
          <button className="writing-form-submit" type="submit">등록하기</button>
        </form>
      </div>
    );
  }
}

WritingForm.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default WritingForm;
