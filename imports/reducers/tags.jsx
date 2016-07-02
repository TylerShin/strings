import { fromJS } from 'immutable';

export const INITIAL_TAGS = fromJS({
  tags: [],
  isOpen: false,
});
export default function currentUserReducer(state = INITIAL_TAGS, action) {
  switch (action.type) {
    case 'FETCH_TAGS': {
      return state.set('tags', action.tags);
    }
    case 'TOGGLE_TAGS': {
      return state.set('isOpen', !state.get('isOpen'));
    }
    default:
      return state;
  }
}
