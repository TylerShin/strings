import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from 'moment';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { loadPost, loadSubPosts } from './actions';
import SubPostWritingForm from '../subPostWritingForm/subPostWritingForm';
import SubPostShow from '../subPostShow/subPostShow';


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

  componentWillUnmount() {
    this.postSubs.stop();
    this.subPostsSubs.stop();
  }

  render() {
    const { post, dispatch, currentUser, subPosts } = this.props;
    if (post.isEmpty()) {
      return (
        <div>
          잘못된 접근이거나 글이 존재하지 않습니다.
        </div>
      );
    }
    const subPostsNode = subPosts.get('subPosts').map((subPost) => {
      return (
        <SubPostShow dispatch={dispatch} currentUser={currentUser} subPost={subPost} key={subPost.get('_id')} />
      );
    });

    return (
      <div className="post-component">
        <div className="post-wrapper">
          <div className="post-header">
            <div className="post-show-title">
              {post.get('title')}
              <span className="post-title-comment-count">
                {`[${post.get('subPostsCount')}]`}
              </span>
            </div>
            <div className="post-info">
              <div className="owner-info">
                발의자 : {post.get('userId')}
              </div>
              <div className="updated-at">
                <span>최근 업데이트 : </span>
                {moment(post.get('updatedAt')).fromNow()}
              </div>
            </div>
          </div>
          <div className="post-body">
            <div className="post-content">
              {post.get('content')}
            </div>
          </div>
        </div>
        <div className="subposts-wrapper">
          {subPostsNode}
        </div>
        <SubPostWritingForm dispatch={dispatch} currentUser={currentUser} post={post} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currentUser, post, subPosts } = state;
  return {
    currentUser,
    post,
    subPosts,
  };
}

Post.propTypes = {
  params: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
  post: ImmutablePropTypes.map.isRequired,
  subPosts: ImmutablePropTypes.map.isRequired,
};

export default connect(mapStateToProps)(Post);
