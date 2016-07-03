import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadPosts } from './actions';


class Posts extends React.Component {
  componentWillMount() {
    this.before = new ReactiveVar(0);
    this.postsSubs = Meteor.subscribe('posts', {
      tagId: this.props.params.tagId,
      count: 15,
      before: this.before.get(),
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadPosts());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.tagId !== nextProps.params.tagId) {
      this.postsSubs.stop();
      this.before.set(0);
      this.postsSubs = Meteor.subscribe('posts', {
        tagId: nextProps.params.tagId,
        count: 15,
        before: this.before.get(),
      });
    }
  }

  componentWillUnmount() {
    this.postsSubs.stop();
  }

  render() {
    const { params, posts } = this.props;

    const postsNode = posts.get('posts').map((post) => {
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
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  params: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map.isRequired,
  posts: ImmutablePropTypes.map.isRequired,
};

function mapStateToProps(state) {
  const { currentUser, posts } = state;
  return {
    currentUser,
    posts,
  };
}

export default connect(mapStateToProps)(Posts);
