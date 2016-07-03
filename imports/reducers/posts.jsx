import { fromJS } from 'immutable';

export const INITIAL_POSTS = fromJS({
  posts: [],
  isLoading: false,
});
export default function postsReducer(state = INITIAL_POSTS, action) {
  switch (action.type) {
    case 'FETCH_POSTS': {
      return state.set('posts', action.posts).set('isLoading', false);
    }
    case 'ADD_POST': {
      return state.set('isLoading', true);
    }
    default:
      return state;
  }
}
