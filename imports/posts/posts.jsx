import React from 'react';
import { Link } from 'react-router';

class Posts extends React.Component {
  render() {
    const { params } = this.props;

    return (
      <div className="posts-component">
        <Link to={`/posts/${params.tagId}/new`} className="post-writing-btn">
          <i className="fa fa-pencil fa-lg" />
        </Link>
      </div>
    );
  }
}

Posts.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default Posts;
