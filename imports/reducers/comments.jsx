import { fromJS } from 'immutable';

export const INITIAL_COMMENTS = fromJS({
  comments: [],
  isLoading: false,
});
export default function commentsReducer(state = INITIAL_COMMENTS, action) {
  switch (action.type) {
    case 'FETCH_COMMENTS': {
      return state.set('comments', action.comments).set('isLoading', false);
    }
    case 'ADD_COMMENTS': {
      return state.set('isLoading', true);
    }
    default:
      return state;
  }
}
