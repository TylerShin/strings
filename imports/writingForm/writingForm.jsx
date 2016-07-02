import React from 'react';

class WritingForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    console.log('ggogoogogo');
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

export default WritingForm;
