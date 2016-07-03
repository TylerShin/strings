import { fromJS } from 'immutable';

export const INITIAL_SUBPOSTS = fromJS({
  subPosts: [],
  isLoading: false,
});
export default function subPostsReducer(state = INITIAL_SUBPOSTS, action) {
  switch (action.type) {
    case 'FETCH_SUBPOSTS': {
      return state.set('subPosts', action.subPosts).set('isLoading', false);
    }
    case 'ADD_SUBPOST': {
      return state.set('isLoading', true);
    }
    default:
      return state;
  }
}
