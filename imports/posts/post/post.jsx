import { Meteor } from 'meteor/meteor';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { loadPost } from './actions';

class Post extends React.Component {
  componentWillMount() {
    this.postSubs = Meteor.subscribe('post', {
      postId: this.props.params.postId,
    });
  }

  componentDidMount() {
    const { params, dispatch } = this.props;
    dispatch(loadPost(params.postId));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.postId !== nextProps.params.postId) {
      this.postSubs.stop();
      this.postSubs = Meteor.subscribe('post', {
        postId: this.props.params.postId,
      });
    }
  }

  render() {
    const { post } = this.props;
    if (post.isEmpty()) {
      return (
        <div>
          잘못된 접근이거나 글이 존재하지 않습니다.
        </div>
      );
    }
    return (
      <div className="post-component">
        <div className="post-header">
          <h2 className="post-title">
            {post.get('title')}
            <span className="post-title-comment-count">
              {`[${post.get('commentsCount')}]`}
            </span>
          </h2>
        </div>
        <div className="post-body">
          <div className="post-content">
            {post.get('content')}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser, post } = state;
  return {
    currentUser,
    post,
  };
}

Post.propTypes = {
  params: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
  post: ImmutablePropTypes.map.isRequired,
};

export default connect(mapStateToProps)(Post);
