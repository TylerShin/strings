import { fromJS } from 'immutable';

export const INITIAL_SUBPOSTS = fromJS({
  subPosts: [],
  isLoading: false,
  count: 20,
});
export default function subPostsReducer(state = INITIAL_SUBPOSTS, action) {
  switch (action.type) {
    case 'FETCH_SUBPOSTS': {
      return state.set('subPosts', action.subPosts).set('isLoading', false);
    }
    case 'ADD_SUBPOST': {
      return state.set('isLoading', true);
    }
    case 'LOAD_MORE_SUBPOSTS': {
      return state.set('isLoading', true).set('count', action.count);
    }
    default:
      return state;
  }
}
