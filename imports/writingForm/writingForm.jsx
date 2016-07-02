import React from 'react';
import { connect } from 'react-redux';
import { insertPost } from './actions';

class WritingForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const tagId = this.props.params.tagId;
    const dispatch = this.props.dispatch;
    const title = this.refs.title.value;
    const content = this.refs.content.value;

    if (!tagId) {
      alert('잘못된 접근입니다.');
      return;
    }
    dispatch(insertPost({ title, content, tagId }));
  }

  render() {
    return (
      <div className="writing-form-component">
        <form className="writing-form-form" onSubmit={(e) => { this.handleSubmit(e); }}>
          <label>제목</label>
          <input type="text" ref="title" />
          <label>내용</label>
          <textarea className="writing-form-content" ref="content" />
          <button className="writing-form-submit" type="submit">등록하기</button>
        </form>
      </div>
    );
  }
}

WritingForm.propTypes = {
  params: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(WritingForm);
