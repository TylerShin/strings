import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { loadPost, loadSubPosts } from './actions';
import SubPostWritingForm from '../subPostWritingForm/subPostWritingForm';

const subPostsSkipCount = new ReactiveVar(0);
class Post extends React.Component {
  componentWillMount() {
    this.postSubs = Meteor.subscribe('post', {
      postId: this.props.params.postId,
    });
    this.subPostsSubs = Meteor.subscribe('subPosts', {
      postId: this.props.params.postId,
      before: subPostsSkipCount.get(),
      count: 20,
    });
  }

  componentDidMount() {
    const { params, dispatch } = this.props;
    dispatch(loadPost(params.postId));
    dispatch(loadSubPosts({ before: subPostsSkipCount.get(), count: 20 }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.postId !== nextProps.params.postId) {
      this.postSubs.stop();
      subPostsSkipCount.set(0);
      this.postSubs = Meteor.subscribe('post', {
        postId: nextProps.params.postId,
      });
      this.subPostsSubs.stop();
      this.subPostsSubs = Meteor.subscribe('subPosts', {
        postId: nextProps.params.postId,
        before: subPostsSkipCount.get(),
        count: 20,
      });
    }
  }

  render() {
    const { post, dispatch, currentUser } = this.props;
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
        <SubPostWritingForm dispatch={dispatch} currentUser={currentUser} post={post} />
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
