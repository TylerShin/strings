import { Posts } from '../../api/posts';
import { SubPosts } from '../../api/subPosts';
import { Tracker } from 'meteor/tracker';
import { fromJS } from 'immutable';
import { INITIAL_POST } from '../../reducers/post';
import { INITIAL_SUBPOSTS } from '../../reducers/subPosts';

export function loadPost(postId) {
  return dispatch => {
    Tracker.autorun(() => {
      let post = INITIAL_POST;
      if (!!Posts.findOne({ _id: postId })) {
        post = fromJS(Posts.findOne({ _id: postId }));
      }
      dispatch({
        type: 'FETCH_POST',
        post,
      });
    });
  };
}

export function loadSubPosts({ before, count }) {
  return (dispatch) => {
    Tracker.autorun(() => {
      let subPosts = INITIAL_SUBPOSTS.get('subPosts');
      if (SubPosts.find({}, { sort: { updatedAt: -1 }, skip: before, limit: count }).count() > 0) {
        subPosts = SubPosts.find({}, { sort: { updatedAt: -1 }, skip: before, limit: count }).fetch();
      }
      dispatch({
        type: 'FETCH_SUBPOSTS',
        subPosts,
      });
    });
  };
}
