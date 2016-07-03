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
