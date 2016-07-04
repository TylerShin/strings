import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';
import Inview from 'react-inview';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { Posts } from '../api/posts';
import { Tags } from '../api/tags';
import { fromJS } from 'immutable';

const postsCount = new ReactiveVar(15);
class PostsContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.params.tagId !== nextProps.params.tagId) {
      postsCount.set(15);
    } else if (this.props.params.postId !== nextProps.params.postId) {
      postsCount.set(15);
    }
  }

  componentWillUnmount() {
    postsCount.set(15);
  }

  handleLoadMore() {
    const { currentTag } = this.props;
    if (postsCount.get() >= currentTag.get('postsCount')) {
      return;
    }
    postsCount.set(postsCount.get() + 15);
  }

  render() {
    const { params, posts } = this.props;

    const postsNode = posts.map((post) => {
      return (
        <div className="postlist-postitem-node" key={post.get('_id')}>
          <Link
            to={`/posts/${params.tagId}/${post.get('_id')}`}
            className="posts-postitem"
          >
            <span>{post.get('title')} </span>
            <span>{`[${post.get('subPostsCount')}]`}</span>
          </Link>
        </div>
      );
    });
    return (
      <div className="posts-component">
        <div className="posts-header-info">
          현재 이야기 중인 스트링들
        </div>
        <div className="posts-wrapper">
          <Link to={`/posts/${params.tagId}/new`} className="post-writing-btn">
            <i className="fa fa-pencil fa-lg" />
          </Link>
          {postsNode}
          <Inview style={{ height: '1px' }} onInview={() => { this.handleLoadMore(); }} />
        </div>
      </div>
    );
  }
}

PostsContainer.propTypes = {
  params: React.PropTypes.object.isRequired,
  currentTag: ImmutablePropTypes.map.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
  posts: ImmutablePropTypes.list.isRequired,
};

export default createContainer(({ params }) => {
  const postsSubs = Meteor.subscribe('posts', {
    tagId: params.tagId,
    count: postsCount.get(),
  });
  Meteor.subscribe('tag', params.tagId);
  const currentTag = fromJS(Tags.findOne(params.tagId)) || fromJS({});
  const posts = fromJS(Posts.find({ tagId: params.tagId }, { sort: { updatedAt: -1 }, count: postsCount.get() }).fetch());
  const postsSubsReady = postsSubs.ready();
  const currentUser = fromJS(Meteor.user()) || fromJS({});
  return {
    currentTag,
    posts,
    postsSubsReady,
    currentUser,
  };
}, PostsContainer);
