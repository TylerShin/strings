import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { createContainer } from 'meteor/react-meteor-data';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import Inview from 'react-inview';
import moment from 'moment';
import { fromJS } from 'immutable';
import { Posts } from '../../api/posts';
import { SubPosts } from '../../api/subPosts';
// Import components
import SubPostWritingForm from '../subPostWritingForm/subPostWritingForm';
import SubPostShow from '../subPostShow/subPostShow';
import PostsContainer from '../posts';
import CommentForm from '../commentForm/commentForm';

const subPostSubsCount = new ReactiveVar(20);
class Post extends React.Component {
  componentWillUnmount() {
    subPostSubsCount.set(20);
  }

  handleLoadMore() {
    const { post } = this.props;
    if (subPostSubsCount.get() >= post.get('subPostsCount')) {
      return;
    }
    subPostSubsCount.set(subPostSubsCount.get() + 20);
  }

  render() {
    function createMarkup() {
      return {
        __html: post.get('content'),
      };
    }

    const { params, post, currentUser, subPosts } = this.props;
    if (post.isEmpty()) {
      return (
        <div>
          잘못된 접근이거나 글이 존재하지 않습니다.
        </div>
      );
    }
    const subPostsNode = subPosts.map((subPost) => {
      return (
        <SubPostShow currentUser={currentUser} subPost={subPost} key={subPost.get('_id')} />
      );
    });

    let commentFormNode = null;
    if (!currentUser.isEmpty()) {
      CommentFormNode = <CommentForm post={post} />
    }

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
              <div dangerouslySetInnerHTML={createMarkup()} />
            </div>
          </div>
          {CommentFormNode}
        </div>
        <div className="subposts-wrapper">
          {subPostsNode}
          <Inview style={{ height: '1px' }} onInview={() => { this.handleLoadMore(); }} />
        </div>
        <SubPostWritingForm currentUser={currentUser} post={post} />
        <PostsContainer params={params} />
      </div>
    );
  }
}

Post.propTypes = {
  params: React.PropTypes.object.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
  post: ImmutablePropTypes.map.isRequired,
  subPosts: ImmutablePropTypes.list.isRequired,
};

export default createContainer(({ params }) => {
  const postSubs = Meteor.subscribe('post', {
    postId: params.postId,
  });
  const subPostsSub = Meteor.subscribe('subPosts', {
    postId: params.postId,
    count: subPostSubsCount.get(),
  });
  const post = fromJS(Posts.findOne({ _id: params.postId })) || fromJS({});
  const postSubReady = postSubs.ready();
  const subPosts = fromJS(SubPosts.find({}, { sort: { updatedAt: 1 }, limit: subPostSubsCount.get() }).fetch()) || fromJS({});
  const subPostsSubReady = subPostsSub.ready();
  const currentUser = fromJS(Meteor.user()) || fromJS({});
  return {
    post,
    postSubReady,
    subPosts,
    subPostsSubReady,
    currentUser,
  };
}, Post);
