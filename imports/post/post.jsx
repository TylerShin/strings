import React from 'react';

class Post extends React.Component {
  render() {
    return (
      <div className="post-component">
        <div className="post-header">
          <h2 className="post-title">
            <span className="post-title-hot-icon">HOT(if Hot only)</span>
            타이틀
            <span className="post-title-comment-count">[10] 코멘트숫자</span>
          </h2>
        </div>
        <div className="post-body">
          <div className="post-content">
            포스트 content
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
