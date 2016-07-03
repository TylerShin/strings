import { Posts } from '../api/posts';
import { Tracker } from 'meteor/tracker';
import { fromJS } from 'immutable';
import { INITIAL_POSTS } from '../reducers/posts';

export function loadPosts() {
  return dispatch => {
    Tracker.autorun(() => {
      let posts = INITIAL_POSTS.get('posts');
      posts = fromJS(Posts.find().fetch());
      dispatch({
        type: 'FETCH_POSTS',
        posts,
      });
    });
  };
}
