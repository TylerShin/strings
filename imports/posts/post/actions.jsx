import { Posts } from '../../api/posts';
import { Tracker } from 'meteor/tracker';
import { fromJS } from 'immutable';
import { INITIAL_POST } from '../../reducers/post';

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
